import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isLoggedIn: false,
        user: null as Record<string, any> | null,
        token: null as string | null,
    }),
    actions: {
        async initialize() {
            const token = localStorage.getItem("auth_token");
            console.log(token, '<<<fuori');


            if (token) {
                try {
                    // Set token in Axios headers
                    console.log(token, '<<DENtro');

                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    // Validate the token by calling /api/me
                    const { data } = await axios.get("/api/me"); // Adjust endpoint if needed
                    this.isLoggedIn = true;
                    this.user = data;
                    this.token = token;
                } catch (error) {
                    console.warn("Token validation failed:", error);
                    this.logout();
                }
            } else {
                this.logout(); // No token found
            }
        },
        login(token: string) {
            localStorage.setItem("auth_token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            this.isLoggedIn = true;
            this.token = token;
        },
        logout() {
            localStorage.removeItem("auth_token");
            delete axios.defaults.headers.common["Authorization"];
            this.isLoggedIn = false;
            this.user = null;
            this.token = null;
        },
    },
});
