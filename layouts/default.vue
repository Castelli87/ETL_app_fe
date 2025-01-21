<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header>
            <Navbar v-if="isLoaded" />
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '~/store/auth';


const authStore = useAuth();
const isLoaded = ref(false);

onMounted(() => {
    authStore.checkAuth();
    isLoaded.value = true;  // Ensures hydration mismatch doesn't happen
});
</script>