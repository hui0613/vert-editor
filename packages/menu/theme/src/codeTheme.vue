<template>
  <div class="code-theme-container">
    <el-menu mode="horizontal" active-text-color="#303133">
      <template v-for="(item, index) in themes" :key="index">
        <el-menu-item v-if="!item.children || !item.children.length" :key="index">
          {{ item.title }}
        </el-menu-item>
        <sub-menu v-else :prefix="index.toString()" :title="item.title" :menu="item.children"></sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem } from 'element-plus'
import SubMenu from './components/subMenuItem.vue'

import themes from './themes.json'
import { emitter } from '@dew-editor/utils'

const insertCodeThemeLink = (newVal: string) => {
  const el = document.getElementById('hjls')

  if (el) {
    el.setAttribute('href', newVal)
  } else {
    const link = document.createElement('link')

    link.setAttribute('type', 'text/css')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', newVal)
    link.setAttribute('id', 'hjls')
    document.head.appendChild(link)
  }
}

emitter.on('changeThemes', (item: any) => {
  if (item.type === 'codeTheme') {
    insertCodeThemeLink(item.value)
  }
})
</script>

<style scoped lang="scss">
select {
  padding: 3px 8px;
  outline: none;
  border: 1px solid #eeeeee;
}
option {
  margin-top: 100px;
  border: none;
}
</style>
