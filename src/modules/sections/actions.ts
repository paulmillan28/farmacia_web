'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSection(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  const description = formData.get('description') as string

  const { error } = await supabase.from('sections').insert([{ title, slug, description }])

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/sections')
  revalidatePath('/')
}