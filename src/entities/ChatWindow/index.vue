<template>
  <div class="chat-window rounded-lg border-2 border-gray-600 bg-gray-900">
    <div class="chat-window__body">
      <Transition name="error">
        <div
          v-if="props.error"
          class="chat-window__error">
          {{ props.error.errorText }}

          <SvgIcon
            v-if="messages.length === 0"
            class="icon icon-rotate"
            name="rotate"
            @click="updatePage" />
        </div>
      </Transition>
      <div
        ref="chatBody"
        class="chat-window__scroll"
        @scroll="handlerScroll">
        <template v-if="props.messages.length > 0">
          <div
            v-if="loadingMessages"
            class="loader loader--window">
            <div class="loader__spinner" />
          </div>
          <ChatUser
            v-for="(item, index) in props.messages"
            :key="index"
            :name="item.name"
            :text="item.text" />
        </template>
        <template v-else>
          <div class="loader">
            <div class="loader__spinner" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatUser from '@/entities/ChatUser/index'
import { IError, MessagesItem } from './types/index'

const props = defineProps<{
  messages: MessagesItem[]
  error: IError | undefined
  loadingMessages: boolean
}>()

const emits = defineEmits<{
  (e: 'scrollAtTop'): void
}>()

function handlerScroll(e: Event) {
  const target = e.target
  let scrollPosition

  // сюда ещё можно прикрутить всякие debounce для оптимизации

  if (target) {
    scrollPosition = target.closest('.chat-window__scroll').scrollTop

    if (scrollPosition < 100) {
      emits('scrollAtTop')
    }
  }
}

function updatePage() {
  window.location.reload()
}
</script>

<style scoped lang="scss">
.chat-window {
  padding: 16px;
  height: 80%;
  overflow: hidden;

  &__body {
    position: relative;
    height: 100%;
  }

  &__error {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #9d1010;
    color: #fff;

    .icon {
      margin-left: 15px;
      color: #fff;
      cursor: pointer;
    }
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

.loader {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &--window {
    width: 100%;
    height: 60px;
  }

  &__spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid rgb(88, 127, 139);
    border-right-color: transparent;
    animation: spinner 1s linear infinite;
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
