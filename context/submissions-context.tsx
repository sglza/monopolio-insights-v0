"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useSubmissionsStore, type Submission, type SubmissionStatus } from "@/store/submissions-store"

interface SubmissionsContextType {
  submissions: Submission[]
  addSubmission: (url: string) => void
  isLoading: boolean
}

const SubmissionsContext = createContext<SubmissionsContextType | undefined>(undefined)

export function SubmissionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { submissions, isLoading, addSubmission, initialize, isInitialized } = useSubmissionsStore()

  // Initialize the store on first render
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission, isLoading }}>
      {children}
    </SubmissionsContext.Provider>
  )
}

export function useSubmissions() {
  const context = useContext(SubmissionsContext)
  if (context === undefined) {
    throw new Error("useSubmissions must be used within a SubmissionsProvider")
  }
  return context
}

export type { Submission, SubmissionStatus }
