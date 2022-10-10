<template>
  <div class="dew-editor-main-container">
    <div class="dew-editor-text-area" :style="{ height: props.editorTextAreaHeight + 'px' }">
      <div class="dew-editor-resize-bar"></div>
      <div class="dew-editor-resize-line"></div>
      <div class="dew-editor-textarea">
        <slot name="leftSection"></slot>
      </div>
    </div>
    <div class="dew-editor-preview-area" :style="{ height: props.editorTextAreaHeight + 'px' }">
      <slot name="rightSection"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  editorTextAreaHeight: {
    type: Number,
    default: 0,
  },
})
</script>
