import DewEidtor from './DewEditor.vue'
import {App, h} from 'vue'

function renderEditor(list: any){
  return h(DewEidtor,  {menuList: list})
}

function dewEditor(options: any){
  const menuList = options.menuList
  return {
    install(app: App){
      app.component('dew-editor', renderEditor(menuList))
    }
  }
}

export {dewEditor}