import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CableCarIcon as Elevator,
  Trees,
  Dumbbell,
  Waves,
  PocketIcon as Pool,
  Shield,
  BookOpen,
  Building2,
  PartyPopper,
  Baby,
  Users,
  ShipWheelIcon as Wheelchair,
  Coffee,
  Utensils,
  Home,
  ClubIcon as GolfClub,
  Umbrella,
  Ship,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: {
    hasElevator: boolean
    hasGarden: boolean
    hasGym: boolean
    hasJacuzzi: boolean
    hasPool: boolean
    hasSurveillance: boolean
    hasStudio: boolean
    hasBusinessCenter: boolean
    hasEventsHall: boolean
    hasKidsPlayground: boolean
    hasMultipurposeHall: boolean
    hasSpecialFacilities: boolean
    hasCafeteria: boolean
    hasGrill: boolean
    isCondominium: boolean
    hasGolfClub: boolean
    hasSharedRooftop: boolean
    hasWaterFront: boolean
  }
  className?: string
}

export function PropertyAmenities({ amenities, className = "" }: PropertyAmenitiesProps) {
  // Filter out amenities that are false
  const availableAmenities = Object.entries(amenities).filter(([_, value]) => value === true)

  if (availableAmenities.length === 0) {
    return null
  }

  // Map of amenity keys to display names and icons
  const amenityMap: Record<string, { name: string; icon: React.ReactNode }> = {
    hasElevator: { name: "Elevador", icon: <Elevator className="h-4 w-4" /> },
    hasGarden: { name: "Jardín", icon: <Trees className="h-4 w-4" /> },
    hasGym: { name: "Gimnasio", icon: <Dumbbell className="h-4 w-4" /> },
    hasJacuzzi: { name: "Jacuzzi", icon: <Waves className="h-4 w-4" /> },
    hasPool: { name: "Piscina", icon: <Pool className="h-4 w-4" /> },
    hasSurveillance: { name: "Vigilancia", icon: <Shield className="h-4 w-4" /> },
    hasStudio: { name: "Estudio", icon: <BookOpen className="h-4 w-4" /> },
    hasBusinessCenter: { name: "Centro de Negocios", icon: <Building2 className="h-4 w-4" /> },
    hasEventsHall: { name: "Salón de Eventos", icon: <PartyPopper className="h-4 w-4" /> },
    hasKidsPlayground: { name: "Área Infantil", icon: <Baby className="h-4 w-4" /> },
    hasMultipurposeHall: { name: "Salón Multiusos", icon: <Users className="h-4 w-4" /> },
    hasSpecialFacilities: { name: "Instalaciones Especiales", icon: <Wheelchair className="h-4 w-4" /> },
    hasCafeteria: { name: "Cafetería", icon: <Coffee className="h-4 w-4" /> },
    hasGrill: { name: "Área de Parrilla", icon: <Utensils className="h-4 w-4" /> },
    isCondominium: { name: "Condominio", icon: <Home className="h-4 w-4" /> },
    hasGolfClub: { name: "Club de Golf", icon: <GolfClub className="h-4 w-4" /> },
    hasSharedRooftop: { name: "Terraza Compartida", icon: <Umbrella className="h-4 w-4" /> },
    hasWaterFront: { name: "Frente al Agua", icon: <Ship className="h-4 w-4" /> },
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Amenidades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {availableAmenities.map(([key]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {amenityMap[key]?.icon}
              </div>
              <span className="text-sm">{amenityMap[key]?.name || key}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
