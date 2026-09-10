import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getPharmacySections } from '@/modules/sections/services'
import HeroCarousel from '@/components/HeroCarousel'
import SectionSearch from '@/components/SectionSearch'
import GlobalSearch from '@/components/GlobalSearch'

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
      {/* Header / Navbar con Logo Dinámico y Buscador Global */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logoUrl}
              alt="Farmacia FARMA&MED"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Buscador General */}
          <div className="flex-1 max-w-md mx-2">
            <GlobalSearch sections={sections} />
          </div>

          <Link
            href="/login"
            className="shrink-0 px-4 py-2 text-sm font-medium text-white bg-[#260da2] hover:bg-[#1e0a82] rounded-lg transition-colors shadow-sm"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>

      {/* Carrusel Dinámico */}
      <HeroCarousel slides={slides || []} />

      {/* Hero Section */}
      <section className="bg-[#260da2] text-white py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Tu salud y bienestar en un solo lugar
          </h2>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto opacity-90">
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
            <section
              key={section.id}
              id={`section-${section.id}`}
              className="space-y-4 scroll-mt-24"
            >
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-2xl font-bold text-slate-800">{section.title}</h3>
                {section.description && (
                  <p className="text-sm text-slate-600">{section.description}</p>
                )}
              </div>

              <SectionSearch
                posts={section.posts || []}
                sectionTitle={section.title}
              />
            </section>
          ))
        )}
      </main>

      {/* Footer Completo con Fondo #260da2 */}
      <footer className="bg-[#260da2] text-white border-t border-blue-900/40">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">Farmacia</h4>
            <p className="text-xs text-blue-100 leading-relaxed opacity-90">
              Atención médica y medicamentos con la mejor calidad al servicio de la comunidad.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold mb-2">Síguenos en</p>
              <a
                href="https://www.facebook.com/FARMAANDMED?mibextid=wwXIfr&rdid=NFWmqBdKR6xzwqPc&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AjwMNvb6u%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Visitar Facebook
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Contacto</h4>
            <div className="space-y-3 text-xs text-blue-100">
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>Av. Manuel J. Clouthier 4477 col Lomas del Ébano, Mazatlán, Sinaloa</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>+52 6692068630</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Nuestra Ubicación</h4>
            <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg h-44">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.7085721112644!2d-106.3859152206543!3d23.253689699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f53b801a6ec69%3A0x55cd9de33aab8b9!2sFarmacia%20Farma%26Med!5e0!3m2!1ses!2smx!4v1788902050581!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 text-center text-xs text-blue-200">
          © {new Date().getFullYear()} Farmacia FARMA&MED. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}