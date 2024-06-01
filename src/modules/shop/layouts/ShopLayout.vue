<template>

  <!-- Header Navbar -->
  <TopMenu />

  <section class="min-h-[calc(100vh-5.5rem)] flex flex-col">
    <RouterView />
  </section>

  <!-- Footer -->
  <CustomFooter />
</template>

<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';


</script>

<style scoped></style>