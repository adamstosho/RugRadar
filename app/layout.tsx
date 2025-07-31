import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RugRadar - Advanced Web3 Token Security Analysis",
  description:
    "RugRadar is an advanced Web3 security platform that detects potential rug pulls and analyzes ERC-20 tokens using real-time blockchain data and AI-powered risk assessment",
  keywords: "rug pull detector, token security, Web3 analytics, blockchain security, DeFi safety, token analysis",
  authors: [{ name: "RugRadar Team" }],
  generator: 'Next.js',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
