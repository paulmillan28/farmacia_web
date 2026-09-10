'use client'

import { useState } from 'react'
import { updatePost, deletePost } from '../actions'

interface Section {
  id: string
  title: string
}

interface Post {
  id: string
  title: string
  content: string
  section_id: string
  image_url?: string
  sections?: { title: string }
}

export default function PostList({
  posts,
  sections,
}: {
  posts: Post[]
  sections: Section[]
}) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <ul className="divide-y divide-slate-200">
      {posts.map((post) => (
        <li key={post.id} className="py-4">
          {editingId === post.id ? (
            /* Formulario para Editar Publicación */
            <form
              action={async (formData) => {
                await updatePost(formData)
                setEditingId(null)
              }}
              className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200"
            >
              <input type="hidden" name="id" value={post.id} />
              <input type="hidden" name="current_image_url" value={post.image_url || ''} />

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Sección
                </label>
                <select
                  name="section_id"
                  defaultValue={post.section_id}
                  required
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Título
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={post.title}
                  required
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Cambiar Imagen (Opcional)
                </label>
                <input
                  name="image_file"
                  type="file"
                  accept="image/*"
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Contenido
                </label>
                <textarea
                  name="content"
                  defaultValue={post.content}
                  required
                  rows={3}
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            /* Vista Normal de la Publicación */
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                )}
                <div>
                  <p className="font-medium text-slate-800">{post.title}</p>
                  <p className="text-xs text-slate-500">
                    Sección: {post.sections?.title || 'Sin sección'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingId(post.id)}
                  className="px-3 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors"
                >
                  Editar
                </button>

                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    type="submit"
                    onClick={(e) => {
                      if (!confirm('¿Seguro que deseas eliminar esta publicación?')) {
                        e.preventDefault()
                      }
                    }}
                    className="px-3 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
                  >
                    Borrar
                  </button>
                </form>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}