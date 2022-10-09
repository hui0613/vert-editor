import { h, App } from 'vue'
import imgMenu from './src/imgMenu.vue'

interface ImgMenuOptions {
  app: App
  httpRequest: (params: any) => any
}

function renderMenu(options: ImgMenuOptions) {
  return h(imgMenu, { ...options })
}

function dewImgMenu(options: ImgMenuOptions): string {
  options.app.component('dew-img-menu', renderMenu(options))
  return 'dew-img-menu'
}

export { dewImgMenu }

export default dewImgMenu
