"use client"

import { erode } from "../fonts"
import { useState, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast"
import { StoredPlaces } from "../types"
import DestinationSaved from "../components/DestinationSaved"

export default function MySavedDestinations() {
  const [places, setPlaces] = useState<StoredPlaces[]>(() => {
    if (typeof window !== "undefined") {
      const stored_places = localStorage.getItem("places")
      return stored_places !== null ? JSON.parse(stored_places) : []
    } else {
      return[]
    }
  })

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places))
  }, [places])

  function handleDeleteBtnClick(id: number, name: string) {
    setPlaces(places.filter(place => place.id !== id));
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

      {places.length > 0 && <h1 className={`font-bold text-2xl sm:text-3xl mb-8 text-left ${erode.className}`}>Your saved destinations</h1>}

      <div className="flex flex-row flex-wrap w-full gap-2">
        {places.length > 0 ? places.map((place, i) => {
          return (
            <DestinationSaved
              id={place.id}
              name={place.name}
              description={place.description}
              image={place.image}
              at={place.at}
              onDeleteBtnClick={handleDeleteBtnClick}
              key={`destination-saved-${place.id}-${i}`}
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
