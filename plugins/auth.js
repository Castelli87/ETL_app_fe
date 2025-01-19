// plugins/auth.ts
import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
    // Wait for the app to be mounted before initializing auth
    if (process.client) {
        const authStore = useAuthStore()
        nuxtApp.hook('app:mounted', async () => {
            await authStore.initialize()
        })
    }
})