"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  latitude: string
  longitude: string
  title: string
  className?: string
}

export function PropertyMap({ latitude, longitude, title, className = "" }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple map implementation using an iframe with Google Maps
    // In a real application, you might want to use a proper map library like Mapbox or Google Maps API
    if (mapRef.current) {
      const lat = Number.parseFloat(latitude)
      const lng = Number.parseFloat(longitude)

      if (isNaN(lat) || isNaN(lng)) {
        return
      }

      const iframe = document.createElement("iframe")
      iframe.width = "100%"
      iframe.height = "100%"
      iframe.style.border = "0"
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=15`
      iframe.allowFullscreen = true

      mapRef.current.innerHTML = ""
      mapRef.current.appendChild(iframe)
    }
  }, [latitude, longitude])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Ubicación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-[300px] w-full rounded-md bg-slate-100 overflow-hidden">
          {/* Map will be loaded here */}
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {title} - Coordenadas: {latitude}, {longitude}
        </p>
      </CardContent>
    </Card>
  )
}
