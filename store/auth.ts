import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
    state: () => ({
        isAuth: false,
        user: null as any, // Store user data
    }),
    actions: {
        async login(email: string, password: string) {
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

                localStorage.setItem('authToken', data.access_token);
                this.setAuthState(true); // Update auth state reactively
                await this.fetchUser();

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

        async fetchUser() {
            try {
                const token = localStorage.getItem("authToken");

                if (!token) return console.log('no token ');

                const response = await fetch("http://localhost:8000/api/me", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const userData = await response.json();
                this.user = userData; // Store user details

                // Persist user data in local storage
                localStorage.setItem("user", JSON.stringify(userData));
            } catch (error) {
                console.error(error);
            }
        },


        checkAuth() {
            if (typeof window !== 'undefined') {
                this.isAuth = !!localStorage.getItem('authToken');
            }
        },

        setAuthState(status: boolean) {
            this.isAuth = status;
        },
    },
});
