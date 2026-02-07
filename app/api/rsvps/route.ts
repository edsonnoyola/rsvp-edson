import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const rsvps = await redis.lrange('rsvps', 0, -1)
    const parsed = rsvps.map((r: unknown) =>
      typeof r === 'string' ? JSON.parse(r) : r
    )

    return NextResponse.json({ rsvps: parsed, total: parsed.length })
  } catch (error) {
    console.error('Error fetching RSVPs:', error)
    return NextResponse.json(
      { error: 'Error al obtener RSVPs' },
      { status: 500 }
    )
  }
}
