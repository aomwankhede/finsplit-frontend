import { createApp } from 'vue';
import App from './App.vue';
import 'primeicons/primeicons.css';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import { createWebHistory , createRouter } from 'vue-router';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import Home from './components/HomeWithoutLogin.vue';
import HomeWithLogin from './components/HomeWithLogin.vue';
import Form from './components/Form.vue';
import { store } from './store/store';
import SettleForm from './components/SettleForm.vue';
import ExpenseForm from './components/ExpenseForm.vue';

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
  { path: '/', component: (!store.isLoggedIn)?Home:HomeWithLogin }, // why reload has to be done after state change
  { path: '/contact', component: Contact },
  { path: '/login', component: Form },
  { path: '/pay', component: SettleForm },
  { path: '/expense-group', component: ExpenseForm },
];

const router = createRouter({ history: createWebHistory(), routes });

app.use(router);

app.mount('#app');
