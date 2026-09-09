'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  FolderTree,
  FileText,
  Image as ImageIcon,
  Settings,
  Menu,
  X,
  ExternalLink,
  LogOut,
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Secciones', href: '/admin/sections', icon: FolderTree },
    { name: 'Publicaciones', href: '/admin/posts', icon: FileText },
    { name: 'Carrusel (Slides)', href: '/admin/slides', icon: ImageIcon },
    { name: 'Configuración / Logo', href: '/admin/settings', icon: Settings },
  ]

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Header Móvil */}
      <div className="md:hidden bg-slate-900 text-white flex items-center justify-between p-4 border-b border-slate-800 sticky top-0 z-40">
        <div>
          <span className="font-bold text-emerald-400">Panel Admin</span>
          <p className="text-[10px] text-slate-400">Farmacia FARMA&MED</p>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Abrir menú"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay oscuro para móviles al abrir el sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Lateral */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div>
          {/* Header del Sidebar (Escritorio) */}
          <div className="p-6 border-b border-slate-800 hidden md:block">
            <Link href="/admin" className="text-lg font-bold text-emerald-400 block">
              Panel Admin
            </Link>
            <p className="text-xs text-slate-400 mt-0.5">Farmacia FARMA&MED</p>
          </div>

          {/* Menú de Navegación */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver sitio público
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-800 hover:bg-red-950/50 hover:border-red-800/50 border border-transparent text-xs font-medium text-slate-300 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}