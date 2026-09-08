import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Panel de Administración</h1>
            <p className="text-sm text-slate-500">Sesión activa: {user.email}</p>
          </div>
          <Link
            href="/"
            className="text-sm text-emerald-600 hover:underline"
          >
            Ver sitio público →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-slate-800">Secciones</h2>
            <p className="text-slate-600 text-sm">Crea y administra las secciones de la farmacia.</p>
            <Link
              href="/admin/sections"
              className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
            >
              Gestionar Secciones
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-slate-800">Publicaciones</h2>
            <p className="text-slate-600 text-sm">Gestiona los artículos y promociones por sección.</p>
            <Link
              href="/admin/posts"
              className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
            >
              Gestionar Publicaciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}