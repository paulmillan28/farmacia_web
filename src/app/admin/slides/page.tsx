import { createClient } from '@/lib/supabase/server'
import { Layers } from 'lucide-react'
import { SlideModal, DeleteSlideButton, ReorderSlideButtons } from './SlideModal'

export default async function AdminSlidesPage() {
  const supabase = await createClient()

  // Consulta los slides ordenados por sort_order
  const { data: slides, error } = await supabase
    .from('slides')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error al cargar slides:', error.message)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión del Carrusel</h1>
          <p className="text-sm text-slate-500 mt-1">
            Administra los banners y modifica el orden de visualización.
          </p>
        </div>
        <SlideModal />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Diapositivas del Carrusel
          </h2>
        </div>

        {/* Lista de Slides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides && slides.length > 0 ? (
            slides.map((slide, index) => (
              <div
                key={slide.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between group"
              >
                <div className="relative h-44 w-full bg-slate-100">
                  <img
                    src={slide.image_url}
                    alt={slide.title || 'Slide'}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                    #{index + 1}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between gap-2 border-t border-slate-100">
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 line-clamp-1">
                      {slide.title || 'Sin título'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <ReorderSlideButtons
                      id={slide.id}
                      isFirst={index === 0}
                      isLast={index === slides.length - 1}
                    />
                    <SlideModal slide={slide} />
                    <DeleteSlideButton id={slide.id} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400 text-sm border border-dashed rounded-lg">
              No hay diapositivas registradas. Haz clic en "Nueva Diapositiva" para agregar una.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}