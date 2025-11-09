<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="app">
    <h1>Vite + Vue</h1>
    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit <code>src/App.vue</code> to test HMR
      </p>
    </div>
    <p class="read-the-docs">
      Click on the Vite and Vue logos to learn more
    </p>
  </div>
</template>

<style scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
</style>
