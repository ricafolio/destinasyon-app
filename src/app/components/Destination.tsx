import { useState, useEffect } from "react"
import { Spot, DestinationProps } from "../types"
import Image from "next/image"

export default function Destination({ name, description, spots, index, onSaveBtnClick }: DestinationProps) {
  const [updatedSpots, setUpdatedSpots] = useState<Spot[]>([])

  useEffect(() => {
    const fetchImageUrl = async (theSpot: Spot) => {
      try {
        const response = await fetch(`/api/find-image?query=${theSpot.name}, ${name}`)
        const data = await response.json()
        const newSpot = {
          name: theSpot.name,
          description: theSpot.description,
          image: data.url
        }
        setUpdatedSpots(prevSpot => [...prevSpot, newSpot])
      } catch (e) {
        console.error(e)
      }
    }

    // call the fetchImageUrl function for each location object with a null image
    spots.map((spot) => {
      if(!spot.image) {
        fetchImageUrl(spot)
      }
    })
  }, [])

  return (
    <div className="bg-white text-black selection:bg-black/10 rounded-lg px-4 pt-4 pb-6 mb-6 text-left">
      <h1 className="text-3xl font-bold">
        {name}
      </h1>

      <p className="text-gray-800 text-lg mt-1 mb-3">
        {description}
      </p>

      <div className="flex flex-row flex-wrap">
        {updatedSpots.length > 0 && updatedSpots.map((spot: Spot, i: number) => {
          return (
            <div className="w-full md:w-2/6 pr-2 flex flex-col" key={`spot-${index}-${i}`}>
              <div>
                <div className="w-full h-48 relative mb-2 bg-gray-100 rounded-md">
                  <Image
                    src={spot.image || "./empty.svg"}
                    alt={spot.name}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    className="w-full rounded-md transition duration-300 ease-in-out hover:brightness-90"
                  />
                </div>
                <h2 className="text-xl font-semibold">
                  {spot.name}
                </h2>
                <p className="text-gray-700 mt-1 mb-2 md:mb-0 sm:pr-4">
                  {spot.description}
                </p>
              </div>

              <div className="my-2">
                <button className="bg-black hover:bg-zinc-800 text-white px-5 py-3 rounded transition-colors inline-flex items-center justify-center" onClick={() => onSaveBtnClick(spot.name, name, spot.description, spot.image || "./empty.svg")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fillRule="evenodd" d="M8 2.75a.5.5 0 0 0-1 0V7H2.75a.5.5 0 0 0 0 1H7v4.25a.5.5 0 0 0 1 0V8h4.25a.5.5 0 0 0 0-1H8V2.75Z" clipRule="evenodd"></path></svg>
                  Save location
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
