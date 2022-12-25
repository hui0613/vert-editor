import DewEditor from './DewEditor.vue'
import highLight from 'highlight.js'
import 'dew-editor/theme-chalk/editor/DewEditor.css'
import 'dew-editor/theme-chalk/editor/markdown.css'
import { App, h } from 'vue'

export interface EditorOptions {
  menuList: string[]
}

function renderEditor(list: string[]) {
  return h(DewEditor, { menuList: list })
}

function dewEditor(options: EditorOptions) {
  const menuList = options.menuList
  return {
    install(app: App) {
      app.directive('highlight', (el: Element) => {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach((block: any) => {
          highLight.highlightBlock(block)
        })
      })
      app.component('dew-editor', renderEditor(menuList))
    },
  }
}

export { dewEditor }
