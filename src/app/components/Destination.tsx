import { useState, useEffect } from "react"
import { Fade } from "react-awesome-reveal";
import { Spot } from "../types"
import { DestinationProps } from "../types/props"
import DestinationSpot from "./DestinationSpot"

export default function Destination({ name, description, spots, index, onSaveBtnClick }: DestinationProps) {
  const [updatedSpots, setUpdatedSpots] = useState<Spot[]>([])

  useEffect(() => {
    // run once on mount
    const fetchImageUrl = async (spot: Spot) => {
      try {
        const response = await fetch(`/api/find-place?query=${spot.name}, ${name}`)
        const { data } = await response.json()
        let newSpot = {
          id: "", // intended, filled later on click
          name: spot.name,
          description: spot.description,
          vicinity: name,
          imageUrl: "./empty.svg",
          mapsUrl: `https://www.google.com/maps/search/${spot.name}`,
          rating: 0,
          totalRatings: 0 
        }
        if (data) {
          newSpot = {
            id: "",
            name: spot.name,
            description: spot.description,
            vicinity: name,
            imageUrl: data.imageUrl,
            mapsUrl: data.mapsUrl,
            rating: data.rating,
            totalRatings: data.totalRatings
          }
        }
        // render more info from API
        setUpdatedSpots((prevSpot) => [...prevSpot, newSpot])
      } catch (e) {
        console.error(e)
      }
    }

   // fetch image url for each spot with a null image
   spots.map((spot: Spot) => {
      fetchImageUrl(spot)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-left mb-24">
      <div className="mb-4">
        <h1 className="text-white text-2xl sm:text-3xl font-bold">{name}</h1>
        <p className="text-gray-200 text-base sm:text-lg mt-2">{description}</p>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-2">
        <Fade triggerOnce={true} cascade={true} damping={0.5} className="group w-full sm:w-[calc(50%_-_8px)] lg:w-[calc(33.33%_-_8px)] flex flex-col bg-white rounded-lg relative">
          {updatedSpots.map((spot: Spot, i: number) => {
            return (
              <DestinationSpot
                key={`spot-${index}-${i}`}
                id={spot.id}
                name={spot.name}
                description={spot.description}
                imageUrl={spot.imageUrl}
                mapsUrl={spot.mapsUrl}
                vicinity={spot.vicinity}
                rating={spot.rating}
                totalRatings={spot.totalRatings}
                onSaveBtnClick={onSaveBtnClick}
              />
            )
          })}
        </Fade>
      </div>
    </div>
  )
}
