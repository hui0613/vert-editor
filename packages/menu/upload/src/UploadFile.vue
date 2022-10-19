<template>
  <div class="dew-upload-container">
    <UploadContent v-bind="uploadContentProps"></UploadContent>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import UploadContent from './UploadContent.vue'
import { uploadProps } from './upload'
import { useHandler } from './useHandler'

const props = defineProps(uploadProps)

const { handlerError, handlerSuccess } = useHandler(props)

const uploadContentProps = {
  ...props,
  handlerError,
  handlerSuccess,
}
</script>
