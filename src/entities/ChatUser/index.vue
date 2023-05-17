<template>
  <div
    class="chat-user"
    :class="whoUser">
    <ChatAvatar :user-name="props.name" />
    <ChatMessage :message-text="props.text" />
  </div>
</template>

<script setup lang="ts">
import ChatAvatar from './ui/ChatAvatar'
import ChatMessage from './ui/ChatMessage'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  text?: string
}>()

const whoUser = computed(() => {
  return props.name !== 'you' ? 'chat-user--friend' : 'chat-user--you'
})
</script>

<style scoped lang="scss">
.chat-user {
  display: flex;
  align-items: flex-end;
  padding: 8px 0;

  &--friend {
    justify-content: flex-start;

    .avatar {
      --bg-avatar: #cb4545;
    }
  }

  &--you {
    justify-content: flex-end;

    .avatar {
      order: 2;
      --bg-avatar: #6131c4;
    }

    .chat-message {
      order: 1;
      background-color: #6848d5;
    }
  }

  .chat-message {
    padding: 8px;
    margin: 0 15px;
    border-radius: 10px;
    background-color: rgb(88 104 139);
  }
}
</style>
