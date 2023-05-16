<template>
  <div class="chat flex flex-col gap-1.5">
    <ChatWindow
      ref="chatWindow"
      :messages="messages"
      @scroll-at-top="scrollAtTopHandler" />
    <ChatAction @submit-chat-message="submitChatMessage" />
  </div>
</template>

<script setup lang="ts">
import ChatWindow from '@/entities/ChatWindow/index'
import ChatAction from '@/entities/ChatAction/index'
import { getChatMessages } from './api/getChatMessages'
import { onMounted, onUpdated, ref } from 'vue'
import { MessagesItem } from 'entities/ChatWindow/types'
import {
  observeChatItems,
  setChatWindowScrollPosition
} from './helpers/functions'

const messages = ref<MessagesItem[]>([])
const tempMessages = ref()
const chatWindow = ref(null)
const offset = ref<number>(0)
const isLoading = ref<boolean>(false)

onMounted(async () => {
  if (!isLoading.value) {
    isLoading.value = true
    const responseMessages = await getChatMessages(offset.value)

    tempMessages.value = responseMessages.result
    for (let i = tempMessages.value.length; i--; i > 0) {
      messages.value.push({
        name: 'Дарья',
        text: tempMessages.value[i]
      })
    }

    offset.value += 20

    setTimeout(() => {
      isLoading.value = false
    }, 2000)

    setChatWindowScrollPosition()
  }
})

onUpdated(() => {
  console.log(chatWindow)

  observeChatItems()
})
function submitChatMessage(value: string) {
  messages.value.unshift({
    name: 'you',
    text: value
  })

  setChatWindowScrollPosition()
}

async function scrollAtTopHandler() {
  if (!isLoading.value) {
    isLoading.value = true

    const responseMessages = await getChatMessages(offset.value)

    tempMessages.value = responseMessages.result
    for (const item in tempMessages.value) {
      messages.value.unshift({
        name: 'Дарья',
        text: tempMessages.value[item]
      })
    }

    offset.value += 20

    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}
</script>

<style scoped lang="scss">
.chat {
  height: 100%;
}
</style>
