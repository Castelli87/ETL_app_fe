<script setup lang="ts">
import { useAuth } from "@/store/auth";
definePageMeta({ middleware: "auth-admin" }); // Protect this page
const auth = useAuth();
// Menu items
const menuItems = [
    { name: "Dashboard", key: "dashboard" },
    { name: "Users", key: "users" },
    { name: "Invitations", key: "invitations" },
    { name: "Settings", key: "settings" }
];

const activeSection = ref("dashboard");
</script>

<template>
    <div class="flex h-screen mt-[50px]">
        <!-- Sidebar -->
        <aside class="w-64 text-black flex flex-col">
            <h2 class="text-2xl font-bold  border-b border-gray-700">Admin Panel</h2>
            <nav class="flex flex-col flex-grow">
                <button v-for="item in menuItems" :key="item.key" @click="activeSection = item.key"
                    class="p-4 text-left w-full " :class="{ 'bg-blue-600': activeSection === item.key }">
                    {{ item.name }}
                </button>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-grow p-6">
            <h1 class="text-3xl font-semibold mb-6">Admin Panel - {{ activeSection }}</h1>

            <div v-if="activeSection === 'dashboard'">
                <p>Welcome to the dashboard.</p>
            </div>

            <div v-if="activeSection === 'users'">
                <p>Manage users here.</p>
            </div>

            <div v-if="activeSection === 'invitations'">
                <p>Send and manage invitations here.</p>
                <button class="px-4 py-2 bg-blue-500 text-white rounded mt-4">Invite a User</button>
            </div>

            <div v-if="activeSection === 'settings'">
                <p>Update settings here.</p>
            </div>
        </main>
    </div>
</template>

<style scoped>
/* Custom styling if needed */
</style>