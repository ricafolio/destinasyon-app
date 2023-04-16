import Link from "next/link"
import HelpIcon from "./icons/HelpIcon"
import { NavLinkProps } from "../types/props"

export default function NavLink({ id, name, link }: NavLinkProps) {
  return (
    <Link href={link} className="w-full sm:w-auto py-2 px-2 sm:px-5 inline-flex justify-center text-center items-center transition-colors duration-200 bg-zinc-800 hover:bg-zinc-800/80 rounded text-zinc-300">
      {id === "help" && (
        <span className="mr-2">
          <HelpIcon/>
        </span>
      )}
      <span className="text-sm sm:text-base">{name}</span>
    </Link>
  )
}