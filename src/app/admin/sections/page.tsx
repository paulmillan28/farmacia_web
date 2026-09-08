import { createSection } from '@/modules/sections/actions'
import { getPharmacySections } from '@/modules/sections/services'
import Link from 'next/link'

export default async function SectionsAdminPage() {
  const sections = await getPharmacySections()

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/admin" className="text-sm text-slate-500 hover:underline">
          ← Volver al Dashboard
        </Link>
        
        <h1 className="text-2xl font-bold text-slate-800">Gestión de Secciones</h1>

        {/* Formulario de Creación */}
        <form action={createSection} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-700">Nueva Sección</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. Medicamentos, Cuidado Personal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Descripción breve..."
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
          >
            Guardar Sección
          </button>
        </form>

        {/* Lista de Secciones */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-slate-700">Secciones Existentes</h2>
          <ul className="divide-y divide-slate-200">
            {sections.map((section) => (
              <li key={section.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">{section.title}</p>
                  <p className="text-xs text-slate-500">{section.slug}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}