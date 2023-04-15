import { NextResponse } from "next/server"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

if (!GOOGLE_PLACES_API_KEY) {
  throw new Error("Missing Maps API key!")
}

async function fetchPlaceInfo(placeName: string) {
  const searchPlaceUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_PLACES_API_KEY}&query=${placeName}`
  const searchPlaceRes = await fetch(searchPlaceUrl, { method: "GET" })
  const searchResults = await searchPlaceRes.json()
  
  if (searchResults.status !== "OK") {
    throw new Error("API error")
  }

  return searchResults.results
}

async function fetchPlacePhotoUrl(photoId: string) {
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_PLACES_API_KEY}&photo_reference=${photoId}&maxwidth=500&maxheight=500`
  // google redirects the image to new url, without api key in the url
  const photoUrlRes = await fetch(photoUrl, { method: "GET", redirect: "manual" })
  // the new url is available at response headers
  const photoUrlRedirect = photoUrlRes.headers.get("location")
  return photoUrlRedirect
}

export async function GET(request: Request) {
  try {
    // expected url: /api/image?query=place+name
    const { searchParams } = new URL(request.url)
    const placeName: string | null = searchParams.get("query")

    if (!placeName) {
      throw new Error("Query params not found!")
    }

    const placeInfo = await fetchPlaceInfo(placeName || "")

    if (placeInfo[0].photos) {
      // get place photo reference id
      const photoId = placeInfo[0].photos[0].photo_reference
      // fetch photo url using reference id we got
      let photoUrlRedirect: string | null = await fetchPlacePhotoUrl(photoId)

      return NextResponse.json({
        status: "ok",
        message: "Place image found",
        url: photoUrlRedirect,
      })
    } else {
       throw new Error("Place image not found") 
    }

  } catch (e) {
    let message: string = "Unknown error occurred."

    if (e instanceof Error) {
      message = e.message
    } else {
      message = String(e)
    }

    return NextResponse.json({
      status: "error",
      message: message,
      url: null,
    }, { status: 400 })
  }
}
