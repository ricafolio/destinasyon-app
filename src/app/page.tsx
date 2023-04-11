import Input from "./components/Input"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-center p-24 pt-36 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-400 via-slate-200 to-slate-50">
      <h1 className="font-bold text-5xl mb-4">Tell us about your next trip</h1>
      <div className="w-full py-8">
        <Input />
      </div>
      <p className="block w-full p-4 text-lg bg-white/50 rounded border-2 border-dashed border-gray-300">
        Tip: The more specific you are about your preferences and needs, the more tailored our recommendations will be to your interests and travel style. ✨
      </p>
    </main>
  )
}
