<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import type { MenuItem } from 'primevue/menuitem';

const items: MenuItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => console.log('Home clicked'),
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => console.log('About clicked'),
  },
  {
    label: 'Contacts',
    icon: 'pi pi-user',
    command: () => console.log('Contacts clicked'),
  },
];

const isLoggedIn = ref(false);

// Time-Based Greeting
const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning Champ';
  if (hour < 17) return 'Good Afternoon Champ';
  if (hour < 21) return 'Good Evening Champ';
  return 'Good Night Champ';
}

const handleLogin = () => {
  console.log("Logging in...");
  isLoggedIn.value = true;
};

const handleLogout = () => {
  console.log("Logging out...");
  isLoggedIn.value = false;
};
</script>

<template>
  <Menubar :model="items" class="custom-menubar">
    <template #end>
      <div class="flex items-center gap-3">
        <span class="greeting hidden sm:block text-xl font-medium text-gray-800 text-center w-full">
          {{greeting()}}
        </span>
        <Button
          v-if="!isLoggedIn"
          icon="pi pi-sign-in"
          severity="success"
          @click="handleLogin"
          label="Login"
        />
        <Button
          v-else
          icon="pi pi-sign-out"
          severity="danger"
          @click="handleLogout"
          label="Logout"
        />
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
