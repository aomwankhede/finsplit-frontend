<template>
    <div class="login-container">
        <h2>Transaction Form</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="othersId">Beneficiary Id</label>
                <InputText id="othersId" v-model="othersId" required />
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
const othersId = ref('');
const amount = ref('');
const router = useRouter();
othersId.value = store?.currId || ''
amount.value = store?.defaultAmount || ""
const handleSubmit = async() => {
    try{
        const respBody = await makeRequest('POST','/transaction/post-processing',{
            othersId:String(othersId.value),
            amount:String(amount.value),
            result:"true"  //by default transaction will always be successful
        },{});
        console.log(respBody)
        alert(respBody)
        router.push('/')
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
