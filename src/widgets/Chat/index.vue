<template>
  <div class="chat flex flex-col gap-1.5">
    <ChatWindow
      ref="chatWindow"
      :messages="messages" />
    <ChatAction @submitChatMessage="submitChatMessage" />
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
const tempMessages = ref([])
const chatWindow = ref(null)

onMounted(async () => {
  const responseMessages = await getChatMessages()

  tempMessages.value = responseMessages.result
  for (let i = tempMessages.value.length; i--; i > 0) {
    messages.value.push({
      name: 'Дарья',
      text: tempMessages.value[i]
    })
  }

  setChatWindowScrollPosition()
})

onUpdated(() => {
  console.log(chatWindow)

  observeChatItems()
})
function submitChatMessage(value: string) {
  messages.value.push({
    name: 'you',
    text: value
  })

  setChatWindowScrollPosition()
}
</script>

<style scoped lang="scss">
.chat {
  height: 100%;
}
</style>
