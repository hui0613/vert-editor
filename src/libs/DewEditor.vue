<template>
  <div class="dew-editor-container">
    <div class="dew-editor-menu-container">
      <template v-for="(item, index) in menuList" :key="index">
        <div class="dww-editor-menu-item">
          <component :is="item" @insertContent="insertContent"></component>
        </div>
      </template>
    </div>
    <div class="dew-editor-text-area">
      <textarea ref="textAreaBox"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DewEditor',
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      textAreaHeight: 0,
      textAreaWidth: 0,
    }
  },
  methods: {
    insertContent(data: string) {
      console.log(data)
      const tc: any = this.$refs.textAreaBox
      tc.focus()
      console.log(tc.selectionStart)
    },
  },
})
</script>

<style lang="scss" scoped>
.dew-editor-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .dew-editor-menu-container {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #999999;
    .dww-editor-menu-item {
      float: left;
      padding: 0 4px;
      cursor: pointer;
    }
  }
  .dew-editor-text-area {
    width: 100%;
    flex-grow: 1;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    textarea {
      width: 100%;
      border: none;
      outline: none;
      height: 100%;
      resize: none;
    }
  }
}
</style>
