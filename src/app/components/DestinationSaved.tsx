import { DestinationSavedProps } from "../types"
import Image from "next/image"

export default function DestinationSaved({ id, name, description, image, at, onDeleteBtnClick }: DestinationSavedProps) {
  return (
    <div className="w-[calc(50%_-_8px)] lg:w-[calc(25%_-_8px)] flex flex-col items-start rounded-md bg-white text-black relative group" key={`saved-spot-${id}`}>
      <div className="text-left">
        <Image src={image} alt={name} width="60" height="60" className="w-full rounded-md transition duration-300 ease-in-out hover:brightness-90 rounded-b-none" />
        <div className="text-left pt-2 pb-4 px-3">
          <small className="font-bold text-orange-600">{at}</small>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-700 mt-1 mb-2 md:mb-0 sm:pr-2">{description}</p>
        </div>
      </div>

      <div className="group-hover:block hidden absolute top-2 right-2">
        <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition-colors inline-flex items-center justify-center" onClick={() => onDeleteBtnClick(id, name)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fillRule="evenodd" d="M5.5 1a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM3 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H11v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4h-.5a.5.5 0 0 1-.5-.5ZM5 4h5v8H5V4Z" clipRule="evenodd"></path></svg>
        </button>
      </div>
    </div>
  )
}
