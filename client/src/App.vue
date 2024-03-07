<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>
