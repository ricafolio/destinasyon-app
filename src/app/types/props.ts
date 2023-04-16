import { Destination, SpotSaved } from "./index"

export interface DestinationProps extends Destination {
  index: number
  onSaveBtnClick: (
    destinationName: string, 
    name: string, 
    description: string, 
    imageUrl: string
  ) => void
}

export interface SpotSavedProps extends SpotSaved {
  id: number
  onDeleteBtnClick: (
    id: number,
    name: string
  ) => void
}

export interface InputProps {
  prompt: string
  isFetching: boolean
  onRandomBtnClick: () => void
  onSubmitBtnClick: () => void
  onPromptValueChange: (
    newValue: string,
    isClear: boolean
  ) => void
}
