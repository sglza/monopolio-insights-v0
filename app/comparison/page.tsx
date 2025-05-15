"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useComparisonStore } from "@/store/comparison-store"
import { usePropertiesStore } from "@/store/properties-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, TrendingUp, AlertTriangle, MapPin, PiggyBank, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import type { SavedProperty } from "@/lib/data"

export default function ComparisonPage() {
  const router = useRouter()
  const { selectedPropertyIds, clearComparison } = useComparisonStore()
  const { properties } = usePropertiesStore()
  const [selectedProperties, setSelectedProperties] = useState<SavedProperty[]>([])
  const [comparisonInsights, setComparisonInsights] = useState<any>(null)

  useEffect(() => {
    if (selectedPropertyIds.length < 2) {
      router.push("/")
      return
    }

    const propertiesForComparison = properties.filter((p) => selectedPropertyIds.includes(p.listingId))
    setSelectedProperties(propertiesForComparison)

    // Generate mock comparison insights
    generateMockInsights(propertiesForComparison)
  }, [selectedPropertyIds, properties, router])

  const generateMockInsights = (props: SavedProperty[]) => {
    // Mock data for comparison insights
    const insights = {
      summary: {
        bestValue: props[0].listingId,
        bestLocation: props.length > 1 ? props[1].listingId : props[0].listingId,
        bestInvestment: props.length > 2 ? props[2].listingId : props[0].listingId,
        recommendation: props[Math.floor(Math.random() * props.length)].listingId,
      },
      valueAnalysis: {
        title: "Análisis de Valor",
        description:
          "Comparación del valor de las propiedades basado en precio por metro cuadrado, amenidades y condición.",
        properties: props.map((p) => ({
          id: p.listingId,
          pricePerSqm: Math.round(p.price / p.areaInSquareMeters),
          marketPosition: ["Por debajo del mercado", "En línea con el mercado", "Por encima del mercado"][
            Math.floor(Math.random() * 3)
          ],
          valueScore: Math.floor(Math.random() * 30) + 70,
          insights: [
            `Precio por m²: ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(Math.round(p.price / p.areaInSquareMeters))}`,
            `${Math.floor(Math.random() * 15) + 5}% ${Math.random() > 0.5 ? "por debajo" : "por encima"} del promedio de la zona`,
            `Potencial de valorización: ${Math.floor(Math.random() * 10) + 1}% anual`,
          ],
        })),
      },
      locationAnalysis: {
        title: "Análisis de Ubicación",
        description: "Evaluación de la ubicación basada en accesibilidad, servicios cercanos y seguridad.",
        properties: props.map((p) => ({
          id: p.listingId,
          locationScore: Math.floor(Math.random() * 20) + 80,
          transitScore: Math.floor(Math.random() * 30) + 70,
          safetyScore: Math.floor(Math.random() * 25) + 75,
          insights: [
            `A ${Math.floor(Math.random() * 15) + 5} minutos de transporte público`,
            `${Math.floor(Math.random() * 5) + 1} supermercados en un radio de 1km`,
            `Índice de seguridad: ${Math.floor(Math.random() * 3) + 8}/10`,
          ],
        })),
      },
      investmentAnalysis: {
        title: "Potencial de Inversión",
        description: "Análisis del potencial de inversión basado en rentabilidad, apreciación y demanda de alquiler.",
        properties: props.map((p) => ({
          id: p.listingId,
          rentalYield: (Math.random() * 3 + 4).toFixed(1) + "%",
          appreciationPotential: (Math.random() * 4 + 3).toFixed(1) + "%",
          demandScore: Math.floor(Math.random() * 20) + 80,
          insights: [
            `Rentabilidad estimada: ${(Math.random() * 3 + 4).toFixed(1)}% anual`,
            `Tiempo estimado para recuperar inversión: ${Math.floor(Math.random() * 5) + 15} años`,
            `Demanda de alquiler en la zona: ${["Alta", "Muy alta", "Media-alta"][Math.floor(Math.random() * 3)]}`,
          ],
        })),
      },
      recommendation: {
        title: "Recomendación Final",
        description: "Basado en nuestro análisis, esta es nuestra recomendación para tu caso específico.",
        recommendedProperty: props[Math.floor(Math.random() * props.length)].listingId,
        reasons: [
          "Mejor relación calidad-precio",
          "Ubicación estratégica con excelente potencial de valorización",
          "Amenidades que se ajustan a tus necesidades",
          "Buen potencial de rentabilidad si decides alquilar en el futuro",
        ],
        considerations: [
          "Verifica la documentación legal antes de proceder",
          "Considera negociar el precio final",
          "Evalúa los costos adicionales de mantenimiento y servicios",
        ],
      },
    }

    setComparisonInsights(insights)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getBestValueBadge = (propertyId: string) => {
    if (!comparisonInsights) return null

    if (propertyId === comparisonInsights.summary.bestValue) {
      return (
        <Badge className="absolute top-2 right-2 bg-green-100 text-green-700 border-green-200">
          <TrendingUp className="h-3 w-3 mr-1" /> Mejor Valor
        </Badge>
      )
    }
    return null
  }

  const getBestLocationBadge = (propertyId: string) => {
    if (!comparisonInsights) return null

    if (propertyId === comparisonInsights.summary.bestLocation) {
      return (
        <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-700 border-blue-200">
          <MapPin className="h-3 w-3 mr-1" /> Mejor Ubicación
        </Badge>
      )
    }
    return null
  }

  const getBestInvestmentBadge = (propertyId: string) => {
    if (!comparisonInsights) return null

    if (propertyId === comparisonInsights.summary.bestInvestment) {
      return (
        <Badge className="absolute top-2 right-2 bg-purple-100 text-purple-700 border-purple-200">
          <PiggyBank className="h-3 w-3 mr-1" /> Mejor Inversión
        </Badge>
      )
    }
    return null
  }

  const getRecommendedBadge = (propertyId: string) => {
    if (!comparisonInsights) return null

    if (propertyId === comparisonInsights.summary.recommendation) {
      return (
        <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-700 border-amber-200">
          <CheckCircle className="h-3 w-3 mr-1" /> Recomendado
        </Badge>
      )
    }
    return null
  }

  const handleClearComparison = () => {
    clearComparison()
    router.push("/")
  }

  if (selectedProperties.length < 2) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Selecciona al menos 2 propiedades para comparar</h1>
        <p className="text-slate-600 mb-6">Vuelve al inicio y selecciona las propiedades que deseas comparar.</p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          <Button
            variant="outline"
            onClick={handleClearComparison}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar comparación
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Comparación de Propiedades</h1>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {selectedProperties.map((property) => (
            <Card key={property.listingId} className="overflow-hidden">
              <div className="relative">
                <div className="relative h-48 w-full">
                  <Image
                    src={property.mainPhotos?.[0] || "/placeholder.svg?height=400&width=600"}
                    alt={property.listingTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Conditional badges based on insights */}
                <div className="absolute top-2 left-2">
                  <Badge className="bg-white text-slate-700 border-slate-200">
                    <Home className="h-3 w-3 mr-1" /> {property.numberOfBedrooms} hab
                  </Badge>
                </div>
                <Tabs defaultValue="value">
                  <TabsList className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm">
                    <TabsTrigger value="value">Valor</TabsTrigger>
                    <TabsTrigger value="location">Ubicación</TabsTrigger>
                    <TabsTrigger value="investment">Inversión</TabsTrigger>
                  </TabsList>
                  <TabsContent value="value">{getBestValueBadge(property.listingId)}</TabsContent>
                  <TabsContent value="location">{getBestLocationBadge(property.listingId)}</TabsContent>
                  <TabsContent value="investment">{getBestInvestmentBadge(property.listingId)}</TabsContent>
                </Tabs>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-slate-900 truncate">{property.listingTitle}</h3>
                <p className="text-blue-600 font-semibold mt-1">{formatPrice(property.price)}</p>
                <p className="text-sm text-slate-600 mt-1 truncate">{property.location || property.listingAddress}</p>
                <div className="flex justify-between items-center mt-3 text-sm text-slate-700">
                  <span>{property.areaInSquareMeters} m²</span>
                  <span>{property.numberOfBathrooms} baños</span>
                  <Link href={`/property/${property.listingId}`} className="text-blue-600 hover:underline">
                    Ver detalles
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Insights */}
        {comparisonInsights && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  {comparisonInsights.valueAnalysis.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{comparisonInsights.valueAnalysis.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparisonInsights.valueAnalysis.properties.map((analysis: any) => {
                    const property = selectedProperties.find((p) => p.listingId === analysis.id)
                    if (!property) return null

                    return (
                      <Card key={`value-${analysis.id}`} className="border-blue-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{property.listingTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Precio por m²:</span>
                              <span className="font-medium">
                                {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                                  analysis.pricePerSqm,
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Posición en mercado:</span>
                              <span className="font-medium">{analysis.marketPosition}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Puntuación de valor:</span>
                              <span className="font-medium">{analysis.valueScore}/100</span>
                            </div>
                            <Separator />
                            <div className="space-y-1 pt-2">
                              {analysis.insights.map((insight: string, i: number) => (
                                <p key={`value-insight-${analysis.id}-${i}`} className="text-xs text-slate-600">
                                  • {insight}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  {comparisonInsights.locationAnalysis.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{comparisonInsights.locationAnalysis.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparisonInsights.locationAnalysis.properties.map((analysis: any) => {
                    const property = selectedProperties.find((p) => p.listingId === analysis.id)
                    if (!property) return null

                    return (
                      <Card key={`location-${analysis.id}`} className="border-blue-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{property.listingTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Puntuación de ubicación:</span>
                              <span className="font-medium">{analysis.locationScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Acceso a transporte:</span>
                              <span className="font-medium">{analysis.transitScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Seguridad:</span>
                              <span className="font-medium">{analysis.safetyScore}/100</span>
                            </div>
                            <Separator />
                            <div className="space-y-1 pt-2">
                              {analysis.insights.map((insight: string, i: number) => (
                                <p key={`location-insight-${analysis.id}-${i}`} className="text-xs text-slate-600">
                                  • {insight}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PiggyBank className="h-5 w-5 mr-2 text-blue-600" />
                  {comparisonInsights.investmentAnalysis.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{comparisonInsights.investmentAnalysis.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparisonInsights.investmentAnalysis.properties.map((analysis: any) => {
                    const property = selectedProperties.find((p) => p.listingId === analysis.id)
                    if (!property) return null

                    return (
                      <Card key={`investment-${analysis.id}`} className="border-blue-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{property.listingTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Rentabilidad:</span>
                              <span className="font-medium">{analysis.rentalYield}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Potencial de apreciación:</span>
                              <span className="font-medium">{analysis.appreciationPotential}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Demanda de alquiler:</span>
                              <span className="font-medium">{analysis.demandScore}/100</span>
                            </div>
                            <Separator />
                            <div className="space-y-1 pt-2">
                              {analysis.insights.map((insight: string, i: number) => (
                                <p key={`investment-insight-${analysis.id}-${i}`} className="text-xs text-slate-600">
                                  • {insight}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Final Recommendation */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <CheckCircle className="h-5 w-5 mr-2 text-amber-600" />
                  {comparisonInsights.recommendation.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 mb-4">{comparisonInsights.recommendation.description}</p>

                {selectedProperties.map((property) => {
                  if (property.listingId !== comparisonInsights.recommendation.recommendedProperty) return null

                  return (
                    <div key={`recommendation-${property.listingId}`} className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="relative w-full md:w-1/3 h-48">
                        <Image
                          src={property.mainPhotos?.[0] || "/placeholder.svg?height=400&width=600"}
                          alt={property.listingTitle}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <h3 className="text-xl font-bold text-amber-800">{property.listingTitle}</h3>
                        <p className="text-lg font-semibold text-amber-700 mt-1">{formatPrice(property.price)}</p>
                        <p className="text-amber-700 mt-1">{property.location || property.listingAddress}</p>
                        <div className="flex gap-4 mt-2 text-amber-700">
                          <span>{property.numberOfBedrooms} hab</span>
                          <span>{property.numberOfBathrooms} baños</span>
                          <span>{property.areaInSquareMeters} m²</span>
                        </div>
                        <Link href={`/property/${property.listingId}`}>
                          <Button className="mt-4 bg-amber-600 hover:bg-amber-700">Ver propiedad</Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}

                <div className="mt-4">
                  <h4 className="font-medium text-amber-800 mb-2">Por qué recomendamos esta propiedad:</h4>
                  <ul className="space-y-1">
                    {comparisonInsights.recommendation.reasons.map((reason: string, i: number) => (
                      <li key={`reason-${i}`} className="flex items-start gap-2 text-amber-700">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-amber-100 rounded-md">
                  <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                    Consideraciones importantes:
                  </h4>
                  <ul className="space-y-1">
                    {comparisonInsights.recommendation.considerations.map((consideration: string, i: number) => (
                      <li key={`consideration-${i}`} className="text-amber-700 text-sm">
                        • {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
