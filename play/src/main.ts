import { createApp } from 'vue'
import App from './App.vue'
import 'dew-editor/theme-chalk/imgMenu.css'
import { dewEditor, dewImgMenu } from '../../packages/dew-editor'

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
