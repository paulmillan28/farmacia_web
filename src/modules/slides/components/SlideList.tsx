'use client'

import { useState } from 'react'
import { updateSlide, deleteSlide } from '../actions'

interface Slide {
  id: string
  title: string
  description: string
  button_text: string
  button_link: string
  image_url: string
  sort_order: number
}

export default function SlideList({ slides }: { slides: Slide[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <ul className="divide-y divide-slate-200">
      {slides.map((slide) => (
        <li key={slide.id} className="py-4">
          {editingId === slide.id ? (
            <form
              action={async (formData) => {
                await updateSlide(formData)
                setEditingId(null)
              }}
              className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200"
            >
              <input type="hidden" name="id" value={slide.id} />
              <input type="hidden" name="current_image_url" value={slide.image_url} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Título</label>
                  <input
                    name="title"
                    defaultValue={slide.title}
                    required
                    className="w-full px-3 py-1.5 text-sm border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Orden de despliegue</label>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={slide.sort_order}
                    className="w-full px-3 py-1.5 text-sm border rounded bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Descripción</label>
                <textarea
                  name="description"
                  defaultValue={slide.description}
                  required
                  rows={2}
                  className="w-full px-3 py-1.5 text-sm border rounded bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Texto del Botón</label>
                  <input
                    name="button_text"
                    defaultValue={slide.button_text}
                    className="w-full px-3 py-1.5 text-sm border rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Enlace del Botón</label>
                  <input
                    name="button_link"
                    defaultValue={slide.button_link}
                    className="w-full px-3 py-1.5 text-sm border rounded bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Cambiar Imagen (Opcional)</label>
                <input name="image_file" type="file" accept="image/*" className="text-xs text-slate-500" />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-slate-200 hover:bg-slate-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs text-white bg-emerald-600 hover:bg-emerald-700 rounded"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-slate-800">{slide.title}</p>
                  <p className="text-xs text-slate-500">{slide.description}</p>
                  <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    Orden: {slide.sort_order}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingId(slide.id)}
                  className="px-3 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border rounded"
                >
                  Editar
                </button>

                <form action={deleteSlide.bind(null, slide.id)}>
  <button type="submit">Eliminar</button>
</form>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}