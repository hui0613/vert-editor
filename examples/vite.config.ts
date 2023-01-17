import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite'
import {VertResolver} from 'vert-resolver/lib'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^vert-editor(\/(es|lib))?$/,
        replacement: path.resolve(__dirname, '../packages/vert-editor/', 'index.ts'),
      },
      {
        find: /^vert-editor\/(es|lib)\/(.*)$/,
        replacement: `${path.resolve(__dirname, '../packages')}/$2`,
      },
    ],
  },
  plugins: [vue(), DefineOptions(),
    Components({
      resolvers: [
        VertResolver({importStyle: 'scss'})
      ]
    })
  ],
})
