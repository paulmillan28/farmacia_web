'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateLogo(formData: FormData) {
  const supabase = await createClient()
  const logoFile = formData.get('logo_file') as File | null

  if (!logoFile || logoFile.size === 0) {
    throw new Error('Por favor selecciona una imagen de logo válida.')
  }

  // Nombre fijo para reescribir/reemplazar el logo principal siempre
  const fileName = 'site-logo.png'
  const filePath = `settings/${fileName}`

  // Subir la imagen al bucket 'posts-images' (reemplazando si ya existe)
  const { error: uploadError } = await supabase.storage
    .from('posts-images')
    .upload(filePath, logoFile, {
      upsert: true,
      contentType: logoFile.type,
    })

  if (uploadError) {
    throw new Error(`Error al subir el logo: ${uploadError.message}`)
  }

  // Obtener la URL pública con cache-buster para evitar problemas de caché en el navegador
  const { data: publicUrlData } = supabase.storage
    .from('posts-images')
    .getPublicUrl(filePath)

  const logoUrlWithTimestamp = `${publicUrlData.publicUrl}?t=${Date.now()}`

  // Guardar o actualizar la URL en una tabla de configuración 'site_settings'
  const { error: dbError } = await supabase.from('site_settings').upsert({
    key: 'site_logo',
    value: logoUrlWithTimestamp,
  })

  if (dbError) {
    throw new Error(`Error al guardar la configuración: ${dbError.message}`)
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/admin/settings')
}