import { createClient } from '@/lib/supabase/server'
import { updateLogo } from '@/modules/settings/actions'
import { Upload, Image as ImageIcon } from 'lucide-react'

export default async function SettingsAdminPage() {
  const supabase = await createClient()

  // Consultar la URL del logo actual guardada en Supabase
  const { data: setting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'site_logo')
    .single()

  const currentLogoUrl = setting?.value || '/logo.png'

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Configuración del Sitio</h1>
        <p className="text-sm text-slate-500 mt-1">
          Administra la identidad visual y configuraciones generales de Farmacia FARMA&MED .
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-emerald-600" />
          Logo de la Farmacia
        </h2>

        {/* Muestra del logo actual */}
        <div className="flex items-center gap-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex-shrink-0 bg-white p-3 border rounded-lg shadow-sm">
            <img
              src={currentLogoUrl}
              alt="Logo Actual"
              className="h-16 w-auto object-contain max-w-[200px]"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Logo en uso actual</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Este logo aparece en la barra superior de navegación de la página principal.
            </p>
          </div>
        </div>

        {/* Formulario para cambiar el logo */}
        <form action={updateLogo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Subir nuevo logo (PNG, JPG, SVG o WebP)
            </label>
            <input
              type="file"
              name="logo_file"
              accept="image/*"
              required
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors border border-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-colors"
            >
              <Upload className="w-4 h-4" />
              Guardar Nuevo Logo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}