export type ChatGPTAgent = "user" | "system"

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export interface PromptPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  max_tokens?: number
}

// ------

export type FormActionType = "submit" | "random"

export interface FormBodyContent {
  action: FormActionType
  prompt: string
}

export interface APIResponse {
  status: "error" | "ok"
  message?: string
  result: null
}

// ------

export interface Spot {
  id: string
  name: string
  description: string
  imageUrl: string
  mapsUrl: string
  vicinity: string
  rating: number
  totalRatings: number
}

export interface Destination {
  name: string
  description: string
  spots: Spot[]
}

// -------

export interface SpotState {
  spots: Spot[]
  addSpot: (newSpot: Spot) => void
  deleteSpotByID: (id: string) => void
}
