import './globals.css'
import { Inter, Syne } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})

export const metadata = {
  title: 'John Doe - Creative Developer',
  description: 'Portfolio of John Doe, showcasing innovative web experiences and creative coding projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}
