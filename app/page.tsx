'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    acompanantes: 0,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Error al registrar')

      setSubmitted(true)
      createConfetti()
    } catch {
      setError('Hubo un error. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const createConfetti = () => {
    const colors = ['#ffffff', '#c0c0c0', '#666666', '#333333']
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = `${Math.random() * 100}vw`
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.width = `${Math.random() * 8 + 5}px`
      confetti.style.height = `${Math.random() * 8 + 5}px`
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'
      confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s forwards`
      document.body.appendChild(confetti)
      setTimeout(() => confetti.remove(), 6000)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-pattern" />
        <div className="glass-card p-12 text-center max-w-md w-full scale-in relative z-10">
          <div className="text-6xl mb-6">🎉</div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ¡Confirmado!
          </h2>
          <p className="text-gray-300 text-lg">
            Gracias{' '}
            <span className="text-white font-semibold">{formData.nombre}</span>,
            te esperamos el <strong>21 de febrero</strong>.
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Recuerda: Temática Blanco y Negro 🖤🤍
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="bg-pattern" />

      {/* Decorative background numbers */}
      <div
        className="absolute top-8 left-6 text-white/[0.03] text-[10rem] font-bold select-none pointer-events-none leading-none"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        21
      </div>
      <div
        className="absolute bottom-8 right-6 text-white/[0.03] text-[10rem] font-bold select-none pointer-events-none leading-none"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        FEB
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 fade-in">
            Estás invitado al cumpleaños de
          </p>

          <h1
            className="text-6xl md:text-7xl font-black mt-4 shimmer-text fade-in delay-1"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Edson
          </h1>
          <h1
            className="text-5xl md:text-6xl font-black shimmer-text fade-in delay-1"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Noyla
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-6 fade-in delay-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
            <span className="text-white/30 text-lg">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>

        {/* Event Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8 fade-in delay-2">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-600 mb-1">
              Fecha
            </p>
            <p className="text-lg text-white font-light">21 de Febrero, 2026</p>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/10" />

          <div className="text-center">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-600 mb-1">
              Lugar
            </p>
            <p className="text-lg text-white font-light">Salón &ldquo;FER&rdquo;</p>
            <p className="text-sm text-gray-500">Reforma 11b, Col. Centro</p>
            <p className="text-sm text-gray-500">Rio Grande, Zacatecas</p>
          </div>
        </div>

        {/* Dress Code Badge */}
        <div className="text-center mb-10 fade-in delay-3">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="w-4 h-4 rounded-full bg-black border border-white/30" />
            <span className="text-xs tracking-[0.15em] uppercase text-gray-400">
              Temática: Blanco y Negro
            </span>
            <span className="w-4 h-4 rounded-full bg-white" />
          </div>
        </div>

        {/* RSVP Form */}
        <div className="glass-card p-8 fade-in delay-4">
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Confirma tu Asistencia
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre completo"
              required
              value={formData.nombre}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nombre: e.target.value }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
            />

            <input
              type="tel"
              placeholder="Tu teléfono"
              required
              value={formData.telefono}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, telefono: e.target.value }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
            />

            <input
              type="number"
              placeholder="Número de acompañantes"
              min="0"
              max="10"
              value={formData.acompanantes || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  acompanantes: parseInt(e.target.value) || 0,
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide"
            >
              {loading ? 'Registrando...' : 'Confirmar Asistencia'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-xs mt-8 fade-in delay-5">
          ¡Te esperamos!
        </p>
      </div>
    </main>
  )
}
