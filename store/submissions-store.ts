import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { getAllProperties } from "@/lib/data"

export type SubmissionStatus = "processing" | "complete" | "agent-followup" | "agent-complete"

export interface Submission {
  id: string
  url: string
  title: string
  date: string
  status: SubmissionStatus
  insights?: string
}

interface SubmissionsState {
  submissions: Submission[]
  isLoading: boolean
  isInitialized: boolean
  addSubmission: (submission: Submission | string) => void
  initialize: () => void
}

export const useSubmissionsStore = create<SubmissionsState>()(
  persist(
    (set, get) => ({
      submissions: [],
      isLoading: true,
      isInitialized: false,

      addSubmission: (submission: Submission | string) => {
        if (typeof submission === "string") {
          // Handle legacy case where only URL is provided
          const url = submission
          const id = `new-${Date.now()}`
          const newSubmission: Submission = {
            id,
            url,
            title: "Nueva Propiedad",
            date: "Justo ahora",
            status: "processing",
          }

          set((state) => ({
            submissions: [newSubmission, ...state.submissions],
          }))
        } else {
          // Handle case where full submission object is provided
          set((state) => ({
            submissions: [submission, ...state.submissions],
          }))
        }
      },

      initialize: () => {
        // Only initialize with mock data if we haven't initialized before
        if (get().isInitialized) {
          set({ isLoading: false })
          return
        }

        const properties = getAllProperties()
        const initialSubmissions: Submission[] = properties.map((property) => ({
          id: property.listingId,
          url: property.listingUrl,
          title: property.listingTitle,
          date: property.listingDate,
          status: property.additionalData?.status || "processing",
          insights:
            property.additionalData?.status === "complete" || property.additionalData?.status === "agent-complete"
              ? `Precio: ${new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  maximumFractionDigits: 0,
                }).format(property.price)} • Riesgo: ${
                  property.additionalData?.insights?.find((i) => i.type === "risk")?.value || "N/A"
                } • ${property.additionalData?.comparables?.length || 0} propiedades comparables`
              : undefined,
        }))

        set({
          submissions: initialSubmissions,
          isLoading: false,
          isInitialized: true,
        })
      },
    }),
    {
      name: "submissions-storage", // name for localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only store submissions and initialization state
      partialize: (state) => ({
        submissions: state.submissions,
        isInitialized: state.isInitialized,
      }),
    },
  ),
)
