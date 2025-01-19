<script setup>
import { onMounted } from "vue";
// import { useAuthStore } from "~/stores/auth";
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const authStore = useAuthStore();

onMounted(() => {
    authStore.initialize(); // Initialize authentication state globally
});
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header>
            <Navbar />
        </header>
        <main>
            <NuxtPage />
        </main>
    </div>
</template>