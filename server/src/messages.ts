import {DisplayMessage} from "~shared/vc100"

export type Message = {
  id: string
  displayMessage: DisplayMessage
}

export const updateMessage = (messages: Message[], message: Message): Message[] => {
  const without = messages.filter( m => m.id !== message.id )
  return [...without, message]
}

export const displayMessages = (messages: Message[]) => messages.map( m => m.displayMessage)
