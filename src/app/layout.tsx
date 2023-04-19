import "./globals.css"
import Header from "./components/Header"
import { switzer } from "./fonts"

export const metadata = {
  title: "Destinasyon | Discover Travel Destinations in the Philippines",
  description: "Destinasyon is a travel destination finder app that uses AI technology to suggest the best travel destinations in the Philippines."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${switzer.className}`}>
      <body>
        <div className="flex min-h-screen flex-col justify-between rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 m-2 sm:m-3">
          <Header />

          {children}

          <footer className="w-full text-center p-4 my-2">
            <a href="https://ricafolio.me" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">
              made with 💛 by ricafolio
            </a>
          </footer>
        </div>
      </body>
    </html>
  )
}
