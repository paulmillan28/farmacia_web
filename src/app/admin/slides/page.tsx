import { createClient } from '@/lib/supabase/server'
import { updateLogo } from '@/modules/settings/actions'
import { Image as ImageIcon, Upload, Plus, Trash2, Layers } from 'lucide-react'

export default async function AdminSlidesPage() {
  const supabase = await createClient()

  // 1. Obtener el logo actual desde site_settings
  const { data: logoSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'site_logo')
    .single()

  const currentLogoUrl = logoSetting?.value || '/logo.png'

  // 2. Obtener los slides del carrusel
  const { data: slides, error } = await supabase
    .from('slides')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error al cargar los slides:', error.message)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 p-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Carrusel y Logo del Sitio</h1>
        <p className="text-sm text-slate-500 mt-1">
          Administra la imagen del logo principal y las diapositivas del carrusel del inicio.
        </p>
      </div>

      {/* SECCIÓN 1: MODIFICAR LOGO */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            Logo de la Farmacia
          </h2>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
            Header Principal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Muestra del logo actual */}
          <div className="md:col-span-1 bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[140px]">
            <span className="text-xs font-medium text-slate-400 mb-2">Logo Actual</span>
            <img
              src={currentLogoUrl}
              alt="Logo Actual"
              className="h-16 w-auto object-contain max-w-[180px]"
            />
          </div>

          {/* Formulario de actualización */}
          <form action={updateLogo} className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Seleccionar nuevo logo (PNG, JPG, SVG o WebP)
              </label>
              <input
                type="file"
                name="logo_file"
                accept="image/*"
                required
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors border border-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-colors"
              >
                <Upload className="w-4 h-4" />
                Actualizar Logo
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* SECCIÓN 2: ADMINISTRAR SLIDES DEL CARRUSEL */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Diapositivas del Carrusel
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Imágenes y banners destacados en la página principal.
            </p>
          </div>
        </div>

        {/* Lista de Slides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {slides && slides.length > 0 ? (
            slides.map((slide) => (
              <div
                key={slide.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col justify-between"
              >
                <div className="relative h-40 w-full bg-slate-200">
                  <img
                    src={slide.image_url}
                    alt={slide.title || 'Slide'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-slate-800">
                      {slide.title || 'Sin título'}
                    </p>
                    {slide.subtitle && (
                      <p className="text-xs text-slate-500 line-clamp-1">{slide.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-slate-400 text-sm border border-dashed rounded-lg">
              No hay diapositivas registradas en el carrusel.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}