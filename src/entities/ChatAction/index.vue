<template>
  <div class="chat-action rounded-lg border-2 border-gray-600 bg-gray-900">
    <form
      class="chat-action-block"
      @submit.prevent="submitHandler">
      <textarea v-model="chatMessage" />
      <button
        type="submit"
        class="chat-action-send">
        <SvgIcon
          name="enter"
          class="icon" />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chatMessage = ref('')

const emits = defineEmits<{
  (e: 'submitChatMessage', value: string): void
}>()

function submitHandler(): void {
  emits('submitChatMessage', chatMessage.value)

  chatMessage.value = ''
}
</script>

<style scoped lang="scss">
.chat-action {
  height: auto;

  &-block {
    position: relative;
    width: 100%;
    padding: 16px;

    textarea {
      display: block;
      width: 100%;
      min-height: 24px;
      height: auto;
      resize: none;
      background-color: transparent;
      color: #fff;
    }
  }

  &-send {
    position: absolute;
    top: 50%;
    right: 16px;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(46, 61, 96);
    transform: translateY(-50%);
    transition: background-color 0.25s ease-in-out;

    &:hover {
      background-color: lighten(rgb(88, 104, 139), 10%);
    }

    .icon {
      fill: #fff;
    }
  }
}
</style>
