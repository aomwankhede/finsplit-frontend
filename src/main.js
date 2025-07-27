import { createApp } from 'vue';
import App from './App.vue';
import 'primeicons/primeicons.css';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import { createWebHistory , createRouter } from 'vue-router';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import Home from './components/Home.vue';
import Form from './components/Form.vue';

// Using this doesn't fetch good result I dont know why ?
// import { createMemoryHistory } from 'vue-router';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

const routes = [
  { path: '/about', component: About },
  { path: '/', component: Home },
  { path: '/contact', component: Contact },
  { path: '/login', component: Form },
];

const router = createRouter({ history: createWebHistory(), routes });

app.use(router);

app.mount('#app');
