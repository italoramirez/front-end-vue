<script setup>
import { useAttrs, defineProps } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'button'
  }
})

const attrs = useAttrs()
</script>

<template>
  <button
      :type="type"
      v-bind="attrs"
  >
    <slot />
  </button>
</template>
