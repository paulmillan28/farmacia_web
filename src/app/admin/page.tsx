import Link from 'next/link'
import { FolderTree, FileText, Image as ImageIcon, Settings } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Panel de Administración
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Gestiona el contenido, imágenes y configuración de Farmacia Mía.
        </p>
      </div>

      {/* Grid Responsivo (1 col en móvil, 2 en tablet, 4 en escritorio) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Secciones */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FolderTree className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Secciones</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Crea y administra las secciones principales de la farmacia.
            </p>
          </div>
          <Link
            href="/admin/sections"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors block shadow-sm"
          >
            Gestionar Secciones
          </Link>
        </div>

        {/* Publicaciones */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Publicaciones</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Gestiona los artículos y promociones asignados por sección.
            </p>
          </div>
          <Link
            href="/admin/posts"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors block shadow-sm"
          >
            Gestionar Publicaciones
          </Link>
        </div>

        {/* Carrusel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Carrusel</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Administra las diapositivas y banners de la página inicial.
            </p>
          </div>
          <Link
            href="/admin/slides"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors block shadow-sm"
          >
            Gestionar Carrusel
          </Link>
        </div>

        {/* Configuración / Logo */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Logo y Ajustes</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Actualiza la imagen de la marca e identidad gráfica del portal.
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="w-full text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors block shadow-sm"
          >
            Cambiar Logo
          </Link>
        </div>
      </div>
    </div>
  )
}