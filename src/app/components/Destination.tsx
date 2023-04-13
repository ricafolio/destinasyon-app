interface Spot {
  name: string
  description: string
  coordinates: string
}

interface DestinationProps {
  name: string
  description: string
  coordinates: string
  places: Spot[]
  index: number
}

export default function Destination({name, description, coordinates, places, index}: DestinationProps) {
  return (
    <div className="border-b border-gray-800 py-6 text-left">
      <h1 className="text-2xl font-medium">
        {name} ({coordinates})
      </h1>

      <p>{description}</p>

      {places.map((spot: Spot, j: number) => {
        return (
          <div key={`spot-${index}-${j}`}>
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
