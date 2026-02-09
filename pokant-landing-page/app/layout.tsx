import type React from "react"
import type { Metadata, Viewport } from "next"
import Link from "next/link"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import { RejectionHandler } from "./rejection-handler"
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
      <body className="font-sans antialiased">
        <RejectionHandler />
        {children}

        {/* Global quick-access button */}
        <div className="fixed bottom-6 right-6 z-[100]">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-border/50 bg-card/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-lg backdrop-blur hover:border-primary/40 hover:bg-card/90 transition-colors"
          >
            View dashboard
          </Link>
        </div>
      </body>
    </html>
  )
}
