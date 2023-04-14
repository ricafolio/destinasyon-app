import Link from 'next/link'

export default function NavLink({ id, name, link }: { id: string, name: string, link: string }) {
  return (
    <Link href={link} className="w-full sm:w-auto py-2 px-2 sm:px-5 inline-flex justify-center text-center items-center transition-colors duration-200 bg-zinc-800 hover:bg-zinc-800/80 rounded text-zinc-300">
      {id === "help" && <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="17" height="17" viewBox="0 0 24 24"><path fill="#D4D4D8" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm-1-7v2h2v-2h-2Zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.501 3.501 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2v-.645Z"/></svg>}
      <span className="text-sm sm:text-base">{name}</span>
    </Link>
  )
}