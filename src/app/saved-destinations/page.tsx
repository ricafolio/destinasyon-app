"use client"

import { useState, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast"
import { erode } from "../fonts"

import { SpotSaved } from "../types"
import { DeleteSpotArgs } from "../types/props"

import DestinationSaved from "../components/DestinationSaved"

export default function MySavedDestinations() {
  const [spots, setSpots] = useState<SpotSaved[]>(() => {
    if (typeof window !== "undefined") {
      const stored_places = localStorage.getItem("spots")
      return (stored_places !== null) ? JSON.parse(stored_places) : []
    } else {
      return[]
    }
  })

  useEffect(() => {
    localStorage.setItem("spots", JSON.stringify(spots))
  }, [spots])

  function handleDeleteBtnClick({ id, name }: DeleteSpotArgs) {
    setSpots(spots.filter(spot => spot.id !== id))
    toast.success(`${name} deleted.`)
  }

  return (
    <main className="flex flex-col items-center text-center text-white p-4 md:p-12 lg:p-24 pt-12 sm:pt-24">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 28,
        }}
      />

      {spots.length > 0 && <h1 className={`font-bold text-2xl sm:text-3xl mb-8 text-left ${erode.className}`}>Your saved destinations</h1>}

      <div className="flex flex-row flex-wrap w-full gap-2">
        {spots.length > 0 ? spots.map((spot, i) => {
          return (
            <DestinationSaved
              id={spot.id}
              name={spot.name}
              description={spot.description}
              imageUrl={spot.imageUrl}
              destination={spot.destination}
              onDeleteBtnClick={handleDeleteBtnClick}
              key={`spot-saved-${spot.id}-${i}`}
            />
          )
        }) : <div className="w-full py-24 text-center">
          <div className="text-4xl mb-2">😴</div>
          <h3 className="text-gray-400">No saved destinations yet.</h3>
        </div>}
      </div>
    </main>
  )
}
