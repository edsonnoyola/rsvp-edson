import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

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

    const rsvp = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
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
