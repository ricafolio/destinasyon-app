import Image from "next/image"
import { useState, useEffect } from "react"
import { Spot } from "../types"
import { DestinationProps } from "../types/props"
import SaveIcon from "./icons/SaveIcon"

export default function Destination({ name, description, spots, index, onSaveBtnClick }: DestinationProps) {
  const [updatedSpots, setUpdatedSpots] = useState<Spot[]>([])

  useEffect(() => {
    // run once on mount
    const fetchImageUrl = async (spot: Spot) => {
      try {
        const response = await fetch(`/api/find-image?query=${spot.name}, ${name}`)
        const { data } = await response.json()
        const newSpot = {
          name: spot.name,
          description: spot.description,
          imageUrl: data.imageUrl,
          mapsUrl: data.mapsUrl,
          uid: spot.uid,
          vicinity: data.vicinity,
          rating: data.rating,
          totalRatings: data.totalRatings
        }
        // render more info from API
        setUpdatedSpots((prevSpot) => [...prevSpot, newSpot])
      } catch (e) {
        console.error(e)
      }
    }

    // fetch image url for each spot with a null image
    spots.map((spot: Spot) => {
      if (!spot.imageUrl) {
        fetchImageUrl(spot)
      }
    })
  }, [])

  return (
    <div className="bg-white text-black selection:bg-black/10 rounded-lg px-4 pt-4 pb-6 mb-6 text-left">
      <h1 className="text-3xl font-bold">{name}</h1>

      <p className="text-gray-800 text-lg mt-1 mb-3">{description}</p>

      <div className="flex flex-row flex-wrap">
        {updatedSpots.length > 0 &&
          updatedSpots.map((spot: Spot, i: number) => {
            return (
              <div className="w-full md:w-2/6 pr-2 flex flex-col" key={`spot-${index}-${i}`}>
                <div>
                  <div className="w-full h-48 relative mb-2 bg-gray-100 rounded-md">
                    <Image 
                      src={spot.imageUrl || "./empty.svg"} 
                      alt={spot.name} 
                      fill={true} 
                      style={{ objectFit: "cover" }} 
                      className="w-full rounded-md transition duration-300 ease-in-out hover:brightness-90" 
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{spot.name}</h2>
                  <p className="text-gray-700 mt-1 mb-2 md:mb-0 sm:pr-4">{spot.description}</p>
                </div>

                <div className="my-2">
                  <button
                    className="bg-black hover:bg-zinc-800 text-white px-5 py-3 rounded transition-colors inline-flex items-center justify-center"
                    onClick={() =>
                      onSaveBtnClick({
                        name: spot.name,
                        description: spot.description,
                        imageUrl: spot.imageUrl || "./empty.svg",
                        mapsUrl: spot.mapsUrl,
                        uid: spot.uid,
                        vicinity: name,
                        rating: spot.rating,
                        totalRatings: spot.totalRatings,
                      })
                    }
                  >
                    <span className="mr-2">
                      <SaveIcon />
                    </span>
                    <span>Save location</span>
                  </button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
