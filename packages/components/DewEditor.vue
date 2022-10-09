<template>
  <div></div>
</template>

<script lang="ts" setup>

import {defineProps, onMounted} from 'vue'

const props = defineProps({
  menuList: {
    type: Array,
  }
})

onMounted(()=>{
  console.log(props)
})


</script>