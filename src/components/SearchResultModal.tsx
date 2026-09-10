'use client'

import { X, Tag, FileText, MapPin, Phone } from 'lucide-react'

export interface SearchResultItem {
  type: 'section' | 'post'
  id: string
  title: string
  description?: string | null
  image_url?: string | null
  price?: number | null
  sectionTitle?: string
}

interface SearchResultModalProps {
  item: SearchResultItem | null
  onClose: () => void
}

export default function SearchResultModal({ item, onClose }: SearchResultModalProps) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 rounded-full shadow transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagen (si aplica) */}
        {item.image_url ? (
          <div className="w-full h-64 bg-slate-100 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
            <img
              src={item.image_url}
              alt={item.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-[#260da2]/10 flex items-center justify-center border-b border-slate-100">
            {item.type === 'section' ? (
              <Tag className="w-12 h-12 text-[#260da2]" />
            ) : (
              <FileText className="w-12 h-12 text-[#260da2]" />
            )}
          </div>
        )}

        {/* Contenido del Modal */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#260da2]/10 text-[#260da2]">
              {item.type === 'section' ? 'Sección' : item.sectionTitle || 'Publicación'}
            </span>
            <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
          </div>

          {item.price !== undefined && item.price !== null && (
            <p className="text-2xl font-extrabold text-[#260da2]">
              ${item.price} <span className="text-sm font-normal text-slate-500">MXN</span>
            </p>
          )}

          {item.description ? (
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          ) : (
            <p className="text-xs italic text-slate-400">Sin descripción disponible.</p>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#260da2] hover:bg-[#1e0a82] text-white text-sm font-medium rounded-lg transition-colors shadow"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}