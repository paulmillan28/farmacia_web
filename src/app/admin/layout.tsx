import Link from 'next/link'
import { LayoutDashboard, FolderTree, FileText, Image as ImageIcon, Settings } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar de Administración */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="text-lg font-bold text-emerald-400">
            Panel Admin
          </Link>
          <p className="text-xs text-slate-400 mt-1">Farmacia FARMA&MED </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          {/* Opción Secciones */}
          <Link
            href="/admin/sections"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <FolderTree className="w-4 h-4" />
            Secciones
          </Link>

          {/* Opción Publicaciones/Posts */}
          <Link
            href="/admin/posts"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            Publicaciones
          </Link>

          <Link
            href="/admin/slides"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
            Carrusel (Slides)
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            Configuración / Logo
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            className="block w-full text-center py-2 px-4 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-colors"
          >
            Ver sitio público
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}