<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Set Axios base URL
axios.defaults.baseURL = "http://localhost:8000/api"; // Adjust to your API's base URL // Adjust to your API's base URL

// Form data
const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

// Vue Router instance
const router = useRouter();

// Submit form for registration
const submitForm = async () => {
    try {
        console.log("Form Data:", form.value);

        // Make the POST request to register
        const response = await axios.post("http://localhost:8000/api/auth/register", form.value);

        console.log("Server Response:", response.data);

        // Save JWT token (if provided)
        if (response.data && response.data.access_token) {
            localStorage.setItem("auth_token", response.data.access_token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            alert("Registration successful!");
        } else {
            alert("Registration successful, but no token received.");
        }

        // Clear form data
        form.value = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        };

        // Redirect to the dashboard or login page
        router.push("/"); // Change '/' to your desired route
    } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
        alert("Registration failed. Please try again.");
    }
};


definePageMeta({
    layout: 'guest'
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center mt-10">
        <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-bold text-center text-blue-600">Register</h2>
            <p class="text-sm text-gray-500 text-center mt-2">Create a new account</p>
            <form @submit.prevent="submitForm" class="space-y-4 mt-4">
                <!-- Name Field -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="form.name" type="text" id="name" name="name"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your name" required />
                </div>

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

                <!-- Password Confirmation Field -->
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm
                        Password</label>
                    <input v-model="form.password_confirmation" type="password" id="password_confirmation"
                        name="password_confirmation"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm your password" required />
                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Register
                </button>
            </form>

            <p class="text-sm text-center text-gray-500 mt-4">
                Already have an account?
                <a href="/auth/login" class="text-blue-600 hover:underline">Login</a>
            </p>
        </div>
    </div>
</template>

<style>
/* Add your custom styles here */
</style>
