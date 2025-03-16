<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

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

// Decode JWT to get expiration time
function getTokenExpiration(token) {
    if (!token) return null;
    try {
        const payloadBase64 = token.split(".")[1]; // Get payload part
        const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode Base64
        return decodedPayload.exp * 1000; // Convert to milliseconds
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}


// Refresh token function
async function refreshToken() {
    try {
        const response = await axios.post("http://localhost:8000/api/refresh", {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });

        const newToken = response.data.access_token;
        localStorage.setItem("authToken", newToken);
        console.log("Token refreshed successfully");

        return newToken;
    } catch (error) {

        console.error("Token refresh failed, logging out", error);
        localStorage.removeItem("authToken");
        window.location.href = "/auth/login"; // Redirect user to login
    }
}


// Call fetchMessage when the component is mounted
onMounted(() => {
    fetchMessage();

    setInterval(async () => {
        const token = localStorage.getItem("authToken");

        if (!token) return; // No token, no refresh needed

        const tokenExpiry = getTokenExpiration(token);

        if (tokenExpiry && Date.now() >= tokenExpiry - 30000) { // 1 minute before expiry
            console.log("Refreshing token...");
            await refreshToken();
        }
    }, 15000); // Check every 30 seconds
});
</script>

<template>
    <div>
        <h1 class="text-3xl">API Response</h1>
        <p class="text-red-900 font-bold" v-if="message">{{ message }}</p>
        <p v-else>Loading...</p>
    </div>
</template>
