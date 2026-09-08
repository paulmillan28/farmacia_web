'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const section_id = formData.get('section_id') as string
  const imageFile = formData.get('image_file') as File | null

  let image_url: string | null = null

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `public/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('posts-images')
      .upload(filePath, imageFile)

    if (uploadError) {
      throw new Error(`Error al subir la imagen: ${uploadError.message}`)
    }

    const { data: publicUrlData } = supabase.storage
      .from('posts-images')
      .getPublicUrl(filePath)

    image_url = publicUrlData.publicUrl
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const { error } = await supabase.from('posts').insert([
    {
      title,
      slug,
      content,
      section_id,
      image_url,
      is_published: true,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/')
}

export async function updatePost(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const section_id = formData.get('section_id') as string
  const current_image_url = formData.get('current_image_url') as string
  const imageFile = formData.get('image_file') as File | null

  let image_url = current_image_url || null

  // Subir nueva imagen si el usuario la seleccionó
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `public/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('posts-images')
      .upload(filePath, imageFile)

    if (uploadError) {
      throw new Error(`Error al actualizar la imagen: ${uploadError.message}`)
    }

    const { data: publicUrlData } = supabase.storage
      .from('posts-images')
      .getPublicUrl(filePath)

    image_url = publicUrlData.publicUrl
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      slug,
      content,
      section_id,
      image_url,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/')
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/')
}