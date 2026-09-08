import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createPost } from '@/modules/posts/actions'
import { getPharmacySections } from '@/modules/sections/services'

export default async function PostsAdminPage() {
  const sections = await getPharmacySections()
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*, sections(title)')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:underline">
          ← Volver al Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-slate-800">Gestión de Publicaciones</h1>

        {/* Formulario de Creación (se remueve encType ya que React lo gestiona automáticamente) */}
        <form 
          action={createPost} 
          className="bg-white p-6 rounded-xl shadow-sm space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-700">Nueva Publicación</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Sección Perteneciente
            </label>
            <select
              name="section_id"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Selecciona una sección...</option>
              {sections.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Título de la Publicación / Producto
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. Descuento 20% en Paracetamol"
            />
          </div>

          {/* Subida de Imagen desde Archivo Local */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Imagen del Producto / Publicación (Opcional)
            </label>
            <input
              name="image_file"
              type="file"
              accept="image/*"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contenido / Detalle
            </label>
            <textarea
              name="content"
              required
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Escribe la descripción o los detalles..."
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
          >
            Guardar Publicación
          </button>
        </form>

        {/* Lista de Publicaciones */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-slate-700">Publicaciones Creadas</h2>
          {posts && posts.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {posts.map((post: any) => (
                <li key={post.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {post.image_url && (
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-800">{post.title}</p>
                      <p className="text-xs text-slate-500">
                        Sección: {post.sections?.title || 'Sin sección'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800">
                    Publicado
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">Aún no has creado publicaciones.</p>
          )}
        </div>
      </div>
    </div>
  )
}