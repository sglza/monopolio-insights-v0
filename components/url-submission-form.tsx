"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSubmissionsStore, type Submission } from "@/store/submissions-store"
import { usePropertiesStore } from "@/store/properties-store"
import type { Property } from "@/lib/data"

export function UrlSubmissionForm() {
  const [url, setUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { addSubmission } = useSubmissionsStore()
  const { addProperty } = usePropertiesStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    // Validate URL
    if (!url.trim()) {
      setError("Por favor ingresa una URL")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("https://v0-web-app-for-properties.vercel.app/api/property-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const { result: data }: { result: Omit<Property, "listingId"> } = await response.json()

      const newId = `new-${Date.now()}`

      // Create a new submission with the API response data
      const newSubmission: Submission = {
        id: newId,
        url: url,
        title: data.listingTitle || "Nueva Propiedad",
        date: "Justo ahora",
        status: "processing",
        insights: `Precio: ${new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          maximumFractionDigits: 0,
        }).format(data.price || 0)}`,
      }

      // Update the stores
      addProperty({
        ...data,
        listingId: newId,
        listingUrl: url,
        listingDate: new Date().toISOString(),
        additionalData: {
          status: "processing",
          insights: [],
          comparables: [],
        },
      })
      addSubmission(newSubmission)

      setSuccess(true)
      setUrl("")
    } catch (err) {
      setError("Error al enviar la URL. Por favor intenta de nuevo.")
      console.error("Error submitting URL:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analizar Cualquier Propiedad</CardTitle>
        <CardDescription>
          Pega una URL de cualquier sitio inmobiliario para obtener información detallada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="https://ejemplo.com/propiedad-inmobiliaria"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
              disabled={isSubmitting}
            />
            <p className="text-xs text-slate-500">
              Funciona con propiedades de cualquier sitio, incluso publicaciones en redes sociales
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <AlertTitle>¡Éxito!</AlertTitle>
              <AlertDescription>
                Tu propiedad ha sido enviada para análisis. Revisa la sección de historial para actualizaciones.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando...
              </>
            ) : (
              "Analizar propiedad"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
