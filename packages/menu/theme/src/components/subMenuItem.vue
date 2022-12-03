<template>
  <el-sub-menu :index="props.prefix">
    <template #title>{{ props.title }}</template>
    <template v-for="(item, index) in props.menu" :key="props.prefix + index">
      <el-menu-item v-if="!item.children || !item.children.length" :index="item.value" @click="selectTheme(item)">
        {{ item.title }}
      </el-menu-item>
      <sub-menu v-else :prefix="`${props.prefix}-${index}`" :title="item.title" :menu="item.children"></sub-menu>
    </template>
  </el-sub-menu>
</template>

<script lang="ts">
export default {
  name: 'SubMenu',
}
</script>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from 'vue'
import { ElSubMenu, ElMenuItem } from 'element-plus'
import { Menu } from '../codeTheme'
import { emitter } from '@dew-editor/utils'

const props = defineProps({
  prefix: {
    type: String,
    default: '1',
  },
  title: {
    type: String,
    default: '',
  },
  menu: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
})

const selectTheme = (item: Menu) => {
  emitter.emit('changeThemes', item)
}
</script>
