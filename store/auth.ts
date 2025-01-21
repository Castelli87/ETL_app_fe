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
