import { useAuth } from '~/store/auth';
import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuth();

    if (!authStore.isAuth || authStore.user?.roles[0] !== "company-admin") {
        return navigateTo("/"); // Redirect to home if not an admin
    }
});
