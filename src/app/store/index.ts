import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Spot } from "../types"

export const useSpotStore = create(
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
      deleteSpotByID: (uid: string) => {
        set({ 
          spots: get().spots.filter((spot: Spot) => spot.uid !== uid)
        })
      }
    }),
    {
      name: "spot", 
    }
  )
)
