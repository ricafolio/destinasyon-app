import { erode } from "../fonts"

export default function MySavedDestinations() {
  return (
    <main className="flex flex-col items-center text-center text-white p-4 sm:p-12 md:p-24 pt-12 sm:pt-24">
      <h1 className={`font-bold text-2xl sm:text-3xl mb-8 text-left ${erode.className}`}>Your saved destinations</h1>
    </main>
  )
}
