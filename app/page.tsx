'use client'

import { useState, useEffect, useRef } from 'react'

function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDuration: `${Math.random() * 8 + 6}s`,
            animationDelay: `${Math.random() * 6}s`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
    </div>
  )
}

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const target = new Date('2026-02-21T15:00:00-06:00').getTime()
    const update = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const boxes = [
    { value: time.days, label: 'Días' },
    { value: time.hours, label: 'Horas' },
    { value: time.mins, label: 'Min' },
    { value: time.secs, label: 'Seg' },
  ]

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {boxes.map((box) => (
        <div key={box.label} className="countdown-box text-center">
          <p
            className="text-2xl sm:text-3xl font-light text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {String(box.value).padStart(2, '0')}
          </p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-gray-500 mt-1">
            {box.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    acompanantes: 0,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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

      if (res.status === 409) {
        setError('Este número ya está registrado. ¡Ya te esperamos!')
        setLoading(false)
        return
      }
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
    const colors = ['#ffffff', '#e0e0e0', '#a0a0a0', '#707070', '#404040']
    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = `${Math.random() * 100}vw`
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)]
      confetti.style.width = `${Math.random() * 10 + 4}px`
      confetti.style.height = `${Math.random() * 10 + 4}px`
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
      confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s forwards`
      document.body.appendChild(confetti)
      setTimeout(() => confetti.remove(), 6000)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Particles />
        <div className="glass-card p-12 sm:p-16 text-center max-w-md w-full scale-in relative z-10">
          <div className="text-7xl mb-8">&#127881;</div>
          <h2
            className="text-4xl font-light mb-4 text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            &#161;Confirmado!
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Gracias{' '}
            <span className="text-white font-normal">{formData.nombre}</span>,
            <br />
            te esperamos el{' '}
            <strong className="text-white">21 de febrero a las 3:00 PM</strong>
          </p>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500 tracking-wide">
              Recuerda la tem&#225;tica
            </p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="w-6 h-6 rounded-full bg-white shadow-lg shadow-white/20" />
              <span
                className="text-lg tracking-[0.15em] uppercase text-gray-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Blanco &amp; Negro
              </span>
              <span className="w-6 h-6 rounded-full bg-black border-2 border-white/30" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative">
      <Particles />

      {/* ===== HERO SECTION - Full Screen ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
        {/* Top ornamental line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent fade-only delay-1" />

        <div className="relative z-10 text-center">
          {/* Invite text */}
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gray-500 fade-in">
            Est&#225;s invitado
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 my-4 fade-in delay-1">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="text-white/20"
            >
              <path
                d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Main Name */}
          <h1
            className="text-7xl sm:text-8xl md:text-9xl font-light shimmer-text fade-in delay-1 leading-[0.9]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Edson
          </h1>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-light shimmer-text fade-in delay-2 leading-[0.9] mt-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Noyola
          </h1>

          {/* Subtitle */}
          <div className="mt-8 fade-in delay-3">
            <p
              className="text-xl sm:text-2xl font-light italic text-gray-400"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Celebraci&#243;n de Cumplea&#241;os
            </p>
          </div>

          {/* Date highlight */}
          <div className="mt-10 fade-in delay-3">
            <div className="inline-flex flex-col items-center px-8 py-5 border border-white/10 rounded-2xl bg-white/[0.02]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600">
                S&#225;bado
              </p>
              <p
                className="text-4xl sm:text-5xl font-light text-white my-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                21
              </p>
              <p className="text-sm tracking-[0.2em] uppercase text-gray-400">
                Febrero 2026
              </p>
              <div className="h-px w-12 bg-white/10 my-3" />
              <p className="text-lg text-white font-light">3:00 PM</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="mt-10 fade-in delay-4">
            <Countdown />
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToForm}
            className="mt-12 fade-in delay-5 cursor-pointer bg-transparent border-none"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 mb-3">
              Confirma tu asistencia
            </p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mx-auto text-gray-500 bounce-down"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ===== INFO + FORM SECTION ===== */}
      <section
        ref={formRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="w-full max-w-lg mx-auto">
          {/* Venue Info */}
          <div className="text-center mb-12 fade-in">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 mb-6">
              Lugar del evento
            </p>

            <h2
              className="text-4xl sm:text-5xl font-light text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sal&#243;n &#8220;FER&#8221;
            </h2>

            <p className="text-gray-400 font-light">
              Calle Reforma 11b, Col. Centro
            </p>
            <p className="text-gray-500 font-light">
              Rio Grande, Zacatecas
            </p>

            {/* Dress code */}
            <div className="mt-8">
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/[0.02]">
                <span className="w-5 h-5 rounded-full bg-white shadow-lg shadow-white/10" />
                <span
                  className="text-sm tracking-[0.15em] uppercase text-gray-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Tem&#225;tica: Blanco &amp; Negro
                </span>
                <span className="w-5 h-5 rounded-full bg-black border-2 border-white/30" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              className="text-white/15"
            >
              <path
                d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* RSVP Form */}
          <div className="glass-card p-8 sm:p-10">
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 mb-2">
                RSVP
              </p>
              <h2
                className="text-3xl sm:text-4xl font-light text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Confirma tu Asistencia
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-600 mb-2 block">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-white/25 transition-all focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-600 mb-2 block">
                  Tel&#233;fono
                </label>
                <input
                  type="tel"
                  placeholder="Tu n&#250;mero"
                  required
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      telefono: e.target.value,
                    }))
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-white/25 transition-all focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-600 mb-2 block">
                  Acompa&#241;antes
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="10"
                  value={formData.acompanantes || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      acompanantes: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-white/25 transition-all focus:bg-white/[0.05]"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-medium py-4 rounded-xl hover:bg-gray-100 transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed text-base tracking-[0.1em] uppercase"
                >
                  {loading ? 'Registrando...' : 'Confirmar Asistencia'}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-700 text-[10px] tracking-[0.2em] uppercase mt-10">
            &#161;Te esperamos!
          </p>
        </div>
      </section>
    </main>
  )
}
