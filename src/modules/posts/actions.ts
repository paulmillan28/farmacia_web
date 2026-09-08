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

  // Subir la imagen a Supabase Storage si se seleccionó un archivo
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

    // Obtener la URL pública del archivo subido
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