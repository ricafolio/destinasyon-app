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
      s_temp = 0.60
      prompt = `You are thinking about your next dream trip. 

      Pick one random unusual experiences like food experiences or outdoor activities. Use that as your reason to travel.

      Write in first person POV. Maximum of 2 sentences. Use modal verbs of desire. Do not specify specific name of places. `

    } else if (action === "submit") {
      s_role = "user"
      prompt = `"${prompt}"

First, validate the prompt above. It's fine if the prompt is not clear, but if it's doesn't make any sense, stop now, ignore the next instructions and just reply the following code:
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
}`
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
