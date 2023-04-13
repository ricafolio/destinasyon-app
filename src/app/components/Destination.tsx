import { Spot, DestinationProps } from "../types"

export default function Destination({ name, description, coordinates, places, index }: DestinationProps) {
  return (
    <div className="border-b border-gray-800 py-6 text-left">
      <h1 className="text-2xl font-medium">
        {name} ({coordinates})
      </h1>

      <p>{description}</p>

      {places.map((spot: Spot, i: number) => {
        return (
          <div key={`spot-${index}-${i}`}>
            <h2>
              {spot.name} ({spot.coordinates})
            </h2>
            <p>{spot.description}</p>
          </div>
        )
      })}
    </div>
  );
}
