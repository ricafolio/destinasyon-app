"use client"
import { useState } from "react"
import { erode } from "../fonts"

import Link from "next/link"
import NavLink from "./NavLink"
import MenuOpen from "./icons/MenuOpen"
import MenuClose from "./icons/MenuClose"

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <header className="flex flex-wrap p-4 w-full relative">
      <div className={`${open ? 'absolute z-1 left-0 top-16' : 'hidden sm:block pr-2'} w-2/6 sm:w-fit md:w-1/3 order-2 md:order-1 pl-4 md:px-0 md:pr-0`}>
        <NavLink id="help" name="Help" link="/help" />
      </div>

      <div className="w-full sm:flex-1 md:w-1/3 order-1 md:order-2 mb-2 sm:mb-0 flex items-center justify-center sm:justify-start md:justify-center pl-1 sm:pl-2 md:pl-0 h-auto">
        <Link href="/" className={`w-1/2 sm:w-auto text-2xl transition-all duration-300 font-bold select-none cursor-pointer inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-red-300 via-amber-300 to-purple-500 hover:brightness-90 ${erode.className}`}>
          destinasyon.xyz
        </Link>

        <div className="w-1/2 sm:hidden flex justify-end">
          <button onClick={() => setOpen(!open)} className="transition-colors duration-200 bg-zinc-800 hover:bg-zinc-800/80 rounded px-1">
            <span className="block p-1">{open ? <MenuClose /> : <MenuOpen />}</span>
          </button>
        </div>
      </div>

      <div className={`${open ? 'absolute z-1 right-0 top-16' : 'hidden sm:flex'} w-4/6 sm:w-fit md:w-1/3 order-3 flex justify-end pl-2 pr-4 md:px-0`}>
        <NavLink id="saved" name="Your saved destinations" link="/saved-destinations" />
      </div>
    </header>
  )
}