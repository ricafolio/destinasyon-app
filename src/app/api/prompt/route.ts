import { NextResponse } from 'next/server'
import { ChatGPTAgent, FormBodyContent, PromptPayload } from "../../types"

if (!process.env.GPT_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export async function POST(req: Request) {
  try {
    let { action, prompt }: FormBodyContent = await req.json()
    let s_temp: number = 0.70
    let s_role: ChatGPTAgent = "system"

    if (action !== "submit" && action !== "random") {
      throw new Error("Invalid action!")
    }

    if (action === "random") {
      s_temp = 1
      prompt = `You are thinking about your next dream trip.

      Pick one random unusual outdoor activity. Pick random location between Luzon, Visayas or Mindanao.

      Write in first person POV. Maximum of 2 sentences. Use modal verbs of desire. Use simple language.`

    } else if (action === "submit") {
      s_role = "user"
      prompt = `Input: "${prompt}"

1. To ensure that the app can provide the best travel destinations for the user, validate the input above with following conditions:
- The input should be related to travel or a desire to travel.
- The input should be specific enough to allow the app to make recommendations.

If the conditions are unmet, stop completely. Just reply the following code:
{ success: false, data: null }

2. Find me random travel destinations in the Philippines with that input. Give me three destinations. If there's specific city, place, location or region mentioned on input, do not search far from that place.

3. Expand by giving another list of best spots inside each destinations. Give me three spots. Convince me why it's perfect based on my input.

Only answer with array of objects format! Only answer in code, never answer anything else:
{
  success: true,
  data: [
    {
      name: "",
      description: "",
      spots: [
        {
          name: "",
          description: "",
          image: null
        }
      ]
    }
  ]
}
`
    }

    if (action === "submit" && !prompt) {
      throw new Error("No prompt in the request")
    }

    const payload: PromptPayload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: s_role, content: prompt }],
      temperature: s_temp,
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          process.env.GPT_API_KEY ?? ""
        }`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    return NextResponse.json({
      status: "ok",
      message: "succesfully",
      result: data
    })
  } catch (e) {
    let message = "Unknown error occurred."

    if (e instanceof Error) {
      message = e.message
    } else {
      message = String(e)
    }

    return NextResponse.json({
      status: "error",
      message: message,
      result: null
    }, { status: 400 })
  }
}
