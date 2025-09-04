import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SolanaProvider } from '@/components/solana/solana-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'haters.me | Believe in yourself',
  description: 'Set goals, stake USDC, and hold yourself accountable with haters.me',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/react.svg" />
      </head>
      <body className={inter.className}>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  )
}