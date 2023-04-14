import './globals.css'
import Link from 'next/link';
import localFont from 'next/font/local'
import NavLink from "./components/NavLink"

const switzer = localFont({
  src: [
    {
      path: './fonts/Switzer/Switzer-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/Switzer/Switzer-Medium.woff2',
      weight: '500',
    }
  ]
})

const erode = localFont({
  src: [
    {
      path: './fonts/Erode/Erode-Bold.woff2',
      weight: '800',
    }
  ]
})

export const metadata = {
  title: 'Destinasyon | Travel Recommendations in the Philippines',
  description: 'Get travel recommendations in the Philippines using AI',
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
          <header className="flex p-4">
            <div className="w-2/6 sm:w-1/3 pr-2 sm:pr-0">
              <NavLink id="help" name="Help" link="/help" />
            </div>

            <div className="hidden sm:inline-flex sm:w-1/3 items-center justify-center">
              <Link href="/" className={`text-2xl text-white font-bold select-none cursor-pointer ${erode.className}`}>Destinasyon AI</Link>
            </div>

            <div className="w-4/6 sm:w-1/3 flex justify-end">
              <NavLink id="saved" name="My saved destinations" link="/saved-destinations" />
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
