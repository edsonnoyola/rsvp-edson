'use client'

import { useState } from 'react'

interface RSVP {
  nombre: string
  telefono: string
  acompanantes: number
  timestamp: string
}

function buildWhatsAppUrl(phone: string, nombre: string) {
  const cleanPhone = phone.replace(/\D/g, '')
  const fullPhone = cleanPhone.length === 10 ? `52${cleanPhone}` : cleanPhone
  const msg = encodeURIComponent(
    `Hey ${nombre}!! 🎉🥳🔥\n\n` +
    `¿Ya estás listo/a?! Mañana es el PARTY del año 🪩💃🕺\n\n` +
    `*Edson Noyola* te espera para pasarla INCREÍBLE 🍻🎶\n\n` +
    `📅 *21 de Febrero*\n` +
    `🕒 *3:00 PM* (¡No llegues tarde! ⏰)\n` +
    `📍 *Salón "FER"* - Reforma 11b, Col. Centro, Rio Grande, Zac.\n\n` +
    `👔🖤🤍 *Dress code: Blanco y Negro* — ven elegante que habrá fotos 📸✨\n\n` +
    `Va a haber buena música, buen ambiente y mucha fiesta 🎊🎤🔊\n\n` +
    `*¡No faltes! Se va a poner buenísimo!* 💥🙌\n` +
    `Te esperamos 🫶`
  )
  return `https://wa.me/${fullPhone}?text=${msg}`
}

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState<Set<number>>(new Set())

  const fetchRsvps = async () => {
    try {
      const res = await fetch(`/api/rsvps?key=${encodeURIComponent(key)}`)
      if (!res.ok) throw new Error('No autorizado')
      const data = await res.json()
      setRsvps(data.rsvps)
      setLoaded(true)
      setError('')
    } catch {
      setError('Clave incorrecta')
    }
  }

  const markSent = (index: number) => {
    setSent((prev) => new Set(prev).add(index))
  }

  const totalGuests = rsvps.reduce((acc, r) => acc + 1 + r.acompanantes, 0)

  if (!loaded) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-sm w-full relative z-10">
          <h1
            className="text-2xl font-bold text-center mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Admin RSVPs
          </h1>
          <input
            type="password"
            placeholder="Clave de administrador"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchRsvps()}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={fetchRsvps}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all"
          >
            Ver RSVPs
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto relative z-10">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Lista de Invitados
        </h1>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 text-gray-400">
          <p>
            Confirmados:{' '}
            <span className="text-white font-bold">{rsvps.length}</span>
          </p>
          <p>
            Total asistentes:{' '}
            <span className="text-white font-bold">{totalGuests}</span>
          </p>
          <p>
            Recordatorios enviados:{' '}
            <span className="text-green-400 font-bold">{sent.size}</span>
            <span className="text-gray-600">/{rsvps.length}</span>
          </p>
        </div>

        {/* Send All Button */}
        {rsvps.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                rsvps.forEach((rsvp, i) => {
                  setTimeout(() => {
                    window.open(buildWhatsAppUrl(rsvp.telefono, rsvp.nombre), '_blank')
                    markSent(i)
                  }, i * 1500)
                })
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm font-medium flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.143 1.534 5.886L0 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.795 9.795 0 01-5.29-1.546l-.38-.226-3.932 1.032 1.05-3.836-.248-.395A9.768 9.768 0 012.18 12c0-5.414 4.406-9.82 9.82-9.82 5.414 0 9.82 4.406 9.82 9.82 0 5.414-4.406 9.82-9.82 9.82z"/>
              </svg>
              Enviar recordatorio a TODOS
            </button>
          </div>
        )}

        {rsvps.length === 0 ? (
          <div className="glass-card p-12 text-center text-gray-500">
            Aun no hay confirmaciones
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-gray-400 text-sm">#</th>
                    <th className="text-left p-4 text-gray-400 text-sm">Nombre</th>
                    <th className="text-left p-4 text-gray-400 text-sm">Telefono</th>
                    <th className="text-left p-4 text-gray-400 text-sm">Acomp.</th>
                    <th className="text-left p-4 text-gray-400 text-sm">Fecha</th>
                    <th className="text-left p-4 text-gray-400 text-sm">Recordatorio</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 text-gray-500">{i + 1}</td>
                      <td className="p-4 font-medium">{rsvp.nombre}</td>
                      <td className="p-4 text-gray-300">{rsvp.telefono}</td>
                      <td className="p-4 text-gray-300">{rsvp.acompanantes}</td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(rsvp.timestamp).toLocaleDateString('es-MX')}
                      </td>
                      <td className="p-4">
                        {sent.has(i) ? (
                          <span className="text-green-400 text-sm flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            Enviado
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              window.open(buildWhatsAppUrl(rsvp.telefono, rsvp.nombre), '_blank')
                              markSent(i)
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 border border-green-600/30 text-green-400 rounded-lg text-sm hover:bg-green-600/30 transition-all cursor-pointer"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            </svg>
                            Enviar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
