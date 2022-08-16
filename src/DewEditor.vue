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
          <textarea @scroll="textareaScroll" v-model="markdown"></textarea>
        </template>
        <template v-slot:rightSection>
          <div @scroll="previewScroll" class="dew-editor-preview-area" v-html="htmlContent"></div>
        </template>
      </DewEditorContainer>
    </div>

    <div ref="clipboardButton" class="clipboard-box" :data-clipboard-text="clipboardValue"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DewPreviewMenu from './menu/PreviewMenu.vue'
import DewEditorContainer from './components/DewEditorContainer.vue'
import MarkdownIt from 'markdown-it'
import { copyTextToClipboard, insertTextIntoEditor, isExistSelection } from './libs/dewEditor'
import { debounce } from './utils/tools'
const markdownIt = new MarkdownIt({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  linkify: false, // 自动识别url
  typographer: true,
  quotes: '“”‘’',
})

export default defineComponent({
  name: 'DewEditor',
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      textAreaHeight: 0,
      textAreaWidth: 0,
      clipboardValue: '',
      openPreview: true,
      editorTextAreaHeight: 0,
      markdown:
        'a\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\n',
    }
  },
  components: {
    DewPreviewMenu,
    DewEditorContainer,
  },
  mounted() {
    this.setEditorTextAreaHeight()
    this.listenResize()
  },

  methods: {
    insertContent(data: string) {
      if (!isExistSelection(this.getTextEle() as object)) {
        //  不支持往 textarea 中插入文字，则进行复制
        copyTextToClipboard('.clipboard-box')
        this.clipboardValue = data
        ;(this.$refs.clipboardButton as any)!.click()
        return
      }
      // 插入到边际区域的光标位置
      insertTextIntoEditor(this.getTextEle() as object, data)
    },
    getTextEle() {
      return this.$refs.textAreaBox
    },
    changePreviewStatus(data: boolean) {
      this.openPreview = data
    },
    setEditorTextAreaHeight() {
      const editorContainer = this.$refs.editorMainContainer as any

      this.editorTextAreaHeight = editorContainer.clientHeight - 30
    },
    listenResize() {
      window.addEventListener(
        'resize',
        debounce(() => {
          this.setEditorTextAreaHeight()
        }, 100)
      )
    },
    textareaScroll(event: any) {
      console.log(event)
      const target = event.target
      const scrollHeight = target.scrollHeight
      const scrollTop = target.scrollTop
      console.log((scrollTop / scrollHeight) * 100)
    },
    previewScroll(event: any) {
      const target = event.target
      const scrollHeight = target.scrollHeight
      const scrollTop = target.scrollTop
      console.log((scrollTop / scrollHeight) * 100)
    },
  },
  computed: {
    htmlContent() {
      return markdownIt.render(this.markdown)
    },
  },
})
</script>

<style lang="scss" scoped>
.dew-editor-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #999;
  .dew-editor-menu-container {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #999;
    .dww-editor-menu-item {
      float: left;
      padding: 0 4px;
      cursor: pointer;
    }
    .dew-editor-builtin-menu {
      line-height: 30px;
    }
  }
  .dew-editor-main-area {
    flex-grow: 1;
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      resize: none;
      outline: none;
      font-size: 16px;
    }
    .dew-editor-preview-area {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      box-sizing: border-box;
    }
  }

  .clipboard-box {
    position: absolute;
    z-index: -1;
    visibility: hidden;
  }
}
</style>
