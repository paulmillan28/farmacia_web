import Link from 'next/link'
import { getPharmacySections } from '@/modules/sections/services'

export default async function HomePage() {
  const sections = await getPharmacySections()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-600">Farmacia Mía</h1>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>

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

      {/* Contenido Dinámico: Secciones y Publicaciones */}
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

              {/* Grid Responsivo de Publicaciones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.posts
                  ?.filter((post: any) => post.is_published)
                  .map((post: any) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                    >
                      {post.image_url && (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="h-48 w-full object-cover"
                        />
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg text-slate-900 line-clamp-1">
                            {post.title}
                          </h4>
                          <p className="text-slate-600 text-sm mt-2 line-clamp-3">
                            {post.content}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Farmacia. Todos los derechos reservados.
      </footer>
    </div>
  )
}