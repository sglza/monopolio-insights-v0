import { getAllProperties, type SavedProperty } from "@/lib/data"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// Interface for the store's state
interface PropertiesState {
  properties: SavedProperty[]
  addProperty: (property: SavedProperty) => void
  // We can add isLoading, isInitialized later if needed for fetching initial properties
}

export const usePropertiesStore = create<PropertiesState>()(
  persist(
    (set) => ({
      properties: getAllProperties(),
      addProperty: (property: SavedProperty) => {
        set((state) => ({
          properties: [property, ...state.properties],
        }))
      },
    }),
    {
      name: "properties-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist the properties array
      partialize: (state) => ({
        properties: state.properties,
      }),
    },
  ),
)
