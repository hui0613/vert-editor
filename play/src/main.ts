import { createApp } from 'vue'
import App from './App.vue'
import { dewEditor, dewImgMenu } from 'dew-editor'

const app = createApp(App)

const imgMenuName = dewImgMenu({
  app,
  httpRequest: (options) => {
    console.log('aaaaaaa')
    console.log(options)
    options.onSuccess(['1', '2', '3'])
  },
})

const eidtor = dewEditor({
  menuList: [imgMenuName],
})

app.use(eidtor).mount('#app')
