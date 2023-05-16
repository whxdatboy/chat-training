<template>
  <div class="avatar">{{ userName }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  userName: string
}>()

const userName = computed(() => {
  return props.userName.slice(0, 1)
})
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--color-white);
  font-size: 18px;
  text-transform: uppercase;
  background-color: var(--bg-avatar);
}
</style>
