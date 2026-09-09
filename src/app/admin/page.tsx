import Link from 'next/link'
import { FolderTree, FileText, Image as ImageIcon, Settings } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Panel de Administración</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gestiona el contenido, imágenes y configuración de Farmacia Mía.
        </p>
      </div>

      {/* Grid de Accesos Rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjeta 1: Secciones */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Secciones</h2>
            <p className="text-sm text-slate-500">
              Crea y administra las secciones de la farmacia.
            </p>
          </div>
          <Link
            href="/admin/sections"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors block"
          >
            Gestionar Secciones
          </Link>
        </div>

        {/* Tarjeta 2: Publicaciones */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Publicaciones</h2>
            <p className="text-sm text-slate-500">
              Gestiona los artículos y promociones por sección.
            </p>
          </div>
          <Link
            href="/admin/posts"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors block"
          >
            Gestionar Publicaciones
          </Link>
        </div>

        {/* Tarjeta 3: Carrusel */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Carrusel</h2>
            <p className="text-sm text-slate-500">
              Administra los banners y diapositivas del carrusel principal.
            </p>
          </div>
          <Link
            href="/admin/slides"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors block"
          >
            Gestionar Carrusel
          </Link>
        </div>

        {/* Tarjeta 4: Configuración y Logo */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Logo y Ajustes</h2>
            <p className="text-sm text-slate-500">
              Sube y cambia el logo principal del sitio web.
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors block"
          >
            Cambiar Logo
          </Link>
        </div>
      </div>
    </div>
  )
}