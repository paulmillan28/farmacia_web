'use client'

import { useState } from 'react'
import { Search, X, Calendar, ArrowRight, FileText } from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  image_url?: string | null
  is_published?: boolean
  created_at?: string
}

interface SectionSearchProps {
  posts: Post[]
  sectionTitle: string
}

export default function SectionSearch({ posts, sectionTitle }: SectionSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  // Filtrar publicaciones por el término de búsqueda
  const filteredPosts = posts
    .filter((post) => post.is_published !== false)
    .filter((post) => {
      const term = searchTerm.toLowerCase()
      return (
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
      )
    })

  return (
    <div className="space-y-4">
      {/* Buscador de la Sección Alineado a la Derecha */}
      <div className="flex justify-end">
        <div className="relative w-full sm:w-72 md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Buscar en ${sectionTitle}...`}
            className="w-full pl-10 pr-9 py-2 bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              title="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Resultados de la Sección (Scroll Horizontal) */}
      {filteredPosts.length === 0 ? (
        <div className="p-6 text-center bg-slate-100/70 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm">
            {searchTerm
              ? `No se encontraron resultados para "${searchTerm}" en esta sección.`
              : 'No hay publicaciones disponibles en esta sección.'}
          </p>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-all cursor-pointer snap-start flex-shrink-0 group"
            >
              {post.image_url ? (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="h-48 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="h-48 w-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <FileText className="w-12 h-12 stroke-[1.5]" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>Ver detalle</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal de Detalle */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/40 text-white hover:bg-slate-900/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagen del modal */}
            {selectedPost.image_url && (
              <div className="relative h-64 w-full bg-slate-100">
                <img
                  src={selectedPost.image_url}
                  alt={selectedPost.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Contenido del modal */}
            <div className="p-6 md:p-8 space-y-4">
              <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                {sectionTitle}
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {selectedPost.title}
              </h3>

              {selectedPost.created_at && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(selectedPost.created_at).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 text-slate-700 leading-relaxed space-y-3 whitespace-pre-wrap text-sm md:text-base">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}