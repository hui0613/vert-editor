<template>
  <div class="code-theme-container">
    <select name="" id="" v-model="curTheme">
      <option v-for="(item, index) in themes" :value="item.url" :key="index">{{ item.name }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

import themes from './themes.json'

const curTheme = ref(themes[0].url)

onMounted(() => {
  insertCodeThemeLink(curTheme.value)
})

watch(curTheme, (newVal) => {
  insertCodeThemeLink(newVal)
})

const insertCodeThemeLink = (newVal: string) => {
  const el = document.getElementById('hljs')

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
</script>
