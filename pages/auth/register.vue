<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Router & Route
const router = useRouter();
const route = useRoute();

// Read query parameter from URL
const accountType = ref("single");

// Form data
const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    account_type: "single",
    company_name: "", // Only used for companies
});

// Set account type based on query
onMounted(() => {
    if (route.query.type) {
        accountType.value = route.query.type;
        form.value.account_type = route.query.type;
    }
});

// Only show company name if account type is company
const isCompany = computed(() => accountType.value === "company");

// Submit Form
const submitForm = async () => {
    try {
        console.log("Form Data:", form.value);
        const response = await axios.post("http://localhost:8000/api/auth/register", form.value);

        if (response.data?.access_token) {
            localStorage.setItem("auth_token", response.data.access_token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            alert("Registration successful!");
        }

        form.value = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            account_type: accountType.value, // Keep the chosen account type
            company_name: "",
        };

        router.push("/"); // Redirect after registration
    } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
        alert("Registration failed. Please try again.");
    }
};

definePageMeta({
    layout: "guest",
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
                    <input v-model="form.name" type="text" id="name"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required />
                </div>

                <!-- Email Field -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="form.email" type="email" id="email"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required />
                </div>

                <!-- Password Fields -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" id="password"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required />
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm
                        Password</label>
                    <input v-model="form.password_confirmation" type="password" id="password_confirmation"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required />
                </div>

                <!-- Hidden Account Type Field -->
                <input type="hidden" v-model="form.account_type" />

                <!-- Company Name (Only if account type is company) -->
                <div v-if="isCompany">
                    <label for="company_name" class="block text-sm font-medium text-gray-700">Company Name</label>
                    <input v-model="form.company_name" type="text" id="company_name"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required />
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
