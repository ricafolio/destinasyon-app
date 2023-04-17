import Image from "next/image"
import { useState, useEffect } from "react"
import { Fade } from "react-awesome-reveal";
import { Spot } from "../types"
import { DestinationProps } from "../types/props"

import SaveIcon from "./icons/SaveIcon"
import ExternalIcon from "./icons/ExternalIcon"

export default function Destination({ name, description, spots, index, onSaveBtnClick }: DestinationProps) {
  const [updatedSpots, setUpdatedSpots] = useState<Spot[]>([])

  useEffect(() => {
    // run once on mount
    const fetchImageUrl = async (spot: Spot) => {
      try {
        const response = await fetch(`/api/find-place?query=${spot.name}, ${name}`)
        const { data } = await response.json()
        const newSpot = {
          name: spot.name,
          description: spot.description,
          imageUrl: data.imageUrl,
          mapsUrl: data.mapsUrl,
          uid: data.uid,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-left mb-24">
      <div className="px-2 mb-4">
        <h1 className="text-white text-3xl font-bold">{name}</h1>
        <p className="text-gray-200 text-lg mt-2">{description}</p>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-2">
        <Fade cascade={true} damping={0.5} className="group w-full sm:w-[calc(50%_-_8px)] lg:w-[calc(33.33%_-_8px)] flex flex-col bg-white rounded-lg relative">
          {updatedSpots.map((spot: Spot, i: number) => {
            return (
              <div key={`spot-${index}-${i}`}>
                <div className="w-full h-48 relative mb-2 bg-gray-100 rounded-md">
                  <Image 
                    src={spot.imageUrl || "./empty.svg"} 
                    alt={spot.name} 
                    fill={true} 
                    style={{ objectFit: "cover" }} 
                    className="w-full rounded-t-md transition duration-300 ease-in-out hover:brightness-90" 
                  />
                </div>

                <section className="px-3 pt-1 pb-4">
                  <h2 className="text-xl font-semibold text-black">
                    <a href={spot.mapsUrl} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-gray-600 inline-block cursor-pointer">
                      <span>
                        {spot.name} 
                        <span className="inline-block align-middle hover:scale-100 ml-1">
                          <ExternalIcon />
                        </span>
                      </span>
                    </a>
                  </h2>
                  <p className="text-sm text-gray-700 mt-2 mb-2 md:mb-0">
                    {spot.description}
                  </p>
                </section>

                <div className="group-hover:block hidden absolute top-0 right-2 my-2">
                  <button
                    className="bg-red-700 hover:bg-red-800 text-white px-5 py-3 rounded transition-colors inline-flex items-center justify-center"
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
                    <span>Save</span>
                  </button>
                </div>
              </div>
            )
          })}
        </Fade>
      </div>
    </div>
  )
}
