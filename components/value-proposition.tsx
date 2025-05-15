import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ValueProposition() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-3">Analiza Cualquier Propiedad, Donde Sea</h2>
        <p className="text-blue-700 mb-4">
          No te limites a los portales principales. Obtén información sobre cualquier propiedad que descubras, incluso
          si aún no está en nuestra base de datos.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
            Análisis de Valoración
          </Badge>
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
            Detección de Fraude
          </Badge>
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
            Información de Ubicación
          </Badge>
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
            Seguimiento por Agente
          </Badge>
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
            Propiedades Comparables
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
