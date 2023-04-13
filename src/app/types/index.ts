import Destination from "../components/Destination"

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

export interface Spot {
  name: string
  description: string
  coordinates: string
}

export interface Destination {
  name: string
  description: string
  coordinates: string
  places: Spot[]
}

// ------

export interface DestinationProps extends Destination {
  index: number
}

export interface InputProps {
  prompt: string
  fetching: boolean
  onRandomBtnClick: () => void
  onSubmitBtnClick: () => void
  onPromptValueChange: (arg1: string, arg2: boolean) => void
}
