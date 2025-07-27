<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <InputText id="username" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <Password id="password" v-model="password" toggleMask required />
      </div>

      <Button label="Login" type="submit" class="login-button" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { store } from '@/store/store';
import makeRequest from '@/helper/makeRequest';
import { useRouter } from 'vue-router'
const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const handleLogin = async() => {
  console.log("Logging in...");
  const respBody = await makeRequest('POST','/users/auth/login',{
    userName:username.value,
    email:email.value,
    password:password.value
  },{});
  if(!respBody){
    alert("Req failed!!")
    return;
  }
  else{
    await localStorage.setItem('token',respBody)
    const respBody2 = await makeRequest('GET','/users');
    store.currUser = respBody2;
    router.push('/')
    alert("Successfully Logged In");
  }
  store.isLoggedIn =  true;
};

</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
}

input,
.p-password-input {
  width: 100%;
}

.login-button {
  width: 100%;
  margin-top: 12px;
}
</style>
