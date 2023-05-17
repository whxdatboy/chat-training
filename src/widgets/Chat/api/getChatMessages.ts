import { apiUrl } from './api'

interface TMessages {
  result?: string[]
}

const needOffset = (number: number): string => {
  return number !== 0 ? `?offset=${number}` : ''
}
export const getChatMessages = async (
  offset = 0
): Promise<TMessages | unknown> => {
  try {
    const response = await fetch(`${apiUrl}${needOffset(offset)}`)

    return await response.json()
  } catch (error) {
    return {
      error: true,
      errorText: 'Oops! Try again!'
    }
  }
}
