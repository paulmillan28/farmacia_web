'use client'

import { useState } from 'react'
import { updateSection, deleteSection } from '../actions'

interface Section {
  id: string
  title: string
  slug: string
  description?: string
}

export default function SectionList({ sections }: { sections: Section[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <ul className="divide-y divide-slate-200">
      {sections.map((section) => (
        <li key={section.id} className="py-4">
          {editingId === section.id ? (
            /* Formulario de Edición */
            <form
              action={async (formData) => {
                await updateSection(formData)
                setEditingId(null)
              }}
              className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200"
            >
              <input type="hidden" name="id" value={section.id} />
              
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Título</label>
                <input
                  name="title"
                  type="text"
                  defaultValue={section.title}
                  required
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Descripción</label>
                <textarea
                  name="description"
                  defaultValue={section.description || ''}
                  rows={2}
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            /* Vista Normal de la Sección */
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-800">{section.title}</p>
                <p className="text-xs text-slate-500">/{section.slug}</p>
                {section.description && (
                  <p className="text-sm text-slate-600 mt-1">{section.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingId(section.id)}
                  className="px-3 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors"
                >
                  Editar
                </button>

                <form action={deleteSection}>
                  <input type="hidden" name="id" value={section.id} />
                  <button
                    type="submit"
                    onClick={(e) => {
                      if (!confirm('¿Seguro que deseas eliminar esta sección? Las publicaciones vinculadas se eliminarán.')) {
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