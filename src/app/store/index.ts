import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Spot, SpotState } from "../types"

export const useSpotStore = create<SpotState, [["zustand/persist", SpotState]]>(
  persist(
    (set, get) => ({
      spots: [],
      addSpot: (newSpot: Spot) => {
        set({
          spots: [
            ...get().spots,
            newSpot
          ]
        })
      },
      deleteSpotByID: (id: number) => {
        set({ 
          spots: get().spots.filter((spot: Spot) => spot.id !== id)
        })
      }
    }),
    {
      name: "spot", 
    }
  )
)
