import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Search, UserRound, Phone } from "lucide-react"

export function HowItWorks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cómo Funciona</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">1. Envía Cualquier URL de Propiedad</h3>
              <p className="text-sm text-slate-500">
                ¿Encontraste una propiedad en un sitio pequeño, redes sociales o foro? Solo pega la URL.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">2. Análisis Automatizado</h3>
              <p className="text-sm text-slate-500">
                Nuestro sistema extrae datos y proporciona información sobre valoración, riesgos y propiedades
                comparables.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">3. Seguimiento por Agente (Si es Necesario)</h3>
              <p className="text-sm text-slate-500">
                Si faltan datos críticos, nuestro equipo contacta al agente inmobiliario para obtener la información que
                necesitas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">4. Información Completa Entregada</h3>
              <p className="text-sm text-slate-500">
                Recibes un análisis completo, y la propiedad se agrega a nuestra base de datos, ayudando a todos los
                usuarios.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
