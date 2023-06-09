import { useState } from "react"
import { Spot } from "../types"
import Image from "next/image"
import shortUUID from "short-uuid"

import SaveIcon from "./icons/SaveIcon"
import ExternalIcon from "./icons/ExternalIcon"
import CheckIcon from "./icons/CheckIcon"
import StarIcon from "./icons/StarIcon"

interface SpotExtended extends Spot {
  onSaveBtnClick: (...args: Spot[]) => void
}

export default function DestinationSpot({
  name,
  description,
  imageUrl,
  mapsUrl,
  vicinity,
  rating,
  totalRatings,
  onSaveBtnClick
}: SpotExtended) {
  const [saved, setSaved] = useState<boolean>(false)
  const [opacityHidden, setOpacityHidden] = useState<boolean>(false)

  function handleSaveBtnClick() {
    onSaveBtnClick({
      id: shortUUID.generate(),
      name,
      description,
      imageUrl,
      mapsUrl,
      vicinity,
      rating,
      totalRatings
    })
    // changes to green button
    setSaved(true)

    // fires 3s CSS animation 
    // also forces to display the element even on mouseout 
    // because the element only appears on hover, we can't see the fade out on mouseout
    setOpacityHidden(true)
  }

  return (
    <div>
      <div className="w-full h-48 relative mb-2 bg-gray-100 rounded-md">
        <Image src={imageUrl || "./empty.svg"} alt={name} fill={true} style={{ objectFit: "cover" }} className="w-full rounded-t-md" />
      </div>

      <section className="px-3 pt-1 pb-2 sm:pb-4">
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="block cursor-pointer transition-colors duration-200 hover:brightness-95">
          <StarIcon rating={rating} totalRatings={totalRatings} />
        </a>
        <h2 className="text-xl font-semibold text-black">
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-gray-600 inline-block cursor-pointer">
            <span>
              {name}
              <span className="inline-block align-middle text-gray-400 hover:scale-100 ml-1">
                <ExternalIcon />
              </span>
            </span>
          </a>
        </h2>

        <p className="text-sm text-gray-700 mt-1 mb-2 md:mb-0">{description}</p>
      </section>

      <div className={`save-btn ${opacityHidden ? "fade-out !block" : "hidden"} group-hover:block absolute top-0 right-2 my-2`}>
        <button
          className={`${!saved ? "bg-red-700 hover:bg-red-800" : "bg-green-600"} text-white px-4 py-2 rounded transition-colors duration-200 inline-flex items-center justify-center`}
          onClick={handleSaveBtnClick}
          disabled={saved}
        >
          <span className="mr-1">{!saved ? <SaveIcon /> : <CheckIcon />}</span>
          <span>{!saved ? "Save" : "Saved!"}</span>
        </button>
      </div>
    </div>
  )
}
