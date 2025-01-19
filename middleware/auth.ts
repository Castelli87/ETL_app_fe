// // middleware/auth.js
// export default defineNuxtRouteMiddleware(async (to, from) => {
//     const token = localStorage.getItem("auth_token");
//     console.log(token)
//     if (token) {
//         try {
//             console.log('icoa')
//             // Optionally validate the token
//             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//             await $fetch("/user"); // Adjust the endpoint for validation
//         } catch {
//             // Invalid token: log out and redirect to login
//             localStorage.removeItem("auth_token");
//             delete axios.defaults.headers.common["Authorization"];
//             return navigateTo("/auth/login");
//         }
//     } else if (!["/auth/login", "/auth/register"].includes(to.path)) {
//         // Redirect to login if no token and not on auth pages
//         return navigateTo("/auth/login");
//     }
// });
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const authStore = useAuthStore();
// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    if (!authStore.isLoggedIn) {
        await authStore.initialize();

        if (!authStore.isLoggedIn) {
            return navigateTo("/auth/login");
        }
    }
});
