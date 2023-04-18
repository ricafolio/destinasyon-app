import { SpotProps } from "../types/props"
import Image from "next/image"
import DeleteIcon from "./icons/DeleteIcon"
import ExternalIcon from "./icons/ExternalIcon"
import StarIcon from "./icons/StarIcon"

export default function DestinationSaved({ id, name, description, imageUrl, mapsUrl, vicinity, rating, totalRatings, onDeleteBtnClick }: SpotProps) {
  return (
    <div className="w-full sm:w-[calc(50%_-_8px)] lg:w-[calc(33.33%_-_8px)] flex flex-col items-start rounded-md bg-white text-black relative group" key={`saved-spot-${id}`}>
      <div className="text-left">
        <div className="w-full h-48 relative bg-gray-100 rounded-md">
          <Image
            src={imageUrl || "./empty.svg"}
            alt={name} 
            fill={true}
            style={{ objectFit: "cover" }}
            className="w-full rounded-md transition duration-300 ease-in-out hover:brightness-90 rounded-b-none" 
          />
        </div>
        <div className="text-left pt-2 pb-4 px-3">
          <div className="flex items-center">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline cursor-pointer transition-colors duration-200 hover:brightness-95">
              <StarIcon rating={rating} totalRatings={totalRatings} />
            </a>
            <span className="text-gray-300 px-[1px]">&middot;</span>
            <small className="text-xs font-bold text-orange-600 uppercase mt-[2px]">{vicinity}</small>
          </div>
          <h2 className="text-xl font-semibold text-black mt-[2px]">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-gray-600 inline-block cursor-pointer">
              <span>
                {name}
                <span className="inline-block align-middle text-gray-400 hover:scale-100 ml-1">
                  <ExternalIcon />
                </span>
              </span>
            </a>
          </h2>
          <p className="text-sm text-gray-700 mt-1">{description}</p>
        </div>
      </div>

      <div className="group-hover:block hidden absolute top-2 right-2">
        <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition-colors inline-flex items-center justify-center" onClick={() => onDeleteBtnClick({ id, name })}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  )
}
