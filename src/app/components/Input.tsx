"use client";

import { useState } from "react"

export default function Input() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="flex flex-col sm:flex-row w-full relative">
      <textarea
        name="prompt"
        placeholder="Somewhere with best island hopping experience"
        rows={4}
        className="
          w-full text-2xl pl-4 pr-4 sm:pr-48 py-3 rounded-lg
          transition-colors duration-150
          border-2 border-white text-black
          hover:bg-gray-50 focus:bg-white  selection:bg-black/10
          focus:border-6 focus:border-amber-500 focus:outline-none
        "
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      <div className="sm:absolute sm:right-4 sm:top-4 flex flex-col w-full sm:w-[160px]">
        <button className="
          rounded-lg px-8 py-2 mt-1 sm:mt-0 text-xl
          transition-colors duration-150
          focus:outline-6 focus:outline-amber-500
          bg-amber-400 text-black
          hover:bg-amber-500 active:bg-amber-400 focus:bg-amber-500
        ">
          Submit
        </button>
        {prompt === "" && <button className="
            flex items-center justify-center text-center
            bg-white text-black rounded-lg px-8 py-2 mt-1
            transition-colors duration-150
            border-2 border-gray-200 hover:border-gray-400
          active:bg-slate-200 focus:bg-slate-50
          "
        >
          <span className="rotate-45">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M0 0h24v24H0z"/><path fill="#000" d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005.195v12.666c0 1.96-1.537 3.56-3.472 3.662l-.195.005H5.667a3.667 3.667 0 0 1-3.662-3.472L2 18.333V5.667c0-1.96 1.537-3.56 3.472-3.662L5.667 2h12.666zM15.5 14a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3zm-7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3zm0-7a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3zm7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3z"/></g></svg>
          </span>
          <span className="text-xl ml-2">Random</span>
        </button>}
      </div>
    </div>
  )
}