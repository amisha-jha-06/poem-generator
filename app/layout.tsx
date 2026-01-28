import type { Metadata, Viewport } from 'next'
import { Great_Vibes } from 'next/font/google'
import './globals.css'

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
})

export const metadata: Metadata = {
  title: 'Partner Poem Game',
  description: 'Generate a personalized poem for your partner',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={greatVibes.variable}>
      <body>{children}</body>
    </html>
  )
}
