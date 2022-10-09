import { createApp } from 'vue'
import App from './App.vue'
import { dewEditor, dewImgMenu } from 'dew-editor'

const app = createApp(App)

const imgMenuName = dewImgMenu({
  app,
  httpRequeest: (options) => {
    console.log('aaaaaaa')
    console.log(options)
  },
})

const eidtor = dewEditor({
  menuList: [imgMenuName],
})

app.use(eidtor).mount('#app')
