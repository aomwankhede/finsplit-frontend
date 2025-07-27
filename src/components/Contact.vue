<template>
  <div class="contact-container">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="name" type="text" id="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea v-model="message" id="message" rows="4" required></textarea>
      </div>

      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');

function submitForm() {
  console.log('Contact Form Submitted:', {
    name: name.value,
    email: email.value,
    message: message.value,
  });
  alert('Message sent! Thank you.');
  name.value = '';
  email.value = '';
  message.value = '';
}
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-size: 14px;
}

button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #1a252f;
}
</style>
