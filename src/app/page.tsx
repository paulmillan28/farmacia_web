import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getPharmacySections } from '@/modules/sections/services'
import HeroCarousel from '@/components/HeroCarousel'
import SectionSearch from '@/components/SectionSearch'

export default async function HomePage() {
  const sections = await getPharmacySections()
  const supabase = await createClient()

  // Consulta los slides ordenados desde Supabase
  const { data: slides, error: slidesError } = await supabase
    .from('slides')
    .select('*')
    .order('sort_order', { ascending: true })

  if (slidesError) {
    console.error('Error al obtener los slides:', slidesError.message)
  }

  // Consulta la configuración del logo dinámico desde Supabase
  const { data: logoSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'site_logo')
    .single()

  const logoUrl = logoSetting?.value || '/logo.png'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header / Navbar con Logo Dinámico */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="Farmacia FARMA&MED "
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>

      {/* Carrusel Dinámico */}
      <HeroCarousel slides={slides || []} />

      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Tu salud y bienestar en un solo lugar
          </h2>
          <p className="text-emerald-100 text-base md:text-lg max-w-2xl mx-auto">
            Consulta nuestras secciones, ofertas y publicaciones de salud actualizadas constantemente.
          </p>
        </div>
      </section>

      {/* Contenido Dinámico: Secciones con Buscador y Modal Integrado */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {sections.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg">No hay secciones ni publicaciones disponibles por el momento.</p>
            <p className="text-sm mt-1">Inicia sesión en el panel de administración para comenzar a publicar.</p>
          </div>
        ) : (
          sections.map((section) => (
            <section key={section.id} className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-2xl font-bold text-slate-800">{section.title}</h3>
                {section.description && (
                  <p className="text-sm text-slate-600">{section.description}</p>
                )}
              </div>

              {/* Componente cliente con buscador por sección, scroll lateral y modal */}
              <SectionSearch
                posts={section.posts || []}
                sectionTitle={section.title}
              />
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Farmacia FARMA&MED . Todos los derechos reservados.
      </footer>
    </div>
  )
}