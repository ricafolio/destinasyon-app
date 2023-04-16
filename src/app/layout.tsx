import "./globals.css"
import Link from "next/link";
import NavLink from "./components/NavLink"
import { switzer, erode } from "./fonts"

export const metadata = {
  title: "Destinasyon | Discover Travel Destinations in the Philippines",
  description: "Destinasyon is a travel destination finder app that uses AI technology to suggest the best travel destinations in the Philippines.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${switzer.className}`}>
      <body className="relative">
        <div className="flex min-h-screen flex-col justify-between rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 m-2 sm:m-3">
          <header className="flex flex-wrap p-4">
            <div className="w-2/6 sm:w-1/3 order-2 sm:order-1 pr-2 sm:pr-0">
              <NavLink id="help" name="Help" link="/help" />
            </div>

            <div className="w-full sm:w-1/3 order-1 sm:order-2 mb-2 sm:mb-0 flex items-center justify-center h-auto">
              <Link href="/" className={`text-2xl transition-all duration-300 font-bold select-none cursor-pointer ${erode.className} inline-block text-transparent  bg-clip-text bg-gradient-to-r from-yellow-200 via-red-300 via-amber-300 to-purple-500 hover:brightness-90`}>Destinasyon.app</Link>
            </div>

            <div className="w-4/6 sm:w-1/3 order-3 flex justify-end">
              <NavLink id="saved" name="Your saved destinations" link="/saved-destinations" />
            </div>
          </header>

          {children}

          <footer className="w-full text-center p-4 my-2">
            <a href="https://ricafolio.me" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">made with 💛 by ricafolio</a>
          </footer>
        </div>
      </body>
    </html>
  )
}
