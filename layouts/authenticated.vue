// layouts/authenticated.vue
<script setup>
definePageMeta({
    middleware: ['auth']
})
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header>
            <Navbar />
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>