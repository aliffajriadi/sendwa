<script setup>
import Navbar from "./components/Navbar.vue";
import Status from "./components/Status.vue";

</script>

<template>
  <Status/>
  <div class="max-w-xl mx-auto space-y-10 pt-4">
    <Navbar/>
    <div class="px-3">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>

</style>
