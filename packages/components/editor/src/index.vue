<template>
  <div class="vert-editor-container">
    <vert-column-resize>
      <template #aside>
        <div class="vert-editor-edit-area">
          <textarea></textarea>
        </div>
      </template>
      <template #main>
        <div class="vert-editor-previv"></div>
      </template>
    </vert-column-resize>
  </div>
</template>

<script lang="ts" setup>
import { VertColumnResize} from 'vert-ui'
defineOptions({
  name: 'vert-editor'
})
</script>