'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Slide {
  id: string
  title: string
  description: string
  button_text?: string | null
  button_link?: string | null
  image_url: string
}

export default function HeroCarousel({ slides = [] }: { slides?: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Si no hay slides cargados en la base de datos, mostramos uno por defecto
  const itemsToDisplay = slides.length > 0 ? slides : [
    {
      id: 'default-1',
      title: 'Bienvenido a Farmacia WERITO POWER',
      description: 'Encuentra las mejores ofertas y productos para tu salud.',
      button_text: null,
      button_link: null,
      image_url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  useEffect(() => {
    if (itemsToDisplay.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsToDisplay.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [itemsToDisplay.length])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? itemsToDisplay.length - 1 : prevIndex - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsToDisplay.length)
  }

  return (
    <section className="relative w-full h-[350px] md:h-[480px] overflow-hidden bg-slate-900">
      {itemsToDisplay.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image_url}
            alt={slide.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />

          <div className="absolute inset-0 flex items-center max-w-6xl mx-auto px-6">
            <div className="max-w-xl text-white space-y-3">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                {slide.title}
              </h1>
              <p className="text-sm md:text-base text-slate-200">
                {slide.description}
              </p>

              {slide.button_text && slide.button_link && (
                <div className="pt-2">
                  <Link
                    href={slide.button_link}
                    className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-colors"
                  >
                    {slide.button_text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {itemsToDisplay.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {itemsToDisplay.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-emerald-500 w-6' : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}