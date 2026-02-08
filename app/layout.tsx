import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cumpleaños de Edson Noyola | RSVP',
  description: 'Confirma tu asistencia al cumpleaños de Edson Noyola - 21 de Febrero 2026, 3:00 PM',
  openGraph: {
    title: 'Estás Invitado al Cumpleaños de Edson Noyola',
    description: '21 de Febrero 2026 | 3:00 PM | Salón FER, Rio Grande, Zacatecas | Temática: Blanco y Negro',
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
