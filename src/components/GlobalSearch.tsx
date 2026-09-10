'use client'

import { useState, useMemo } from 'react'
import { Search, Tag, FileText, X } from 'lucide-react'
import SearchResultModal, { SearchResultItem } from './SearchResultModal'

export interface SectionWithPosts {
  id: string
  title: string
  description?: string | null
  posts?: {
    id: string
    title: string
    description?: string | null
    image_url?: string | null
    price?: number | null
  }[]
}

interface GlobalSearchProps {
  sections: SectionWithPosts[]
}

export default function GlobalSearch({ sections }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<SearchResultItem | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Aplanar todas las secciones y publicaciones en una sola lista buscable
  const searchIndex = useMemo(() => {
    const list: SearchResultItem[] = []

    sections.forEach((sec) => {
      // Agregar la sección como resultado
      list.push({
        type: 'section',
        id: sec.id,
        title: sec.title,
        description: sec.description,
      })

      // Agregar sus publicaciones
      sec.posts?.forEach((post) => {
        list.push({
          type: 'post',
          id: post.id,
          title: post.title,
          description: post.description,
          image_url: post.image_url,
          price: post.price,
          sectionTitle: sec.title,
        })
      })
    })

    return list
  }, [sections])

  // Filtrar según el término de búsqueda
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.sectionTitle && item.sectionTitle.toLowerCase().includes(q))
    )
  }, [query, searchIndex])

  return (
    <div className="relative w-full max-w-md">
      {/* Input de Búsqueda */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar medicamentos, secciones, ofertas..."
          className="w-full pl-10 pr-9 py-2 bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-transparent focus:border-[#260da2] rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Lista Desplegable de Resultados */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-40 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No se encontraron resultados para &quot;{query}&quot;
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {results.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    setSelectedItem(item)
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-xl text-left transition-colors group"
                >
                  {/* Thumbnail / Icono */}
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-10 h-10 object-contain bg-slate-100 rounded-lg p-1 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-[#260da2]/10 rounded-lg flex items-center justify-center shrink-0">
                      {item.type === 'section' ? (
                        <Tag className="w-5 h-5 text-[#260da2]" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#260da2]" />
                      )}
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-[#260da2] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.type === 'section'
                        ? 'Sección'
                        : `Publicación en ${item.sectionTitle}`}
                    </p>
                  </div>

                  {item.price !== undefined && item.price !== null && (
                    <span className="text-xs font-bold text-[#260da2] shrink-0">
                      ${item.price}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de Detalle al hacer clic en un resultado */}
      <SearchResultModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}