<template>
  <div class="chat-app flex flex-col">
    <h1 class="chat__title font-bold text-5xl mb-6">Тут чатик</h1>
    <VChat />
  </div>
</template>

<script setup lang="ts">
import VChat from '@/widgets/Chat/index'
</script>

<style scoped lang="scss">
.chat-app {
  max-width: 1100px;
  width: 100%;
  height: 45rem;
}
</style>
