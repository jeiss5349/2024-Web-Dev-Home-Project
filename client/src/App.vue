<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import MessageListView from "./views/MessageListView.vue";

</script>

<template>
  <header>
    <NavBar />
    <MessageListView />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>
