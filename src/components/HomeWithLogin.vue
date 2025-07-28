<template>
    <div class="container">
        <!-- Wallet Balance -->
        <div class="wallet-section">
            <Card>
                <template #title>Net Wallet Balance</template>
                <template #content>
                    <p class="amount">₹ {{ store?.currUser?.walletBalance || 0 }}</p>
                </template>
            </Card>
            <Button label="Create Exp Grp" size="small" @click="()=>router.push('/expense-group')" />
        </div>

        <!-- Cards Section -->
        <div class="cards-section">
            <!-- To Give Section -->
            <div class="section">
                <h2>People You Owe</h2>
                <div class="card-list">
                    <Card v-for="(user, index) in giveList" :key="'give-' + index" class="card">
                        <template #title>{{ user.userName }}</template>
                        <template #content>
                            <p>
                                ₹<span style="color: #000000; font-weight: bold; font-size: 18px;">
                                    {{ user.amount }}
                                </span> to give
                            </p>
                            <Button label="Settle" size="small" @click="()=>handleSettle(user.userName,user.amount)" />
                        </template>
                    </Card>
                </div>
            </div>

            <!-- To Get Section -->
            <div class="section">
                <h2>People Who Owe You</h2>
                <div class="card-list">
                    <Card v-for="(user, index) in getList" :key="'get-' + index" class="card">
                        <template #title>{{ user.userName }}</template>
                        <template #content>
                            <p>
                                ₹<span style="color: #000000; font-weight: bold; font-size: 18px;">
                                    {{ user.amount }}
                                </span> to receive
                            </p>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Card from 'primevue/card'
import { store } from '@/store/store'
import makeRequest from '@/helper/makeRequest'
import Button from 'primevue/button'
import {useRouter} from 'vue-router';
// Data
const giveList = ref([])
const getList = ref([])
const router = useRouter();
// Fetch Data
onMounted(async () => {
    try {
        const resp1 = await makeRequest('GET', '/transaction/give-money');
        const resp2 = await makeRequest('GET', '/transaction/get-money');
        let arr2 = []
        let arr1 = resp1.map(e => { return { userName: e.id, amount: e.amount } })
        for (const key in resp2) {
            arr2.push({ "userName": key, "amount": resp2[key] })
        }
        giveList.value = arr1;
        getList.value = arr2;
    } catch (err) {
        console.error('Error fetching data', err)
    }
})

const handleSettle = (id,amount) => {
    store.defaultAmount = amount;
    store.currId = id;
    router.push('/pay')
}
</script>

<style>
.container {
    padding: 20px;
    max-width: 1000px;
    margin: auto;
}

.wallet-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 30px;
}

.cards-section {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.section {
    margin-top: 10px;
}

.card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
}

.card {
    width: 200px;
}

.amount {
    font-size: 24px;
    font-weight: bold;
    color: #2d7a2d;
}
</style>
