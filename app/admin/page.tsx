'use client'

import { useState } from 'react'

interface RSVP {
  nombre: string
  telefono: string
  acompanantes: number
  timestamp: string
}

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

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

  const totalGuests = rsvps.reduce((acc, r) => acc + 1 + r.acompanantes, 0)

  if (!loaded) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-pattern" />
        <div className="glass-card p-8 max-w-sm w-full relative z-10">
          <h1
            className="text-2xl font-bold text-center mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
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
    <main className="min-h-screen p-6">
      <div className="bg-pattern" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Lista de Invitados
        </h1>
        <div className="flex gap-6 mb-8 text-gray-400">
          <p>
            Confirmados:{' '}
            <span className="text-white font-bold">{rsvps.length}</span>
          </p>
          <p>
            Total asistentes:{' '}
            <span className="text-white font-bold">{totalGuests}</span>
          </p>
        </div>

        {rsvps.length === 0 ? (
          <div className="glass-card p-12 text-center text-gray-500">
            Aún no hay confirmaciones
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-gray-400 text-sm">#</th>
                    <th className="text-left p-4 text-gray-400 text-sm">
                      Nombre
                    </th>
                    <th className="text-left p-4 text-gray-400 text-sm">
                      Teléfono
                    </th>
                    <th className="text-left p-4 text-gray-400 text-sm">
                      Acomp.
                    </th>
                    <th className="text-left p-4 text-gray-400 text-sm">
                      Fecha
                    </th>
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
                      <td className="p-4 text-gray-300">
                        {rsvp.acompanantes}
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(rsvp.timestamp).toLocaleDateString('es-MX')}
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
