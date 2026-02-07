import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cumpleaños de Edson Noyla | RSVP',
  description: 'Confirma tu asistencia al cumpleaños de Edson Noyla - 21 de Febrero 2026',
  openGraph: {
    title: 'Estás Invitado al Cumpleaños de Edson Noyla',
    description: '21 de Febrero 2026 | Salón FER, Rio Grande, Zacatecas | Temática: Blanco y Negro',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
