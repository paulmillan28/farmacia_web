import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer' // <-- 1. Importa el Footer

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Farmacia',
  description: 'Landing page de la farmacia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between`}>
        {/* Contenido principal de la página */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 2. Coloca el Footer al final */}
        <Footer />
      </body>
    </html>
  )
}