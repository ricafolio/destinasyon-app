import { NextResponse } from 'next/server'

if (!process.env.GOOGLE_PLACES_API_KEY) {
  throw new Error("Missing Maps API key!")
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const place_name = searchParams.get('query')

    // Fetch place info and get image ref id
    const search_place_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_PLACES_API_KEY}&query=${place_name}`
    const search_place_res = await fetch(search_place_url, { 
      method: 'GET'
    })
    const search_results = await search_place_res.json()
    
    if (search_results.status !== "OK") {
      throw new Error("API error")
    }

    // fetch direct image url from google api
    let photo_id = null
    if (search_results.results[0]["photos"]) {
      photo_id = search_results.results[0].photos[0].photo_reference
    }
    const photo_url = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.GOOGLE_PLACES_API_KEY}&photo_reference=${photo_id}&maxwidth=500&maxheight=500`

    const photo_url_redirect = await fetch(photo_url, { 
      method: "GET",
      redirect: "manual" // important to get location value in header!
    }).then((res) => {
      return res.headers.get("location")
    })

    return NextResponse.json({
      status: "ok",
      url: photo_url_redirect
    })
  } catch (e) {
    return NextResponse.json({
      status: "error",
      message: "Unknown error occurred",
      result: null
    }, { 
      status: 400 
    })
  }
}