<template>
  <div class="chat flex flex-col gap-1.5">
    <ChatWindow
      ref="chatWindow"
      :messages="messages"
      :error="error ? error : undefined"
      :loading-messages="isLoading"
      @scroll-at-top="scrollAtTopHandler" />
    <ChatAction @submit-chat-message="submitChatMessage" />
  </div>
</template>

<script setup lang="ts">
import ChatWindow from '@/entities/ChatWindow/index'
import ChatAction from '@/entities/ChatAction/index'
import { getChatMessages } from './api/getChatMessages'
import { nextTick, onMounted, ref } from 'vue'
import { IError, MessagesItem } from 'entities/ChatWindow/types'
import {
  getElementScrollHeight,
  setChatWindowScrollPosition
} from './helpers/functions'

const messages = ref<MessagesItem[]>([])
const tempMessages = ref()
const chatWindow = ref(null)
const offset = ref<number>(0)
const isLoading = ref<boolean>(false)
const error = ref<IError | undefined>()

onMounted(async () => {
  if (!isLoading.value) {
    isLoading.value = true

    const response = await getChatMessages(offset.value)

    if (response.error) {
      error.value = response

      setTimeout(() => {
        isLoading.value = false
      })

      return
    } else {
      tempMessages.value = response?.result

      for (let i = tempMessages.value.length; i--; i > 0) {
        messages.value.push({
          name: 'Дарья',
          text: tempMessages.value[i]
        })
      }

      await nextTick(() => {
        offset.value += 20
        setChatWindowScrollPosition(0)
        isLoading.value = false
      })
    }
  }
})
function submitChatMessage(value: string) {
  messages.value.push({
    name: 'you',
    text: value
  })

  setChatWindowScrollPosition(0)
}

// само собой эту функцию и функцию внутри onMounted необходимо оптимизировать и объединить в одну,
// вызывая её в необходимое время
async function scrollAtTopHandler() {
  if (!isLoading.value) {
    isLoading.value = true

    const chatBodyWindow = document.querySelector('.chat-window__scroll')
    const lastScrollHeight = chatBodyWindow
      ? getElementScrollHeight(chatBodyWindow)
      : 0
    const response: Promise<MessagesItem | IError> | unknown =
      await getChatMessages(offset.value)

    if (response?.error) {
      error.value = response

      setTimeout(() => {
        isLoading.value = false
      })

      return
    } else {
      tempMessages.value = response?.result
      error.value = undefined

      if (tempMessages.value.length === 0) {
        isLoading.value = false
        return
      }

      for (const item in tempMessages.value) {
        messages.value.unshift({
          name: 'Дарья',
          text: tempMessages.value[item]
        })
      }

      await nextTick(() => {
        const newScrollHeight = chatBodyWindow
          ? getElementScrollHeight(chatBodyWindow)
          : 0

        setChatWindowScrollPosition(newScrollHeight - lastScrollHeight)
      })

      await nextTick(() => {
        isLoading.value = false
        offset.value += 20
      })
    }
  }
}
</script>

<style scoped lang="scss">
.chat {
  height: 100%;
}
</style>
