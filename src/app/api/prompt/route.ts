import type { NextApiRequest } from "next"
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
  max_tokens: number
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    let { action, prompt } = body

    if (action !== "submit" && action !== "random") {
      throw new Error("Invalid action!")
    }

    if (action === "random") {
      prompt = "Randomly generate a 1 to 3 sentences short prompt for someone's ideal place to travel based on a randomly generated activity. Write in first person POV. Use modal verbs of desire. Do not specify specific name of places."
    }

    if (action === "submit" && !prompt) {
      throw new Error("No prompt in the request")
    }

    const payload: promptPayload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
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
