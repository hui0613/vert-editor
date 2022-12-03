<template>
  <div class="dew-editor-menu-container">
    <div class="dew-editor-tools">
      <div class="dew-editor-builtin-menu">
        <DewPreviewMenu @changePreviewStatus="changePreviewStatus"></DewPreviewMenu>
      </div>
      <div class="dew-editor-custom-menu-container">
        <template v-for="(item, index) in menuList" :key="index">
          <div class="dww-editor-menu-item">
            <component :is="item" @insertContent="insertContent"></component>
          </div>
        </template>
      </div>
    </div>
    <span class="split-line"></span>
    <div class="dew-editor-theme-menu">
      <CodeTheme></CodeTheme>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import DewPreviewMenu from '../menu/PreviceMenu.vue'
import { CodeTheme } from '@dew-editor/menu'

const props = defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['insertContent'])

const openPreview = ref(true)

function insertContent(text: string) {
  emit('insertContent', text)
}

function changePreviewStatus() {
  openPreview.value = !openPreview.value
}
</script>
