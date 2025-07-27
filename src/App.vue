<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="page-container">
    <Navbar />
    <!-- This is literally a main component where the actual changes because of routing will take place -->
    <div class="main-content">
      <router-view />
    </div>
    <Footer /> 
  </div>
</template>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
