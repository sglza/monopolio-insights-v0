import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bed, Bath, Square, MapPin, Calendar, ExternalLink, Car, Phone, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property, PropertyStatus } from "@/lib/data"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const getStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Procesando</Badge>
      case "complete":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Análisis Completo</Badge>
      case "agent-followup":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Seguimiento por Agente</Badge>
      case "agent-complete":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Verificado por Agente</Badge>
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatPriceUSD = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">{property.listingTitle}</h1>
              {getStatusBadge(property.additionalData?.status || "processing")}
            </div>
            <div className="flex items-center text-slate-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location || property.listingAddress}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-slate-700 mb-4">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2 text-blue-600" />
                <span>{property.numberOfBedrooms} Habitaciones</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2 text-blue-600" />
                <span>
                  {property.numberOfBathrooms !== null
                    ? `${property.numberOfBathrooms} Baños${
                        property.numberOfHalfBathrooms ? ` + ${property.numberOfHalfBathrooms} Medios` : ""
                      }`
                    : "Baños: Dato no disponible"}
                </span>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-2 text-blue-600" />
                <span>
                  {property.areaInSquareMeters !== null
                    ? `${property.areaInSquareMeters} m²`
                    : "Área: Dato no disponible"}
                </span>
              </div>
              {property.parkingSpaces > 0 && (
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-blue-600" />
                  <span>
                    {property.parkingSpaces} Estacionamiento{property.parkingSpaces > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
            <p className="text-slate-600 mb-4">{property.propertyDescription || property.listingDescription}</p>

            {/* Contact information */}
            {(property.advertiserName || property.contactPhone || property.contactEmail) && (
              <div className="mt-4 p-3 bg-slate-50 rounded-md">
                <h3 className="font-medium text-slate-800 mb-2">Información de contacto</h3>
                <div className="space-y-2">
                  {property.advertiserName && (
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{property.advertiserName}</span>
                    </div>
                  )}
                  {property.contactPhone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{property.contactPhone}</span>
                    </div>
                  )}
                  {property.contactEmail && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{property.contactEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center mt-4 text-sm text-slate-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Enviado {property.listingDate}</span>
              <span className="mx-2">•</span>
              <a
                href={property.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                Ver fuente original
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-3xl font-bold text-blue-600 mb-1">{formatPrice(property.price)}</div>
            {property.priceUsd && (
              <div className="text-sm text-slate-600 mb-2">Aprox. {formatPriceUSD(property.priceUsd)}</div>
            )}
            <Button className="w-full md:w-auto">Contactar Agente</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
