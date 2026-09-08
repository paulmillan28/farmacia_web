import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createSlide } from '@/modules/slides/actions'
import SlideList from '@/modules/slides/components/SlideList'

export default async function SlidesAdminPage() {
  const supabase = await createClient()

  const { data: slides } = await supabase
    .from('slides')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:underline">
          ← Volver al Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-slate-800">Gestión del Carrusel</h1>

        {/* Formulario de Creación */}
        <form action={createSlide} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-700">Nuevo Slide</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
              <input
                name="title"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Ej. Ofertas del Mes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Orden de despliegue</label>
              <input
                name="sort_order"
                type="number"
                defaultValue={0}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
            <textarea
              name="description"
              required
              rows={2}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="Detalle o bajada promocional..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Texto del Botón</label>
              <input
                name="button_text"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Ej. Ver Productos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Enlace del Botón</label>
              <input
                name="button_link"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Ej. #promociones"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Imagen del Slide</label>
            <input
              name="image_file"
              type="file"
              accept="image/*"
              required
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
          >
            Guardar Slide
          </button>
        </form>

        {/* Lista de Slides */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-slate-700">Slides Creados</h2>
          {slides && slides.length > 0 ? (
            <SlideList slides={slides} />
          ) : (
            <p className="text-sm text-slate-500">Aún no has agregado slides al carrusel.</p>
          )}
        </div>
      </div>
    </div>
  )
}