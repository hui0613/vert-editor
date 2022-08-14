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
          <textarea></textarea>
        </template>
        <template v-slot:rightSection></template>
      </DewEditorContainer>
    </div>

    <div ref="clipboardButton" class="clipboard-box" :data-clipboard-text="clipboardValue"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DewPreviewMenu from './menu/PreviewMenu.vue'
import DewEditorContainer from './components/DewEditorContainer.vue'
import { copyTextToClipboard, insertTextIntoEditor, isExistSelection } from './libs/dewEditor'
import { debounce } from './utils/tools'

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

      this.editorTextAreaHeight = editorContainer.clientHeight - 40
    },
    listenResize() {
      window.addEventListener(
        'resize',
        debounce(() => {
          this.setEditorTextAreaHeight()
        }, 100)
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.dew-editor-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  border: 1px solid #999;
  .dew-editor-menu-container {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #999999;
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
    }
  }

  .clipboard-box {
    position: absolute;
    z-index: -1;
    visibility: hidden;
  }
}
</style>
