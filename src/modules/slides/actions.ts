'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSlide(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const button_text = (formData.get('button_text') as string) || null
  const button_link = (formData.get('button_link') as string) || null
  const sort_order = parseInt(formData.get('sort_order') as string) || 0
  const imageFile = formData.get('image_file') as File | null

  let image_url = ''

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `slides/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('posts-images')
      .upload(filePath, imageFile)

    if (uploadError) throw new Error(`Error al subir la imagen: ${uploadError.message}`)

    const { data: publicUrlData } = supabase.storage
      .from('posts-images')
      .getPublicUrl(filePath)

    image_url = publicUrlData.publicUrl
  }

  const { error } = await supabase.from('slides').insert([
    { title, description, button_text, button_link, image_url, sort_order },
  ])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/slides')
  revalidatePath('/')
}
export async function updateSlide(formData: FormData) {
    const supabase = await createClient()
  
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    
    // Convertir cadenas vacías ("") a null
    const rawButtonText = formData.get('button_text') as string
    const button_text = rawButtonText?.trim() ? rawButtonText.trim() : null
  
    const rawButtonLink = formData.get('button_link') as string
    const button_link = rawButtonLink?.trim() ? rawButtonLink.trim() : null
  
    const sort_order = parseInt(formData.get('sort_order') as string) || 0
    const current_image_url = formData.get('current_image_url') as string
    const imageFile = formData.get('image_file') as File | null
  
    let image_url = current_image_url
  
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `slides/${fileName}`
  
      const { error: uploadError } = await supabase.storage
        .from('posts-images')
        .upload(filePath, imageFile)
  
      if (uploadError) throw new Error(`Error al subir la imagen: ${uploadError.message}`)
  
      const { data: publicUrlData } = supabase.storage
        .from('posts-images')
        .getPublicUrl(filePath)
  
      image_url = publicUrlData.publicUrl
    }
  
    const { error } = await supabase
      .from('slides')
      .update({ 
        title, 
        description, 
        button_text, 
        button_link, 
        image_url, 
        sort_order 
      })
      .eq('id', id)
  
    if (error) throw new Error(error.message)
  
    revalidatePath('/admin/slides')
    revalidatePath('/')
  }

export async function deleteSlide(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('slides').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/slides')
  revalidatePath('/')
}