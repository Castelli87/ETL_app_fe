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



import { ref } from "vue";
import axios from "axios";

// Form state for the invitation
const inviteForm = ref({
    email: "",
    role: ""  // either "staff" or "supervisor"
});

// For feedback message after submitting
const inviteMessage = ref("");

const sendInvitation = async () => {
    try {
        const token = localStorage.getItem("authToken"); // Retrieve stored JWT token

        if (!token) {
            inviteMessage.value = "User is not authenticated.";
            return;
        }

        const response = await axios.post(
            "http://localhost:8000/api/invite",
            {
                email: inviteForm.value.email,
                role: inviteForm.value.role
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token
                    "Content-Type": "application/json"
                }
            }
        );

        inviteMessage.value = response.data.message || "Invitation sent successfully!";

        // Clear the form
        inviteForm.value.email = "";
        inviteForm.value.role = "";
    } catch (error) {
        console.error("Invitation error:", error.response?.data || error.message);
        inviteMessage.value = "Failed to send invitation.";
    }
};


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


                <!-- This block is shown only when the 'invitations' menu is active -->
                <div v-if="activeSection === 'invitations'">
                    <h2 class="text-2xl font-semibold mb-4">Send an Invitation</h2>
                    <form @submit.prevent="sendInvitation" class="space-y-4">
                        <!-- Email Input -->
                        <div>
                            <label for="invite-email" class="block text-gray-700 font-medium">Email</label>
                            <input id="invite-email" v-model="inviteForm.email" type="email"
                                placeholder="Enter invitee email" required
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
                        </div>

                        <!-- Role Select -->
                        <div>
                            <label for="invite-role" class="block text-gray-700 font-medium">Role</label>
                            <select id="invite-role" v-model="inviteForm.role" required
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2">
                                <option disabled value="">Select role</option>
                                <option value="staff">Staff</option>
                                <option value="supervisor">Supervisor</option>
                            </select>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit"
                            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Send Invitation
                        </button>
                    </form>

                    <!-- Display a message when the invitation is sent (or fails) -->
                    <p v-if="inviteMessage" class="mt-4 text-green-600">
                        {{ inviteMessage }}
                    </p>
                </div>


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