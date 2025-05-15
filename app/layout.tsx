import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SubmissionsProvider } from "@/context/submissions-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MonopolioInsights - Meta-Buscador Inmobiliario",
  description: "Obtén información detallada sobre cualquier propiedad, sin importar dónde la encuentres.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="light">
      <body className={inter.className}>
        <SubmissionsProvider>{children}</SubmissionsProvider>
      </body>
    </html>
  )
}
