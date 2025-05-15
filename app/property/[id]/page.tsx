"use client"

import { PropertyDetails } from "@/components/property-details"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyInsights } from "@/components/property-insights"
import { PropertyComparables } from "@/components/property-comparables"
import { PropertyAmenities } from "@/components/property-amenities"
import { PropertyMap } from "@/components/property-map"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { usePropertiesStore } from "@/store/properties-store"

export default function PropertyPage() {
  const params = useParams()
  // In a real app, this would fetch from an API or database
  const property = usePropertiesStore((state) => state.properties.find((p) => p.listingId === params.id))
  const properties = usePropertiesStore((state) => state.properties)

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Propiedad no encontrada</h1>
        <p className="text-slate-600 mb-6">La propiedad que estás buscando no existe o ha sido eliminada.</p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>

        <PropertyDetails property={property} />

        <div className="grid gap-8 md:grid-cols-3 mt-8">
          <div className="md:col-span-2">
            <PropertyGallery images={property.mainPhotos?.map((url) => ({ url })) || []} />

            {/* Add amenities section if property has amenities */}
            {property.developmentAmenities && Object.values(property.developmentAmenities).some(Boolean) && (
              <PropertyAmenities amenities={property.developmentAmenities} className="mt-8" />
            )}

            {/* Add map if property has coordinates */}
            {property.latitude && property.longitude && (
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                title={property.listingTitle}
                className="mt-8"
              />
            )}

            <PropertyComparables comparables={property.additionalData?.comparables || []} className="mt-8" />
          </div>
          <div>
            <PropertyInsights
              insights={property.additionalData?.insights || []}
              status={property.additionalData?.status || "processing"}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
