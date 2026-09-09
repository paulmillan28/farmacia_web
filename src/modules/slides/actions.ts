'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

// CREAR SLIDE
export async function createSlide(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  const link = formData.get('link') as string
  const file = formData.get('image') as File

  if (!file || file.size === 0) {
    throw new Error('Debes seleccionar una imagen para el slide.')
  }

  // Subir imagen al Bucket 'slides'
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
  const filePath = `slides/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('slides')
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(`Error al subir la imagen: ${uploadError.message}`)
  }

  const { data: publicUrlData } = supabase.storage
    .from('slides')
    .getPublicUrl(filePath)

  const image_url = publicUrlData.publicUrl

  // Insertar en la base de datos
  const { error: insertError } = await supabase.from('slides').insert([
    {
      title,
      subtitle: subtitle || null,
      link: link || null,
      image_url,
    },
  ])

  if (insertError) {
    throw new Error(`Error al guardar el slide: ${insertError.message}`)
  }

  revalidatePath('/admin/slides')
  revalidatePath('/')
}

// ACTUALIZAR SLIDE
export async function updateSlide(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  const link = formData.get('link') as string
  const file = formData.get('image') as File
  const currentImageUrl = formData.get('current_image_url') as string

  let image_url = currentImageUrl

  // Si el usuario adjuntó una nueva imagen, subirla
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `slides/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('slides')
      .upload(filePath, file)

    if (uploadError) {
      throw new Error(`Error al subir la imagen: ${uploadError.message}`)
    }

    const { data: publicUrlData } = supabase.storage
      .from('slides')
      .getPublicUrl(filePath)

    image_url = publicUrlData.publicUrl
  }

  const { error: updateError } = await supabase
    .from('slides')
    .update({
      title,
      subtitle: subtitle || null,
      link: link || null,
      image_url,
    })
    .eq('id', id)

  if (updateError) {
    throw new Error(`Error al actualizar el slide: ${updateError.message}`)
  }

  revalidatePath('/admin/slides')
  revalidatePath('/')
}

// ELIMINAR SLIDE
export async function deleteSlide(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('slides').delete().eq('id', id)

  if (error) {
    throw new Error(`Error al eliminar el slide: ${error.message}`)
  }

  revalidatePath('/admin/slides')
  revalidatePath('/')
}

// Agregar a src/modules/slides/actions.ts

// REORDENAR SLIDES
export async function reorderSlides(slideId: string, direction: 'up' | 'down') {
    const supabase = await createClient()
  
    // Obtener todos los slides ordenados
    const { data: slides, error } = await supabase
      .from('slides')
      .select('id, sort_order')
      .order('sort_order', { ascending: true })
  
    if (error || !slides) return
  
    const currentIndex = slides.findIndex((s) => s.id === slideId)
    if (currentIndex === -1) return
  
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= slides.length) return
  
    const currentSlide = slides[currentIndex]
    const targetSlide = slides[targetIndex]
  
    // Intercambiar los valores de sort_order
    const currentOrder = currentSlide.sort_order ?? currentIndex
    const targetOrder = targetSlide.sort_order ?? targetIndex
  
    await supabase.from('slides').update({ sort_order: targetOrder }).eq('id', currentSlide.id)
    await supabase.from('slides').update({ sort_order: currentOrder }).eq('id', targetSlide.id)
  
    revalidatePath('/admin/slides')
    revalidatePath('/')
  }