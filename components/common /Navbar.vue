<template>
    <nav class="bg-white border-gray-200">
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between h-16">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="/" class="text-2xl font-bold text-blue-600">
                        ETL System
                    </a>
                </div>

                <!-- Navigation Links -->
                <div class="hidden sm:flex sm:items-center sm:ml-6">
                    <a href="/" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                        Home
                    </a>
                    <a href="/about" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                        About
                    </a>
                </div>

                <!-- Action Buttons -->
                <div class="hidden sm:flex sm:items-center">
                    <template v-if="isAuthenticated">
                        <button @click="logout"
                            class="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
                            Logout
                        </button>
                    </template>
                    <template v-else>
                        <a href="/auth/login"
                            class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium mr-2">
                            Login
                        </a>
                        <a href="/auth/register"
                            class="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">
                            Register
                        </a>
                    </template>
                </div>

                <!-- Mobile Menu Button -->
                <div class="sm:hidden flex items-center">
                    <button @click="toggleMenu"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="sm:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="/" class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                    Home
                </a>
                <a href="/about"
                    class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                    About
                </a>
                <template v-if="isAuthenticated">
                    <button @click="logout"
                        class="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium">
                        Logout
                    </button>
                </template>
                <template v-else>
                    <a href="/auth/login"
                        class="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                        Login
                    </a>
                    <a href="/auth/register"
                        class="bg-gray-100 text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                        Register
                    </a>
                </template>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isMenuOpen = ref(false);
const isAuthenticated = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
    isAuthenticated.value = !!localStorage.getItem('authToken');
});

const logout = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Logout failed');

        localStorage.removeItem('authToken');
        isAuthenticated.value = false;
        alert('Logout successful');
    } catch (error) {
        console.error(error);
    }
};
</script>

<style>
/* Add your custom styles here */
</style>
