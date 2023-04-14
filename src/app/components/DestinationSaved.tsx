import { DestinationSavedProps } from "../types"
import Image from "next/image"

export default function DestinationSaved({ id, name, description, image, at, onDeleteBtnClick }: DestinationSavedProps) {
  return (
    <div className="w-full md:w-3/12 pr-2 flex flex-col" key={`saved-spot-${id}`}>
      <div>
        <Image src={image} alt={name} width="60" height="60" className="w-full rounded-md transition duration-300 ease-in-out hover:brightness-90 mb-2" />
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-300 mt-1 mb-2 md:mb-0 sm:pr-4">{description}</p>
      </div>

      <div className="my-2">
        <button className="bg-black hover:bg-zinc-800 text-white px-5 py-3 rounded transition-colors inline-flex items-center justify-center" onClick={() => onDeleteBtnClick(id, name)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="1em" height="1em" viewBox="0 0 15 15">
            <path fill="currentColor" fillRule="evenodd" d="M8 2.75a.5.5 0 0 0-1 0V7H2.75a.5.5 0 0 0 0 1H7v4.25a.5.5 0 0 0 1 0V8h4.25a.5.5 0 0 0 0-1H8V2.75Z" clipRule="evenodd"></path>
          </svg>
          Remove
        </button>
      </div>
    </div>
  )
}
