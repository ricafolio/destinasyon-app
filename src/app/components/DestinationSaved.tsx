import { SpotSavedProps } from "../types/props"
import Image from "next/image"
import DeleteIcon from "./icons/DeleteIcon"

export default function DestinationSaved({ id, name, description, imageUrl, destination, onDeleteBtnClick }: SpotSavedProps) {
  return (
    <div className="w-[calc(50%_-_8px)] lg:w-[calc(25%_-_8px)] flex flex-col items-start rounded-md bg-white text-black relative group" key={`saved-spot-${id}`}>
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
          <small className="font-bold text-orange-600 uppercase">{destination}</small>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-700 mt-1 mb-2 md:mb-0 sm:pr-2">{description}</p>
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
