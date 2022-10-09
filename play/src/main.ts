import { createApp } from 'vue'
import App from './App.vue'

import {dewEditor} from 'dew-editor'

const eidtor = dewEditor({
  menuList: ['asas']
})

console.log(eidtor)


const app = createApp(App)

app.use(eidtor).mount('#app')
