import { apiUrl } from './api'

interface TMessage {
  result?: string[]
}

const needOffset = (number: number): string => {
  return number !== 0 ? `?offset=${number}` : ''
}
export const getChatMessages = async (offset = 0): Promise<TMessage> => {
  const response = await fetch(`${apiUrl}${needOffset(offset)}`)

  return await response.json()
}
