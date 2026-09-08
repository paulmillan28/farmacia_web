'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSection(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = title.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  const description = formData.get('description') as string

  const { error } = await supabase.from('sections').insert([{ title, slug, description }])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/sections')
  revalidatePath('/')
}

export async function updateSection(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slug = title.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  const description = formData.get('description') as string

  const { error } = await supabase
    .from('sections')
    .update({ title, slug, description, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/sections')
  revalidatePath('/')
}

export async function deleteSection(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string

  const { error } = await supabase.from('sections').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/sections')
  revalidatePath('/')
}