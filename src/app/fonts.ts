import localFont from "next/font/local"

export const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer/Switzer-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/Switzer/Switzer-Medium.woff2",
      weight: "500",
    }
  ]
})

export const erode = localFont({
  src: [
    {
      path: "./fonts/Erode/Erode-Bold.woff2",
      weight: "800",
    }
  ]
})
