"use client"

import { erode } from "../fonts"
import { useState, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast"
import { StoredPlaces } from "../types"
import DestinationSaved from "../components/DestinationSaved"

export default function MySavedDestinations() {
  const [places, setPlaces] = useState<StoredPlaces[]>(() => {
    const stored_places = localStorage.getItem("places")
    return stored_places !== null ? JSON.parse(stored_places) : []
  })

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places))
  }, [places])

  function handleDeleteBtnClick(id: number, name: string) {
    setPlaces(places.filter(place => place.id !== id));
    toast.success(`${name} deleted.`)
  }

  return (
    <main className="flex flex-col items-center text-center text-white p-4 sm:p-12 md:p-24 pt-12 sm:pt-24">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 28,
        }}
      />

      <h1 className={`font-bold text-2xl sm:text-3xl mb-8 text-left ${erode.className}`}>Your saved destinations</h1>
      <div className="flex flex-row flex-wrap">
        {places?.map((place, i) => {
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
        })}
      </div>
    </main>
  )
}
