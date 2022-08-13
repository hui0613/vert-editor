<template>
  <div class="img-menu-container" @click="insertContent">asa</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    insertContent() {
      this.$emit('insertContent', 'add img ')
    },
  },
})
</script>
