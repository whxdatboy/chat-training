<template>
  <div class="chat-message">{{ props.messageText }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  messageText: string
}>()
</script>

<style scoped lang="scss">
.chat-message {
  max-width: 60%;
}
</style>
