<script setup>
import { ref, onMounted } from 'vue';

// Define a reactive variable for the message
const message = ref('');

// Fetch data from the API on component mount
const fetchMessage = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/test');
        const data = await response.json();
        message.value = data.message; // Assign the message to the ref
    } catch (error) {
        console.error('Error fetching the API:', error);
    }
};



// Call fetchMessage when the component is mounted
onMounted(() => {
    fetchMessage();
});
</script>

<template>
    <div>
        <h1 class="text-3xl">API Response</h1>
        <p class="text-red-900 font-bold" v-if="message">{{ message }}</p>
        <p v-else>Loading...</p>
    </div>
</template>
