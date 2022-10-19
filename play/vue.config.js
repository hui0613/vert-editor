const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('dew-editor', path.resolve(__dirname, '../packages/dew-editor'))
  },
})
