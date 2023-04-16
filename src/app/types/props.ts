import { Destination, SpotSaved } from "./index"

// Args

export interface PromptValueChangeArgs {
  newValue: string
  isClear: boolean
}

export interface DeleteSpotArgs {
  id: number,
  name: string
}

export interface SaveSpotArgs {
  destination: string
  name: string
  description: string
  imageUrl: string
}

// Props

export interface DestinationProps extends Destination {
  index: number
  onSaveBtnClick: (...args: SaveSpotArgs[]) => void
}

export interface SpotSavedProps extends SpotSaved {
  id: number
  onDeleteBtnClick: (...args: DeleteSpotArgs[]) => void
}

export interface InputProps {
  prompt: string
  isFetching: boolean
  onRandomBtnClick: () => void
  onSubmitBtnClick: () => void
  onPromptValueChange: (...args: PromptValueChangeArgs[]) => void
}

export interface FAQProps {
  question: string
  answer: string
}