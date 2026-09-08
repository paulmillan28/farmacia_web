import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1: Información General / Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Farmacia</h3>
            <p className="text-sm text-slate-400">
              Atención médica y medicamentos con la mejor calidad al servicio de la comunidad.
            </p>
            
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-200 mb-2">Síguenos en</h4>
              {/* Enlace a Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Visitar Facebook
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos / Contacto */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Culiacán, Sinaloa, México</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+52 (667) 000-0000</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ubicación con Google Maps */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Nuestra Ubicación</h3>
            <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-700 shadow-sm">
              <iframe
                title="Google Maps Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115886.8798935408!2d-107.4578144!3d24.8089209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86bcd7335688a23d%3A0xb30491a580a8eb14!2sCuliac%C3%A1n%2C%20Sinaloa!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Separador y Derechos Reservados */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Farmacia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}