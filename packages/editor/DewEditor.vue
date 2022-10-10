<template>
  <div class="dew-editor-container" ref="editorMainContainer">
    <div class="dew-editor-menu-container">
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
    <div class="dew-editor-main-area">
      <DewEditorContainer :editorTextAreaHeight="editorTextAreaHeight">
        <template v-slot:leftSection>
          <textarea @scroll="textareaScroll" ref="dewEditorTextarea" v-model="markdown"></textarea>
        </template>
        <template v-slot:rightSection>
          <div ref="previewScroll" class="dew-editor-preview-area markdown-body" v-html="htmlContent"></div>
        </template>
      </DewEditorContainer>
    </div>

    <div ref="clipboardButton" class="clipboard-box" :data-clipboard-text="clipboardValue"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, computed } from 'vue'
import DewEditorContainer from './lib/DewEditorContainer.vue'
import DewPreviewMenu from './menu/PreviceMenu.vue'
import { isExistSelection, copyTextToClipboard, insertTextIntoEditor, debounce } from './utils/tool'
import MarkdownIt from 'markdown-it'

const markdownIt = new MarkdownIt({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  linkify: false, // 自动识别url
  typographer: true,
  quotes: '""\'\'',
})
const props = defineProps({
  menuList: {
    type: Array,
  },
})

const clipboardValue = ref('')
const openPreview = ref(true)
const editorTextAreaHeight = ref(0)
const markdown = ref('')

const dewEditorTextarea = ref()
const clipboardButton = ref()
const previewScroll = ref()
const editorMainContainer = ref()

onMounted(() => {
  setEditorTextAreaHeight()
  listenResize()
})

const htmlContent = computed(() => {
  return markdownIt.render(markdown.value)
})

function insertContent(data: string) {
  if (!isExistSelection(getTextEle() as object)) {
    //  不支持往 textarea 中插入文字，则进行复制
    copyTextToClipboard('.clipboard-box')
    clipboardValue.value = data
    ;(clipboardButton.value as any)!.click()
    return
  }
  // 插入到边际区域的光标位置
  insertTextIntoEditor(getTextEle() as object, data)
  markdown.value = (getTextEle() as any).value
}

function changePreviewStatus() {
  openPreview.value = !openPreview.value
}

function setEditorTextAreaHeight() {
  const editorContainer = editorMainContainer.value as any

  editorTextAreaHeight.value = editorContainer.clientHeight - 30
}

function listenResize() {
  window.addEventListener(
    'resize',
    debounce(() => {
      setEditorTextAreaHeight()
    }, 100)
  )
}

function getTextEle() {
  return dewEditorTextarea.value
}

function textareaScroll(event: any) {
  const target = event.target

  // 元素总高度
  const totalHeight = target.scrollHeight
  // 可视区域的高度
  const clientHeight = target.clientHeight

  // 有效高度
  const validHeight = totalHeight - clientHeight
  // 滚动条滚动的高度
  const scrollTop = target.scrollTop

  targetScrollTo(previewScroll.value, (scrollTop / validHeight) * 100)
}

function targetScrollTo(ele: any, percentage: number) {
  // 元素总高度
  const totalHeight = ele.scrollHeight
  // 可视区域的高度
  const clientHeight = ele.clientHeight

  // 有效高度
  const validHeight = totalHeight - clientHeight
  // 滚动条滚动的高度
  const scrollTop = (percentage / 100) * validHeight
  ele.scrollTo(0, scrollTop)
}
</script>
