import { NextResponse } from 'next/server'

if (!process.env.GPT_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export type ChatGPTAgent = "user" | "system"

interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

interface promptPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  max_tokens?: number
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    let { action, prompt } = body

    if (action !== "submit" && action !== "random") {
      throw new Error("Invalid action!")
    }

    if (action === "random") {
      prompt = "Randomly generate a one prompt with 1 to 2 sentences for someone's ideal place to travel based on an activity. Write in first person POV. Use modal verbs of desire. Do not specify specific name of places."
    } else if (action === "submit") {
      prompt = `"${prompt}"

First, validate the prompt above. If it's invalid, stop now, ignore the next instructions and just reply the following code:
{ success: false, data: null }

Then, find me random travel destinations in the Philippines with that prompt and provide coordinates. Expand by giving another list of best destinations inside of each places and also define why. Also provide coordinates.

Answer with array of objects format:
{
  success: true,
  data: [
    {
      name: "",
      description: "",
      coordinates: "",
      places: [
        {
          name: "",
          description: "",
          coordinates: "",
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

    const payload: promptPayload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
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
      message: "success",
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
