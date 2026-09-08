import { createClient } from '@/lib/supabase/server'

export async function getPharmacySections() {
  const supabase = await createClient()

  const { data: sections, error } = await supabase
    .from('sections')
    .select(`
      id,
      title,
      slug,
      description,
      posts (
        id,
        title,
        content,
        image_url,
        is_published
      )
    `)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching sections:', error)
    return []
  }

  return sections
}