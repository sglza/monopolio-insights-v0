import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComparableProperty } from "@/lib/data"
import { Bed, Bath, Square, MapPin } from "lucide-react"
import Image from "next/image"

interface PropertyComparablesProps {
  comparables: ComparableProperty[]
  className?: string
}

export function PropertyComparables({ comparables, className = "" }: PropertyComparablesProps) {
  if (comparables.length === 0) {
    return null
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Propiedades Comparables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparables.map((comparable) => (
            <Card key={comparable.id} className="overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={comparable.imageUrl || "/placeholder.svg"}
                  alt={comparable.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-slate-900 mb-1">{comparable.title}</h3>
                <p className="text-blue-600 font-semibold mb-2">{formatPrice(comparable.price)}</p>
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{comparable.address}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-700">
                  <div className="flex items-center">
                    <Bed className="h-3 w-3 mr-1" />
                    <span>{comparable.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-3 w-3 mr-1" />
                    <span>{comparable.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-3 w-3 mr-1" />
                    <span>{comparable.area} m²</span>
                  </div>
                  <div className="ml-auto text-blue-600">A {comparable.distance}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
