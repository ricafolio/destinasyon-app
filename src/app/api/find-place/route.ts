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
    // expected url: /api/find-place?query=place+name
    const { searchParams } = new URL(request.url)
    const placeName: string | null = searchParams.get("query")

    if (!placeName) {
      throw new Error("Query params not found!")
    }

    const placeInfo = await fetchPlaceBasicInfo(placeName || "")

    if (placeInfo.length === 0) {
      throw new Error("Place not found") 
    }

    const placeID = placeInfo[0].reference
    const placeRating = placeInfo[0].rating
    const placeRatingsTotal = placeInfo[0].user_ratings_total

    let placePhoto: string | null = null
    let placeUrl: string | null = null
    let placeVicinity: string | null = null

    // get photo using reference id
    if (placeInfo[0].photos) {
      const photoId = placeInfo[0].photos[0].photo_reference
      placePhoto = await fetchPlacePhotoUrl(photoId)
    } else {
      throw new Error("Place image not found") 
    }

    // place more details
    if (placeID) {
      let placeDetails = await fetchPlaceDetails(placeID)

      if (!placeDetails.url || !placeDetails.vicinity) {
        throw new Error("Place details not found")
      }

      placeUrl = placeDetails.url
      placeVicinity = placeDetails.vicinity
    }

    return NextResponse.json({
      status: "ok",
      message: "Place found",
      data: {
        imageUrl: placePhoto,
        mapsUrl: placeUrl,
        uid: placeID,
        vicinity: placeVicinity,
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
      message: message,
      data: null
    }, { status: 400 })
  }
}
