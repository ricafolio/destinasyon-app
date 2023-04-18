import { Destination, Spot } from "./index"

// Args
export interface PromptValueChangeArgs {
  newValue: string
  isClear: boolean
}

export interface DeleteSpotArgs {
  id: string,
  name: string
}

// Props
export interface DestinationProps extends Destination {
  index: number
  onSaveBtnClick: (...args: Spot[]) => void
}

export interface SpotProps extends Spot {
  onDeleteBtnClick: (...args: DeleteSpotArgs[]) => void
}

export interface FetchStatus {
  isLoading: boolean
  source: "random" | "submit" | null
}

export interface InputProps {
  prompt: string
  fetchStatus: FetchStatus
  onRandomBtnClick: () => void
  onSubmitBtnClick: () => void
  onPromptValueChange: (...args: PromptValueChangeArgs[]) => void
}

export interface FAQProps {
  question: string
  answer: string
}

export interface NavLinkProps {
  id: string
  name: string
  link: string
}