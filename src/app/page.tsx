import Input from "./components/Input"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-center p-4 sm:p-24 pt-12 sm:pt-36 m-3 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
      <h1 className="font-bold text-5xl">Tell us about your next trip 🏝️</h1>
      <div className="w-full py-8">
        <Input />
      </div>
      <p className="block w-full p-4 text-lg text-gray-300 bg-transparent rounded border-2 border-dashed border-gray-600">
        <b>Tip:</b> The more specific you are about your preferences, the more tailored our recommendations will be to your interests and travel style. ✨
      </p>
    </main>
  )
}
