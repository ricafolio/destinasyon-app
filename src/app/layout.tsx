import './globals.css'
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
});

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
      <body>{children}</body>
    </html>
  )
}
