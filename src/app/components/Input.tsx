"use client";

import { useState } from "react"

export default function Input() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="flex flex-row w-full relative">
      <textarea
        name="prompt"
        placeholder="somewhere cool, not so populated with people"
        rows={4}
        className="
          w-full text-2xl pl-4 pr-48 py-4 rounded-lg transition-colors duration-300
          border-2 border-gray-200 hover:bg-gray-50 focus:bg-white
          focus:outline-6 focus:outline-black focus:outline-offset-4
        "
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <div className="absolute right-4 top-4 flex flex-col w-[160px]">
        <button className="
          bg-black text-white text-xl rounded-lg px-8 py-2 
          transition-colors duration-150
          focus:ring-2 focus:ring-zinc-400/50 focus:outline-offset-4
          hover:bg-zinc-800 active:bg-zinc-700 focus:bg-zinc-800 
        ">
          Submit
        </button>
        {prompt === "" && <button className="
          bg-white text-black text-xl rounded-lg px-8 py-2 mt-1
          transition-colors duration-300
          border-2 border-gray-200 hover:border-black
          focus:ring-2 focus:ring-zinc-400/50 focus:outline-offset-4
        ">
          Random
        </button>}
      </div>
    </div>
  )
}