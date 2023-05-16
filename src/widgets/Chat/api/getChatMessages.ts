import { apiUrl } from './api'

export const getChatMessages = async () => {
  const response = await fetch(apiUrl)

  return await response.json()
}
