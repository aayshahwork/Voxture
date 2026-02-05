import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Pokant - Comprehensive Voice AI Testing",
  description:
    "The complete voice AI evaluation platform. Test accuracy, latency, noise resilience, and edge cases across real-world conditions.",
  generator: "v0.app",
  keywords: ["voice AI", "AI testing", "speech recognition", "audio evaluation", "ML testing", "robustness"],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F8F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1F2121" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
