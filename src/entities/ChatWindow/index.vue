<template>
  <div class="chat-window rounded-lg border-2 border-gray-600 bg-gray-900">
    <div class="chat-window__body">
      <div
        ref="chatBody"
        class="chat-window__scroll"
        @scroll="handlerScroll">
        <template v-if="props.messages.length > 0">
          <ChatUser
            v-for="(item, index) in props.messages"
            :key="index"
            :name="item.name"
            :text="item.text" />
        </template>
        <template v-else>
          <div class="loader">Loading...</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatUser from '@/entities/ChatUser/index'
import { MessagesItem } from './types/index'

const props = defineProps<{
  messages: MessagesItem[]
}>()

const emits = defineEmits<{
  (e: 'scrollAtTop'): void
}>()

function handlerScroll(e: Event) {
  const target = e.target
  let scrollPosition

  if (target) {
    scrollPosition = target.closest('.chat-window__scroll').scrollTop

    if (scrollPosition < 50) {
      emits('scrollAtTop')
    }
  }
}
</script>

<style scoped lang="scss">
.chat-window {
  padding: 16px;
  height: 80%;
  overflow: hidden;

  &__body {
    height: 100%;
  }

  &__scroll {
    max-height: 100%;
    padding-right: 15px;
    overflow: auto;
    $track: #09162a;
    $thumb: #040f3d;

    /* firefox */
    scrollbar-width: thin;
    scrollbar-color: $thumb $track;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-track {
      background-color: $track;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $thumb;
      border-radius: 3px;
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
      opacity: 1;
    }
  }
}
</style>
