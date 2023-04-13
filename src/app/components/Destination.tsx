import { Spot, DestinationProps } from "../types"
import Image from "next/image"

export default function Destination({ name, description, coordinates, places, index }: DestinationProps) {
  return (
    <div className="bg-white text-black selection:bg-black/10 rounded-lg px-4 pt-4 pb-6 mb-6 text-left">
      <h1 className="text-3xl font-bold">
        {name}
      </h1>

      <p className="text-gray-800 text-lg mt-1 mb-3">
        {description}
      </p>

      <div className="flex flex-row flex-wrap">
        {places.map((spot: Spot, i: number) => {
          return (
            <div className="w-full md:w-2/6 pr-2" key={`spot-${index}-${i}`}>
              <Image
                src={`https://picsum.photos/seed/${index}_${i}/500/500`}
                alt={spot.name}
                width="60"
                height="60"
                className="w-full rounded-md transition duration-300 ease-in-out hover:brightness-90 mb-2"
              />
              <h2 className="text-xl font-semibold">
                {spot.name}
              </h2>
              <p className="text-gray-700 mt-1 mb-2 md:mb-0 sm:pr-4">
                {spot.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
}
