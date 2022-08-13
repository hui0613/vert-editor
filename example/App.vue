<template>
  <div class="container">
    <DewEditor :menuList="menuList"></DewEditor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DewEditor from '../src/libs/DewEditor.vue'
import ImgMenu from '../src/libs/menu/ImgMenu.vue'

export default defineComponent({
  name: 'App',
  components: {
    DewEditor,
  },
  data() {
    return {
      menuList: Object.freeze([ImgMenu]),
    }
  },
})
</script>

<style lang="scss">
.container {
  height: 100vh;
  background-color: gray;
  border: 1px solid red;
}
</style>
