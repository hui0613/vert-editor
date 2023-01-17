<template>
  <button class="vert-button-container">vert-editor button</button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'vert-button',
})
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>
