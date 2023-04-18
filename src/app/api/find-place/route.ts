import { NextResponse } from "next/server"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

if (!GOOGLE_PLACES_API_KEY) {
  throw new Error("Missing Maps API key!")
}

async function fetchPlaceBasicInfo(placeName: string) {
  const searchPlaceUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_PLACES_API_KEY}&query=${placeName}&region=PH`
  const searchPlaceRes = await fetch(searchPlaceUrl, { method: "GET" })
  const searchResults = await searchPlaceRes.json()
  
  if (searchResults.status !== "OK") {
    throw new Error("API error")
  }

  return searchResults.results
}

async function fetchPlaceDetails(placeID: string) {
  // not using this api anymore to save credits ;(
  const searchDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${GOOGLE_PLACES_API_KEY}`
  const searchDetailsRes = await fetch(searchDetailsUrl, { method: "GET" })
  const searchResults = await searchDetailsRes.json()
  
  if (searchResults.status !== "OK") {
    throw new Error("API error")
  }

  return searchResults.result
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
    const { searchParams } = new URL(request.url)
    const placeName: string | null = searchParams.get("query")

    // Check expected url: /api/find-place?query=place+name
    if (!placeName) {
      throw new Error("Query params not found!")
    }

    // [API REQUEST] initial search if place exists
    const placeInfo = await fetchPlaceBasicInfo(placeName || "")
    const placeUrl = `https://www.google.com/maps/search/${placeName}`

    if (placeInfo.length === 0) {
      // return a generic result for a place that can't be found on google maps
      return NextResponse.json({
        status: "ok",
        data: {
          imageUrl: "./empty.svg",
          mapsUrl: placeUrl,
          rating: 0,
          totalRatings: 0
        }
      })
    }

    // expand place details
    // const placeID: string = placeInfo[0].reference
    const placeRating: number = placeInfo[0].rating
    const placeRatingsTotal: number = placeInfo[0].user_ratings_total
    let placePhoto: string | null = "./empty.svg"

    // [API REQUEST] get photo using reference id
    if (placeInfo[0].photos) {
      const photoId = placeInfo[0].photos[0].photo_reference
      placePhoto = await fetchPlacePhotoUrl(photoId)
    }

    return NextResponse.json({
      status: "ok",
      data: {
        imageUrl: placePhoto,
        mapsUrl: placeUrl,
        rating: placeRating,
        totalRatings: placeRatingsTotal
      }
    })
  } catch (e) {
    let message: string = "Unknown error occurred."

    if (e instanceof Error) {
      message = e.message
    } else {
      message = String(e)
    }

    return NextResponse.json({
      status: "error",
      data: null
    }, { status: 400 })
  }
}
