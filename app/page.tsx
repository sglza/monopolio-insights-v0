import { UrlSubmissionForm } from "@/components/url-submission-form"
import { HowItWorks } from "@/components/how-it-works"
import { SubmissionHistory } from "@/components/submission-history"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="text-blue-600">Monopolio</span>Insights
          </h1>
          <p className="mt-3 text-xl text-slate-600">
            Tu Meta-Buscador Inmobiliario con Descubrimiento y Enriquecimiento Impulsado por Usuarios
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <UrlSubmissionForm />
          </div>
          <div>
            <HowItWorks />
          </div>
        </div>

        <div className="mt-16">
          <SubmissionHistory />
        </div>
      </div>
    </main>
  )
}
