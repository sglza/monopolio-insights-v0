"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Clock, CheckCircle, PhoneCall, ChevronLeft, ChevronRight, Filter, BarChart2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSubmissionsStore } from "@/store/submissions-store"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useComparisonStore } from "@/store/comparison-store"

const ITEMS_PER_PAGE = 5

export function SubmissionHistory() {
  const { submissions, isLoading } = useSubmissionsStore()
  const { setPropertiesForComparison } = useComparisonStore()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([])

  // Filter submissions by status
  const filteredSubmissions =
    statusFilter === "all" ? submissions : submissions.filter((submission) => submission.status === statusFilter)

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentSubmissions = filteredSubmissions.slice(startIndex, endIndex)

  // Reset to first page when filter changes
  const handleFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" /> Procesando
          </Badge>
        )
      case "complete":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Completo
          </Badge>
        )
      case "agent-followup":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <PhoneCall className="h-3 w-3 mr-1" /> Seguimiento por Agente
          </Badge>
        )
      case "agent-complete":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Verificado por Agente
          </Badge>
        )
    }
  }

  const handleCardClick = (id: string) => {
    router.push(`/property/${id}`)
  }

  const handleCheckboxChange = (id: string) => {
    setSelectedSubmissions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((submissionId) => submissionId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleCompareClick = () => {
    setPropertiesForComparison(selectedSubmissions)
    router.push("/comparison")
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-slate-500">
          <Clock className="h-5 w-5 animate-spin mx-auto mb-2" />
          Cargando propiedades...
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Tus Propiedades</h2>
        <div className="flex items-center gap-2 mb-4">
          {submissions.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <Select value={statusFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Filtrar</SelectItem>
                  <SelectItem value="processing">Procesando</SelectItem>
                  <SelectItem value="complete">Completo</SelectItem>
                  <SelectItem value="agent-followup">Seguimiento por Agente</SelectItem>
                  <SelectItem value="agent-complete">Verificado por Agente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {selectedSubmissions.length >= 2 && (
            <Button onClick={handleCompareClick} className="ml-2 bg-blue-600 hover:bg-blue-700">
              <BarChart2 className="h-4 w-4 mr-2" />
              Comparar ({selectedSubmissions.length})
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-slate-500">
              {submissions.length === 0
                ? "Aún no hay envíos. Envía una URL arriba para comenzar."
                : "No hay propiedades que coincidan con el filtro seleccionado."}
            </CardContent>
          </Card>
        ) : (
          currentSubmissions.map((submission) => (
            <div key={submission.id} className="cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <Checkbox
                            id={`select-${submission.id}`}
                            checked={selectedSubmissions.includes(submission.id)}
                            onCheckedChange={() => handleCheckboxChange(submission.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1"
                          />
                        </div>
                        <div onClick={() => handleCardClick(submission.id)}>
                          <h3 className="font-medium text-slate-900">{submission.title}</h3>
                          <div className="flex items-center text-sm text-slate-500 mt-1">
                            <span className="truncate max-w-[200px] sm:max-w-xs">{submission.url}</span>
                            <a
                              href={submission.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center h-6 w-6 p-0 ml-1 rounded-full hover:bg-slate-100"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span className="sr-only">Abrir URL</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{submission.date}</span>
                        {getStatusBadge(submission.status)}
                      </div>
                    </div>

                    <div onClick={() => handleCardClick(submission.id)}>
                      {submission.status === "agent-followup" && (
                        <div className="mt-3 p-3 bg-amber-50 text-amber-700 text-sm rounded-md">
                          <p>
                            Nuestro agente está contactando al agente inmobiliario para obtener información faltante
                            sobre esta propiedad. Te notificaremos cuando esté completo.
                          </p>
                        </div>
                      )}

                      {(submission.status === "complete" || submission.status === "agent-complete") &&
                        submission.insights && (
                          <div className="mt-3 p-3 bg-slate-50 text-slate-700 text-sm rounded-md">
                            <p>{submission.insights}</p>
                          </div>
                        )}

                      {submission.status === "processing" && (
                        <div className="mt-3 p-3 bg-blue-50 text-blue-700 text-sm rounded-md">
                          <p>Estamos analizando esta propiedad. Esto normalmente toma 1-2 minutos.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>

      {filteredSubmissions.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredSubmissions.length)} de {filteredSubmissions.length}{" "}
            propiedades
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>
            <div className="flex items-center text-sm">
              <span>
                Página {currentPage} de {totalPages || 1}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
