<template>
    <div class="login-container">
        <h2>Expense Group Form</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="others">Others Id (comma seperated)</label>
                <InputText id="others" v-model="others" required placeholder="1,2,3" />
            </div>

            <div class="form-group">
                <label for="amount">Amount</label>
                <InputText id="amount" type="amount" v-model="amount" required />
            </div>

            <Button label="Pay" type="submit" class="login-button" />
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
const others = ref('');
const amount = ref('0');
const router = useRouter();
const handleSubmit = async() => {
    try{
        const respBody = await makeRequest('POST','/expense',{
            others:others.value?.split(',').map(str=>parseInt(str)),
            totalAmount:String(amount.value)
        },{});
        console.log(respBody)
        alert("Expense group successfully created")
    }
    catch(error){
        console.log(error)
        alert(error?.message)
    }
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
