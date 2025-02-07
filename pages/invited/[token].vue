<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const token = ref<string | null>(route.params.token as string);
const invitation = ref<{ email: string; role: string; company_id: number } | null>(null);
const errorMessage = ref("");
const form = ref({
    name: "",
    password: "",
});

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/invited/${token.value}`);
        invitation.value = response.data;
    } catch (error) {
        errorMessage.value = "Invalid or expired invitation.";
    }
});

const registerUser = async () => {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/register-from-invitation", {
            token: token.value, // Extracted from URL
            name: form.value.name,
            password: form.value.password,
        });

        // Store authentication token
        // localStorage.setItem("authToken", response.data.access_token);

        // Redirect user to dashboard after successful registration
        router.push("/auth/login");

        alert("Registration successful! Now you can login ");
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        errorMessage.value = "Registration failed. Please try again.";
    }
};
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div class="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold text-center text-blue-600">Complete Your Registration</h2>

            <p v-if="errorMessage" class="text-red-600 text-center mt-4">{{ errorMessage }}</p>

            <div v-else-if="invitation">
                <p class="text-center text-gray-600 mt-4">
                    You're registering as <strong>{{ invitation.role }}</strong>
                </p>

                <p class="text-center text-gray-600 mt-2">
                    Company ID: <strong>{{ invitation.company_id }}</strong>
                </p>

                <form @submit.prevent="registerUser" class="space-y-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Name</label>
                        <input v-model="form.name" type="text"
                            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name" required />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <input v-model="form.password" type="password"
                            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password" required />
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
                        Complete Registration
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
