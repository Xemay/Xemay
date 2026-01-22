import React from "react"
import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'xemay4ik portfolio',
  icons: {
    icon: [
      {
        url: '/ava.jpg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/ava.jpg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/ava.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
