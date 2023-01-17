import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [DefineOptions(), Vue(), VueJsx()],
  test: {
    environment: 'jsdom',
  },
})
