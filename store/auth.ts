// // store/auth.ts
// import { defineStore } from "pinia";
// import axios from "axios";

// export const useAuthStore = defineStore("auth", {
//     state: () => ({
//         isLoggedIn: false,
//         user: null as Record<string, any> | null,
//         token: null as string | null,
//     }),
//     actions: {
//         async initialize() {
//             // Get token from cookie using useState for SSR compatibility
//             const cookieToken = useCookie('auth_token');
//             const token = cookieToken.value;
//             console.log(token, '<<<inside the init first step');


//             if (token) {
//                 console.log(token, '<<<inside try');
//                 try {
//                     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//                     const { data } = await axios.get("api/me");
//                     this.isLoggedIn = true;
//                     this.user = data;
//                     this.token = token;
//                     console.log(this.token, '<<<inside ttry second  step');
//                 } catch (error) {
//                     console.error("Token validation failed:", error);
//                     await this.logout();
//                 }
//             } else {
//                 await this.logout();
//             }
//         },

//         async login(token: string) {
//             const cookieToken = useCookie('auth_token');
//             cookieToken.value = token;

//             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//             this.isLoggedIn = true;
//             this.token = token;

//             // Optionally fetch user data here
//             try {
//                 const { data } = await axios.get("http://localhost:8000/api/me");
//                 this.user = data;
//             } catch (error) {
//                 console.error("Failed to fetch user data:", error);
//             }
//         },

//         async logout() {
//             const cookieToken = useCookie('auth_token');
//             cookieToken.value = null;

//             delete axios.defaults.headers.common["Authorization"];
//             this.isLoggedIn = false;
//             this.user = null;
//             this.token = null;

//             // Optionally navigate to login page
//             await navigateTo('/auth/login');
//         }
//     },
// });

import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
    state: () => ({
        isAuth: false,
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await fetch('http://localhost:8000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) throw new Error('Login failed');

                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                this.setAuthState(true); // Update auth state reactively
            } catch (error) {
                console.error(error);
            }
        },

        async logout() {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Logout failed');

                localStorage.removeItem('authToken');
                this.setAuthState(false);
                alert('Logout successful');
            } catch (error) {
                console.error(error);
            }
        },

        checkAuth() {
            if (typeof window !== 'undefined') {
                this.isAuth = !!localStorage.getItem('authToken');
            }
        },

        setAuthState(status) {
            this.isAuth = status;
        },
    },
});
