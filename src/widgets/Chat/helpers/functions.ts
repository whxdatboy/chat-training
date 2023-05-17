export const setChatWindowScrollPosition = (
  position: undefined | number
): void => {
  const chatBodyScroll = document.querySelector('.chat-window__scroll')

  if (chatBodyScroll) {
    setTimeout(() => {
      if (position !== undefined && position > 0) {
        chatBodyScroll.scrollTop = position
      } else {
        chatBodyScroll.scrollTop = getElementScrollHeight(chatBodyScroll)
      }
    }, 0)
  }
}

export const getElementScrollHeight = (element: Element): number => {
  return element.scrollHeight
}
