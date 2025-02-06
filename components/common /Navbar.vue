<template>
    <nav class="bg-white border-gray-200">
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between h-16">
                <div class="flex-shrink-0 flex items-center">
                    <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
                        ETL System
                    </NuxtLink>
                </div>

                <div v-if="authStore.isAuth && authStore.user" class="flex items-center gap-4">
                    <span class="text-sm">{{ authStore.user.name }}</span>
                    <span class="border border-blue-600 px-3 py-1 rounded text-xs">{{ authStore.user.roles[0] }}</span>
                </div>

                <!-- Navigation Links -->
                <div class="hidden sm:flex sm:items-center sm:ml-6">
                    <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                        Home
                    </NuxtLink>
                    <NuxtLink to="/about"
                        class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                        About
                    </NuxtLink>
                </div>

                <!-- Action Buttons -->
                <div class="hidden sm:flex sm:items-center">
                    <template v-if="authStore.isAuth">
                        <button @click="authStore.logout"
                            class="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
                            Logout
                        </button>
                    </template>
                    <template v-else>
                        <NuxtLink to="/auth/login"
                            class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium mr-2">
                            Login
                        </NuxtLink>
                        <NuxtLink to="/auth/register"
                            class="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">
                            Register
                        </NuxtLink>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useAuth } from '~/store/auth';

const authStore = useAuth();
</script>