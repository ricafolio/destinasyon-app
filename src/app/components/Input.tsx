export default function Input() {
  return (
    <div className="flex flex-row w-full relative">
      <textarea 
        placeholder="somewhere cool, not so populated with people" 
        className="
          w-full text-2xl pl-4 pr-48 py-4 rounded-lg transition-all duration-300
          border-2 border-gray-200 hover:bg-gray-50 focus:bg-white
          focus:outline-6 focus:outline-black focus:outline-offset-4
        "
        rows={4}
      ></textarea>
      <div className="absolute right-4 top-4 flex flex-col">
        <button className="
          bg-black text-white text-xl rounded-lg px-8 py-2 
          transition-colors duration-150
          focus:ring-2 focus:ring-zinc-400/50 focus:outline-offset-4
          hover:bg-zinc-800 active:bg-zinc-700 focus:bg-zinc-800 
        ">
          Submit
        </button>
        <button className="
          bg-white text-black text-xl rounded-lg px-8 py-2 mt-1
          transition-colors duration-300
          border-2 border-gray-200 hover:border-black
          focus:ring-2 focus:ring-zinc-400/50 focus:outline-offset-4
        ">
          Random
        </button>
      </div>
    </div>
  )
}