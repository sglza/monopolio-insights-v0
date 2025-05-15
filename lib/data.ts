export interface Property {
  listingTitle: string
  price: number
  priceUsd: number
  location: string
  areaInSquareMeters: number
  numberOfBedrooms: number
  numberOfBathrooms: number
  numberOfHalfBathrooms: number
  parkingSpaces: number
  propertyDescription: string
  developmentAmenities: {
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
  advertiserName: string
  contactPhone: string
  contactEmail: string
  mainPhotos: string[]
  latitude: string
  longitude: string
}

export interface SavedProperty extends Property {
  listingId: string
  listingUrl: string
  listingDate: string
  additionalData?: AdditionalData
}

export interface AdditionalData {
  status: PropertyStatus
  insights: PropertyInsight[]
  comparables: ComparableProperty[]
}

export type PropertyStatus = "processing" | "complete" | "agent-followup" | "agent-complete"

export interface PropertyImage {
  url: string
}

export interface PropertyInsight {
  type: "valuation" | "risk" | "location" | "market" | "investment" | "agent-note"
  title: string
  value: string
  description?: string
  sentiment?: "positive" | "neutral" | "negative"
}

export interface ComparableProperty {
  id: string
  title: string
  price: number
  address: string
  imageUrl: string
  bedrooms: number
  bathrooms: number
  area: number
  distance: string
}

// Mock data for properties using new format
const properties: SavedProperty[] = [
  {
    listingId: "1",
    listingUrl: "https://ejemplo-inmobiliaria.com/propiedad/123",
    listingTitle: "Apartamento Moderno en Condesa",
    location: "Calle Mazatlán 123, Condesa, CDMX",
    price: 320000,
    priceUsd: 18285.71, // Using approximate exchange rate
    propertyDescription:
      "Hermoso apartamento moderno ubicado en el corazón de la Condesa. Cuenta con acabados de lujo, amplios espacios y excelente iluminación natural. El edificio ofrece seguridad 24/7, estacionamiento y áreas comunes.",
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    numberOfHalfBathrooms: 0,
    areaInSquareMeters: 85,
    parkingSpaces: 1,
    advertiserName: "Inmobiliaria Moderna",
    contactPhone: "+52 55 1234 5678",
    contactEmail: "ventas@inmobiliariamoderna.mx",
    developmentAmenities: {
      hasElevator: false,
      hasGarden: false,
      hasGym: false,
      hasJacuzzi: false,
      hasPool: false,
      hasSurveillance: false,
      hasStudio: false,
      hasBusinessCenter: false,
      hasEventsHall: false,
      hasKidsPlayground: false,
      hasMultipurposeHall: false,
      hasSpecialFacilities: false,
      hasCafeteria: false,
      hasGrill: false,
      isCondominium: false,
      hasGolfClub: false,
      hasSharedRooftop: false,
      hasWaterFront: false,
    },
    listingDate: "hace 2 horas",
    mainPhotos: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    additionalData: {
      status: "complete",
      insights: [
        {
          type: "valuation",
          title: "Precio",
          value: "$320,000",
          description: "Basado en 12 propiedades similares vendidas en los últimos 6 meses",
          sentiment: "neutral",
        },
        {
          type: "risk",
          title: "Nivel de Riesgo",
          value: "Bajo",
          description: "Propiedad verificada con documentación completa",
          sentiment: "positive",
        },
        {
          type: "location",
          title: "Calificación de Ubicación",
          value: "9.2/10",
          description: "Excelente acceso a transporte, restaurantes y servicios",
          sentiment: "positive",
        },
        {
          type: "market",
          title: "Tendencia del Mercado",
          value: "En alza",
          description: "Los precios en esta zona han aumentado un 5% en el último año",
          sentiment: "positive",
        },
        {
          type: "investment",
          title: "Potencial de Inversión",
          value: "Alto",
          description: "Rentabilidad estimada del 6.5% anual para alquiler",
          sentiment: "positive",
        },
      ],
      comparables: [
        {
          id: "comp-1",
          title: "Apartamento en Condesa",
          price: 315000,
          address: "Calle Campeche 234, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 82,
          distance: "0.3 km",
        },
        {
          id: "comp-2",
          title: "Apartamento con Balcón",
          price: 335000,
          address: "Av. Tamaulipas 56, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 90,
          distance: "0.5 km",
        },
        {
          id: "comp-3",
          title: "Piso Renovado",
          price: 305000,
          address: "Calle Pachuca 78, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 1,
          area: 80,
          distance: "0.7 km",
        },
      ],
    },
    latitude: "19.3823196",
    longitude: "-99.2673514",
  },
  {
    listingId: "2",
    listingUrl: "https://facebook.com/p/1234567890",
    listingTitle: "Departamento en Roma Norte",
    location: "Calle Mazatlán 123, Condesa, CDMX",
    price: 320000,
    priceUsd: 18285.71, // Using approximate exchange rate
    propertyDescription:
      "Hermoso apartamento moderno ubicado en el corazón de la Condesa. Cuenta con acabados de lujo, amplios espacios y excelente iluminación natural. El edificio ofrece seguridad 24/7, estacionamiento y áreas comunes.",
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    numberOfHalfBathrooms: 0,
    areaInSquareMeters: 85,
    parkingSpaces: 1,
    advertiserName: "Inmobiliaria Moderna",
    contactPhone: "+52 55 1234 5678",
    contactEmail: "ventas@inmobiliariamoderna.mx",
    developmentAmenities: {
      hasElevator: false,
      hasGarden: false,
      hasGym: false,
      hasJacuzzi: false,
      hasPool: false,
      hasSurveillance: false,
      hasStudio: false,
      hasBusinessCenter: false,
      hasEventsHall: false,
      hasKidsPlayground: false,
      hasMultipurposeHall: false,
      hasSpecialFacilities: false,
      hasCafeteria: false,
      hasGrill: false,
      isCondominium: false,
      hasGolfClub: false,
      hasSharedRooftop: false,
      hasWaterFront: false,
    },
    listingDate: "hace 2 horas",
    mainPhotos: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    additionalData: {
      status: "agent-followup",
      insights: [
        {
          type: "valuation",
          title: "Precio",
          value: "$320,000",
          description: "Basado en 12 propiedades similares vendidas en los últimos 6 meses",
          sentiment: "neutral",
        },
        {
          type: "risk",
          title: "Nivel de Riesgo",
          value: "Bajo",
          description: "Propiedad verificada con documentación completa",
          sentiment: "positive",
        },
        {
          type: "location",
          title: "Calificación de Ubicación",
          value: "9.2/10",
          description: "Excelente acceso a transporte, restaurantes y servicios",
          sentiment: "positive",
        },
        {
          type: "market",
          title: "Tendencia del Mercado",
          value: "En alza",
          description: "Los precios en esta zona han aumentado un 5% en el último año",
          sentiment: "positive",
        },
        {
          type: "investment",
          title: "Potencial de Inversión",
          value: "Alto",
          description: "Rentabilidad estimada del 6.5% anual para alquiler",
          sentiment: "positive",
        },
      ],
      comparables: [
        {
          id: "comp-1",
          title: "Apartamento en Condesa",
          price: 315000,
          address: "Calle Campeche 234, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 82,
          distance: "0.3 km",
        },
        {
          id: "comp-2",
          title: "Apartamento con Balcón",
          price: 335000,
          address: "Av. Tamaulipas 56, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 90,
          distance: "0.5 km",
        },
        {
          id: "comp-3",
          title: "Piso Renovado",
          price: 305000,
          address: "Calle Pachuca 78, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 1,
          area: 80,
          distance: "0.7 km",
        },
      ],
    },
    latitude: "19.3823196",
    longitude: "-99.2673514",
  },
  {
    listingId: "3",
    listingUrl: "https://agencia-pequeña.com/p/1234567890",
    listingTitle: "Casa en Roma Norte",
    location: "Calle Mazatlán 123, Condesa, CDMX",
    price: 320000,
    priceUsd: 18285.71, // Using approximate exchange rate
    propertyDescription:
      "Hermoso apartamento moderno ubicado en el corazón de la Condesa. Cuenta con acabados de lujo, amplios espacios y excelente iluminación natural. El edificio ofrece seguridad 24/7, estacionamiento y áreas comunes.",
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    numberOfHalfBathrooms: 0,
    areaInSquareMeters: 85,
    parkingSpaces: 1,
    advertiserName: "Inmobiliaria Moderna",
    contactPhone: "+52 55 1234 5678",
    contactEmail: "ventas@inmobiliariamoderna.mx",
    developmentAmenities: {
      hasElevator: false,
      hasGarden: false,
      hasGym: false,
      hasJacuzzi: false,
      hasPool: false,
      hasSurveillance: false,
      hasStudio: false,
      hasBusinessCenter: false,
      hasEventsHall: false,
      hasKidsPlayground: false,
      hasMultipurposeHall: false,
      hasSpecialFacilities: false,
      hasCafeteria: false,
      hasGrill: false,
      isCondominium: false,
      hasGolfClub: false,
      hasSharedRooftop: false,
      hasWaterFront: false,
    },
    listingDate: "hace 2 horas",
    mainPhotos: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    additionalData: {
      status: "agent-complete",
      insights: [
        {
          type: "valuation",
          title: "Precio",
          value: "$320,000",
          description: "Basado en 12 propiedades similares vendidas en los últimos 6 meses",
          sentiment: "neutral",
        },
        {
          type: "risk",
          title: "Nivel de Riesgo",
          value: "Bajo",
          description: "Propiedad verificada con documentación completa",
          sentiment: "positive",
        },
        {
          type: "location",
          title: "Calificación de Ubicación",
          value: "9.2/10",
          description: "Excelente acceso a transporte, restaurantes y servicios",
          sentiment: "positive",
        },
        {
          type: "market",
          title: "Tendencia del Mercado",
          value: "En alza",
          description: "Los precios en esta zona han aumentado un 5% en el último año",
          sentiment: "positive",
        },
        {
          type: "investment",
          title: "Potencial de Inversión",
          value: "Alto",
          description: "Rentabilidad estimada del 6.5% anual para alquiler",
          sentiment: "positive",
        },
      ],
      comparables: [
        {
          id: "comp-1",
          title: "Apartamento en Condesa",
          price: 315000,
          address: "Calle Campeche 234, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 82,
          distance: "0.3 km",
        },
        {
          id: "comp-2",
          title: "Apartamento con Balcón",
          price: 335000,
          address: "Av. Tamaulipas 56, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 90,
          distance: "0.5 km",
        },
        {
          id: "comp-3",
          title: "Piso Renovado",
          price: 305000,
          address: "Calle Pachuca 78, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 1,
          area: 80,
          distance: "0.7 km",
        },
      ],
    },
    latitude: "19.3823196",
    longitude: "-99.2673514",
  },
  {
    listingId: "4",
    listingUrl: "https://instagram.com/p/1234567890",
    listingTitle: "Departamento en Roma Norte",
    location: "Calle Mazatlán 123, Condesa, CDMX",
    price: 320000,
    priceUsd: 18285.71, // Using approximate exchange rate
    propertyDescription:
      "Hermoso apartamento moderno ubicado en el corazón de la Condesa. Cuenta con acabados de lujo, amplios espacios y excelente iluminación natural. El edificio ofrece seguridad 24/7, estacionamiento y áreas comunes.",
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    numberOfHalfBathrooms: 0,
    areaInSquareMeters: 85,
    parkingSpaces: 1,
    advertiserName: "Inmobiliaria Moderna",
    contactPhone: "+52 55 1234 5678",
    contactEmail: "ventas@inmobiliariamoderna.mx",
    developmentAmenities: {
      hasElevator: false,
      hasGarden: false,
      hasGym: false,
      hasJacuzzi: false,
      hasPool: false,
      hasSurveillance: false,
      hasStudio: false,
      hasBusinessCenter: false,
      hasEventsHall: false,
      hasKidsPlayground: false,
      hasMultipurposeHall: false,
      hasSpecialFacilities: false,
      hasCafeteria: false,
      hasGrill: false,
      isCondominium: false,
      hasGolfClub: false,
      hasSharedRooftop: false,
      hasWaterFront: false,
    },
    listingDate: "hace 2 horas",
    mainPhotos: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    additionalData: {
      status: "processing",
      insights: [
        {
          type: "valuation",
          title: "Precio",
          value: "$320,000",
          description: "Basado en 12 propiedades similares vendidas en los últimos 6 meses",
          sentiment: "neutral",
        },
        {
          type: "risk",
          title: "Nivel de Riesgo",
          value: "Bajo",
          description: "Propiedad verificada con documentación completa",
          sentiment: "positive",
        },
        {
          type: "location",
          title: "Calificación de Ubicación",
          value: "9.2/10",
          description: "Excelente acceso a transporte, restaurantes y servicios",
          sentiment: "positive",
        },
        {
          type: "market",
          title: "Tendencia del Mercado",
          value: "En alza",
          description: "Los precios en esta zona han aumentado un 5% en el último año",
          sentiment: "positive",
        },
        {
          type: "investment",
          title: "Potencial de Inversión",
          value: "Alto",
          description: "Rentabilidad estimada del 6.5% anual para alquiler",
          sentiment: "positive",
        },
      ],
      comparables: [
        {
          id: "comp-1",
          title: "Apartamento en Condesa",
          price: 315000,
          address: "Calle Campeche 234, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 82,
          distance: "0.3 km",
        },
        {
          id: "comp-2",
          title: "Apartamento con Balcón",
          price: 335000,
          address: "Av. Tamaulipas 56, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 2,
          area: 90,
          distance: "0.5 km",
        },
        {
          id: "comp-3",
          title: "Piso Renovado",
          price: 305000,
          address: "Calle Pachuca 78, Condesa, CDMX",
          imageUrl: "/placeholder.svg?height=300&width=400",
          bedrooms: 2,
          bathrooms: 1,
          area: 80,
          distance: "0.7 km",
        },
      ],
    },
    latitude: "19.3823196",
    longitude: "-99.2673514",
  },
]

// Update the return type of the functions to match the new interface
export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.listingId === id)
}

export function getAllProperties(): SavedProperty[] {
  return properties
}

// Remove the transformation functions since we're now using the new format directly
export function getAllPropertiesNewFormat(): PropertySearchResult {
  return { result: properties }
}

export function getPropertyByIdNewFormat(id: string): Property | undefined {
  return getPropertyById(id)
}

export interface PropertySearchResult {
  result: Property[]
}
