'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react'
import { createSlide, updateSlide, deleteSlide, reorderSlides } from '@/modules/slides/actions'

interface Slide {
  id: string
  title: string
  subtitle?: string
  link?: string
  image_url: string
}

export function SlideModal({ slide }: { slide?: Slide }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const isEditing = !!slide

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      if (isEditing) {
        await updateSlide(formData)
      } else {
        await createSlide(formData)
      }
      setIsOpen(false)
    } catch (err: any) {
      alert(err.message || 'Ocurrió un error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isEditing ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          title="Editar Slide"
        >
          <Pencil className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Diapositiva
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden space-y-4">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {isEditing ? 'Editar Diapositiva' : 'Nueva Diapositiva'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {isEditing && (
                <>
                  <input type="hidden" name="id" value={slide.id} />
                  <input type="hidden" name="current_image_url" value={slide.image_url} />
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={slide?.title || ''}
                  required
                  placeholder="Ej: Visítanos"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Subtítulo / Descripción (Opcional)
                </label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={slide?.subtitle || ''}
                  placeholder="Ej: Promociones de este mes"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Enlace al hacer clic (Opcional)
                </label>
                <input
                  type="url"
                  name="link"
                  defaultValue={slide?.link || ''}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Imagen del Slide {isEditing && '(Opcional si no deseas cambiarla)'}
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required={!isEditing}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow transition-colors disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export function DeleteSlideButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar este slide?')) return
    setLoading(true)
    try {
      await deleteSlide(id)
    } catch (err: any) {
      alert(err.message || 'Error al eliminar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors disabled:opacity-50"
      title="Eliminar Slide"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}

export function ReorderSlideButtons({
  id,
  isFirst,
  isLast,
}: {
  id: string
  isFirst: boolean
  isLast: boolean
}) {
  const [loading, setLoading] = useState(false)

  const handleReorder = async (direction: 'up' | 'down') => {
    setLoading(true)
    try {
      await reorderSlides(id, direction)
    } catch (err: any) {
      alert(err.message || 'Error al reordenar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleReorder('up')}
        disabled={isFirst || loading}
        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Mover a la izquierda"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleReorder('down')}
        disabled={isLast || loading}
        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Mover a la derecha"
      >
        <ArrowDown className="w-4 h-4" />
      </button>
    </div>
  )
}