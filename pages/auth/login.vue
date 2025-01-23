<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { useAuthStore } from "~/store/auth"; // Assuming you're using Pinia for auth management
import axios from "axios";
import { useAuth } from '~/store/auth';

const authStore = useAuth();

// Form data
const form = ref({
    email: "",
    password: "",
});

// Vue Router instance
const router = useRouter();

// Auth Store
// const authStore = useAuthStore();

// Redirect if already logged in
// onMounted(async () => {
//     const token = localStorage.getItem("auth_token");
//     if (token) {
//         try {
//             // Validate the token and redirect
//             await authStore.initialize();
//             if (authStore.isLoggedIn) {
//                 router.push("/"); // Redirect to the home page
//             }
//         } catch {
//             // Token is invalid, proceed with login page
//             authStore.logout();
//         }
//     }
// });

// Submit login form
const submitForm = async () => {
    try {
        console.log("Starting login process");

        // Send login request to backend using JWT
        const response = await axios.post("http://localhost:8000/api/auth/login", form.value);

        console.log("Login successful", response.data);
        console.log(response.data.access_token, '<<login');

        // Save JWT token to Auth Store
        if (response.data && response.data.access_token) {
            localStorage.setItem('authToken', response.data.access_token);
            authStore.setAuthState(true);
            // Redirect to the home page
            router.push("/");
        } else {
            throw new Error("Token not found in response");
        }

        // Clear the form
        form.value = {
            email: "",
            password: "",
        };
    } catch (error: any) {
        console.error("Full error object:", error);
        console.error("Response data:", error?.response?.data);
        console.error("Response status:", error?.response?.status);
        alert("Login Failed. Please try again.");
    }
};


</script>

<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center mt-10">
        <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-bold text-center text-blue-600">Login</h2>
            <p class="text-sm text-gray-500 text-center mt-2">Log in to your account</p>
            <form @submit.prevent="submitForm" class="space-y-4 mt-4">
                <!-- Email Field -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="form.email" type="email" id="email" name="email"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email" required />
                </div>

                <!-- Password Field -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" id="password" name="password"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password" required />
                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Log In
                </button>
            </form>

            <p class="text-sm text-center text-gray-500 mt-4">
                Do you need to create an account?
                <a href="auth/register" class="text-blue-600 hover:underline">Register</a>
            </p>
        </div>
    </div>
</template>
