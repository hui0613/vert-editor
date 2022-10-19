<template>
  <div class="upload-file-container" @dragover.prevent="onDragover" @drop.prevent="fileDrop">
    <div class="upload-file-area" @click="handlerClick">
      <svg
        t="1660991865693"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2135"
        width="64"
        height="64"
      >
        <path
          d="M823.424 395.296l-287.52-289.248c-3.2-3.2-6.88-5.536-10.816-7.104C521.056 97.12 516.672 96 512 96c-11.264 0-20.704 6.176-26.4 14.976l-254.4 253.952c-12.512 12.48-12.544 32.736-0.032 45.248 6.24 6.272 14.432 9.376 22.656 9.376 8.16 0 16.352-3.104 22.624-9.344L480 206.976 480 768c0 17.696 14.336 32 32 32s32-14.304 32-32L544 204.96l234.048 235.456c6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312C835.84 428.096 835.904 407.84 823.424 395.296z"
          p-id="2136"
          fill="#1296db"
        ></path>
        <path
          d="M896 704c-17.696 0-32 14.304-32 32l0 128L160 864l0-128c0-17.696-14.336-32-32-32s-32 14.304-32 32l0 160c0 17.696 14.336 32 32 32l768 0c17.696 0 32-14.304 32-32l0-160C928 718.304 913.696 704 896 704z"
          p-id="2137"
          fill="#1296db"
        ></path>
      </svg>
      <p>点击上传文件或将文件拖入该区域</p>
      <input class="upload-file-input" ref="input" type="file" multiple @change="fileChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import type { UploadRequestOptions } from './upload'
import { uploadContentProps } from './UploadContent'

const props = defineProps(uploadContentProps)

const input = ref()

const fileDrop: any = (event: any) => {
  // uploadFile(event.dataTransfer.files)
}

const onDragover: any = (event: any) => {
  // console.log('aa')
}

const handlerClick: any = (event: any) => {
  input.value.click()
}

const fileChange: any = (e: any) => {
  const files = e.target.files
  doUpload(files)
}

const doUpload = (files: File[]) => {
  //
  const { action, httpRequest, method, name: filename, handlerError, handlerSuccess } = props

  for (const file of files) {
    const options: UploadRequestOptions = {
      file,
      method,
      action,
      filename,
      onError: handlerError,
      onSuccess: handlerSuccess,
    }
    const request = httpRequest(options)
    if (request instanceof Promise) {
      request.then(options.onSuccess, options.onError)
    }
  }
}
</script>
