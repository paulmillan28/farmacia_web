import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Panel de Administración</h1>
            <p className="text-sm text-slate-500">Sesión activa: {user?.email}</p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            Ver sitio público →
          </Link>
        </div>

        {/* Tarjetas de Acceso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Secciones */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Secciones</h2>
              <p className="text-sm text-slate-500 mt-1">
                Crea y administra las secciones de la farmacia.
              </p>
            </div>
            <Link
              href="/admin/sections"
              className="inline-block text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Gestionar Secciones
            </Link>
          </div>

          {/* Publicaciones */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Publicaciones</h2>
              <p className="text-sm text-slate-500 mt-1">
                Gestiona los artículos y promociones por sección.
              </p>
            </div>
            <Link
              href="/admin/posts"
              className="inline-block text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Gestionar Publicaciones
            </Link>
          </div>

          {/* Carrusel / Slides */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Carrusel</h2>
              <p className="text-sm text-slate-500 mt-1">
                Administra los banners y diapositivas del carrusel principal.
              </p>
            </div>
            <Link
              href="/admin/slides"
              className="inline-block text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Gestionar Carrusel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}