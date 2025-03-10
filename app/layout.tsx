import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AnimatedLoader from '@/components/AnimatedLoader'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ojest - Car Rental Service",
  description: "Find, book, and rent a car in easy steps",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedLoader />
        {children}
      </body>
    </html>
  )
}



import './globals.css'