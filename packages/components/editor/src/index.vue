<template>
  <div class="vert-editor-container">
    <vert-column-resize :min-width="0.5">
      <template #aside>
        <div class="vert-editor-edit-area">
          <textarea v-model="markdownValue" ></textarea>
        </div>
      </template>
      <template #main>
        <div class="vert-editor-previv" v-highlight v-html="htmlValue"></div>
      </template>
    </vert-column-resize>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VertColumnResize} from 'vert-ui'
import { render } from './compiler'
import {vHighlight} from './index'

defineOptions({
  name: 'vert-editor'
})

const markdownValue = ref('')

const htmlValue = computed(()=> render(markdownValue.value))

</script>