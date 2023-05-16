export const setChatWindowScrollPosition = (): void => {
  const chatBodyScroll = document.querySelector('.chat-window__scroll')

  if (chatBodyScroll) {
    setTimeout(() => {
      chatBodyScroll.scrollTop = chatBodyScroll.scrollHeight
    }, 0)
  }
}

export function observeChatItems() {
  const container = document.querySelector('.chat-window__scroll')
  const items = container?.querySelectorAll('.chat-user')
  const options = {
    root: container,
    thresholds: [1],
    rootMargin: '0px'
  }

  console.log(container)
  console.log(items)
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry)
        entry.target.classList.add('at-viewport')
      } else {
        entry.target.classList.remove('at-viewport')
      }
    })
  }

  const observer: IntersectionObserver = new IntersectionObserver(
    callback,
    options
  )

  items?.forEach(el => {
    observer.observe(el)
  })
}
