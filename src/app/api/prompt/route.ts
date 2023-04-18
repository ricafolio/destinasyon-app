import { NextResponse } from "next/server"
import { ChatGPTAgent, FormBodyContent, PromptPayload } from "../../types"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

if (!OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export async function POST(req: Request) {
  try {
    const { action, prompt }: FormBodyContent = await req.json()

    if (action !== "submit" && action !== "random") {
      throw new Error("Invalid action!")
    }

    let temperature = 0
    let role: ChatGPTAgent = "system"
    let chatPrompt: string = prompt || ""

    if (action === "random") {
      temperature = 0.6
      chatPrompt = `You are thinking about your next dream trip.

      Pick a super random, unusual outdoor activity. Pick a random location between Luzon, Visayas or Mindanao.

      Write in first person POV. Maximum of 2 sentences. Use modal verbs of desire.`
    } 

    if (action === "submit") {
      if (!prompt) {
        throw new Error("No prompt in the request")
      }

      temperature = 0.3
      role = "user"
      chatPrompt = `You are an app that will find travel destinations in the Philippines based on this user input: "${prompt}"

      1. To ensure that the app can provide the best travel destinations for the user, validate the input above with following conditions:
      - The input should be related to travel, a desire to go somewhere or desire to experience something.
      - The input should be enough to allow the app to make recommendations.

      If the conditions are unmet, stop completely. Just reply the following code:
      { success: false, data: null }

      2. Find me three random travel destinations in the Philippines with that input. If there"s specific place mentioned in input, just search within that place.

      3. Expand by giving another list of best spots on each destinations. Give me three spots. Convince me why it"s perfect based on my input.

      Strictly only answer with the following array of objects format:
      \`\`\`
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
                imageUrl: null,
                id: null,
                vicinity: null,
                mapsUrl: null,
                rating: null,
                totalRatings: null,
              }
            ]
          }
        ]
      }
      \`\`\`
      Do not add value on null properties, specifically \`imageUrl\`, \`id\`, \`vicinity\`, \`mapsUrl\`, \`rating\` and \`totalRatings\`.
      `
    }

    const payload: PromptPayload = {
      model: "gpt-3.5-turbo",
      messages: [{ role, content: chatPrompt }],
      temperature,
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    return NextResponse.json({
      status: "ok",
      message: "successful",
      result: data
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    return NextResponse.json({
      status: "error",
      message,
      result: null
    }, { status: 400 })
  }
}
