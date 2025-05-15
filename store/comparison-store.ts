import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface ComparisonState {
  selectedPropertyIds: string[]
  setPropertiesForComparison: (propertyIds: string[]) => void
  clearComparison: () => void
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set) => ({
      selectedPropertyIds: [],
      setPropertiesForComparison: (propertyIds: string[]) => {
        set({ selectedPropertyIds: propertyIds })
      },
      clearComparison: () => {
        set({ selectedPropertyIds: [] })
      },
    }),
    {
      name: "comparison-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
