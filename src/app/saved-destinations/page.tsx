"use client"

import { useState, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast"
import { erode } from "../fonts"

import { Spot } from "../types"
import { DeleteSpotArgs } from "../types/props"
import { useSpotStore } from "../store"

import DestinationSaved from "../components/DestinationSaved"

export default function MySavedDestinations() {
  const spots = useSpotStore(state => state.spots)
  const deleteSpotByID = useSpotStore(state => state.deleteSpotByID)
  const [mounted, setMounted] = useState<Boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleDeleteBtnClick({ id, name }: DeleteSpotArgs) {
    deleteSpotByID(id)
    toast.success(`${name} deleted.`)
  }

  if (!mounted) { 
    return null 
  }

  return (
    <main className="flex flex-col items-center text-center text-white p-4 md:p-12 lg:p-24 pt-12 sm:pt-24">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 28
        }}
      />

      {spots.length > 0 && <h1 className={`font-bold text-2xl sm:text-3xl mb-8 text-left ${erode.className}`}>Your saved destinations</h1>}

      <div className="flex flex-row flex-wrap w-full gap-2">
        {spots.length > 0 ? spots.map((spot: Spot, i: number) => {
          return (
            <DestinationSaved
              id={spot.id}
              name={spot.name}
              description={spot.description}
              imageUrl={spot.imageUrl}
              mapsUrl={spot.mapsUrl}
              vicinity={spot.vicinity}
              rating={spot.rating}
              totalRatings={spot.totalRatings}
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
