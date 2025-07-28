<!-- components/HomeRouter.vue -->
<template>
  <HomeWithLogin v-if="store.isLoggedIn" />
  <HomeWithoutLogin v-else />
</template>

<script setup>
import { store } from '../store/store.js'
import HomeWithLogin from './HomeWithLogin.vue'
import HomeWithoutLogin from './HomeWithoutLogin.vue'
</script>
