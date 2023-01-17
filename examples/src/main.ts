import { createApp } from 'vue'
import App from './App.vue'
import { VertEditor } from '../../packages/vert-editor/index'

createApp(App).use(VertEditor).mount('#app')
