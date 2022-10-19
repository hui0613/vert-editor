import { createApp } from 'vue'
import App from './App.vue'
import '@dew-editor/theme-chalk/src/editor/DewEditor.scss'
import '@dew-editor/theme-chalk/src/menu/imgMenu.scss'
import { dewEditor, dewImgMenu } from '../../packages/dew-editor'
import '@dew-editor/theme-chalk/src/editor/DewEditor.scss'
import '@dew-editor/theme-chalk/src/menu/imgMenu.scss'

const app = createApp(App)

const imgMenuName = dewImgMenu({
  app,
  httpRequest: (options) => {
    options.onSuccess(['1', '2', '3'])
  },
})

const eidtor = dewEditor({
  menuList: [imgMenuName],
})

app.use(eidtor).mount('#app')
