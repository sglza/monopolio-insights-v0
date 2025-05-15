import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropertyInsight, PropertyStatus } from "@/lib/data"
import { TrendingUp, AlertTriangle, MapPin, BarChart, PiggyBank, PhoneCall, CheckCircle, Clock } from "lucide-react"

interface PropertyInsightsProps {
  insights: PropertyInsight[]
  status: PropertyStatus
}

export function PropertyInsights({ insights, status }: PropertyInsightsProps) {
  const getInsightIcon = (type: PropertyInsight["type"]) => {
    switch (type) {
      case "valuation":
        return <TrendingUp className="h-5 w-5 text-blue-600" />
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
      case "location":
        return <MapPin className="h-5 w-5 text-green-600" />
      case "market":
        return <BarChart className="h-5 w-5 text-purple-600" />
      case "investment":
        return <PiggyBank className="h-5 w-5 text-cyan-600" />
      case "agent-note":
        return <PhoneCall className="h-5 w-5 text-blue-600" />
    }
  }

  const getStatusMessage = (status: PropertyStatus) => {
    switch (status) {
      case "processing":
        return (
          <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-700 rounded-md mb-4">
            <Clock className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">Estamos analizando esta propiedad. Los resultados estarán disponibles en breve.</p>
          </div>
        )
      case "agent-followup":
        return (
          <div className="flex items-center gap-2 p-4 bg-amber-50 text-amber-700 rounded-md mb-4">
            <PhoneCall className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Información incompleta</p>
              <p className="text-sm mt-1">
                Nuestro agente está contactando al vendedor para obtener información importante faltante sobre esta
                propiedad.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de la Propiedad</CardTitle>
      </CardHeader>
      <CardContent>
        {getStatusMessage(status)}

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getInsightIcon(insight.type)}</div>
                <div>
                  <h3 className="font-medium text-slate-900">{insight.title}</h3>
                  <div className="mt-1 text-lg font-semibold text-slate-900">{insight.value}</div>
                  {insight.description && <p className="mt-1 text-sm text-slate-600">{insight.description}</p>}
                </div>
              </div>
            </div>
          ))}

          {status === "complete" || status === "agent-complete" ? (
            <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-md mt-6">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                {status === "agent-complete"
                  ? "Esta propiedad ha sido verificada por nuestro agente."
                  : "Análisis completo basado en datos del mercado y comparables."}
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
