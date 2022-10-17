import DewEditor from './DewEditor.vue'
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
      app.component('dew-editor', renderEditor(menuList))
    },
  }
}

export { dewEditor }
