<script setup lang="ts">
import { ref } from 'vue';
import 'primeicons/primeicons.css';
import type { MenuItem } from 'primevue/menuitem';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { useRouter } from 'vue-router'
import { store } from '../store/store'
import makeRequest from '@/helper/makeRequest';

const router = useRouter()

const items: MenuItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/') ,
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => router.push('/about') ,
  },
  {
    label: 'Contacts',
    icon: 'pi pi-user',
    command: () => router.push('/contact') ,
  },
];

// const isLoggedIn = ref(false);   // isLoggedIn is a reactive and mutable ref object with property .value

// Time-Based Greeting
const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return `Good Morning ${store.currUser?.userName || 'champ'} 👋`;
  if (hour < 17) return `Good Afternoon ${store.currUser?.userName || 'champ'} 👋`;
  if (hour < 21) return `Good Evening ${store.currUser?.userName || 'champ'} 👋`;
  return `Good Night ${store.currUser?.userName || 'champ'} 👋`;
}

const handleLogout = () => {
  console.log("Logging out...");
  localStorage.removeItem('token')
  store.isLoggedIn = false;
  store.currUser = null;
  router.push('/login')
};
</script>

<template>
  <Menubar :model="items" class="custom-menubar">
    <template #end>
      <div class="flex items-center gap-3">
        <span class="greeting hidden sm:block text-xl font-medium text-gray-800 text-center w-full">
          {{greeting()}}
        </span>
        <Button v-if="!store.isLoggedIn" icon="pi pi-sign-in" severity="success" @click="()=>router.push('/login')"
          label="Login" />
        <Button v-else icon="pi pi-sign-out" severity="danger" @click="()=>{router.push('/');handleLogout()}"
          label="Logout" />
      </div>
    </template>
  </Menubar>
</template>


<style scoped>
.custom-menubar {
  display: flex;
  align-items: center;
}

.greeting {
  position: absolute;
  left: 50%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: large;
  transform: translateX(-50%);
}
</style>
