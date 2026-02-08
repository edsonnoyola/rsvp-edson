import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, telefono, acompanantes } = body

    if (!nombre || !telefono) {
      return NextResponse.json(
        { error: 'Nombre y teléfono son requeridos' },
        { status: 400 }
      )
    }

    const tel = telefono.trim().replace(/\D/g, '')

    // Check if phone already registered
    const existing = await redis.lrange('rsvps', 0, -1)
    const duplicate = existing.some((r: unknown) => {
      const parsed = typeof r === 'string' ? JSON.parse(r) : r
      return parsed.telefono?.replace(/\D/g, '') === tel
    })

    if (duplicate) {
      return NextResponse.json(
        { error: 'Este número ya está registrado' },
        { status: 409 }
      )
    }

    const rsvp = {
      nombre: nombre.trim(),
      telefono: tel,
      acompanantes: acompanantes || 0,
      timestamp: new Date().toISOString(),
    }

    await redis.lpush('rsvps', JSON.stringify(rsvp))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving RSVP:', error)
    return NextResponse.json(
      { error: 'Error al registrar' },
      { status: 500 }
    )
  }
}
