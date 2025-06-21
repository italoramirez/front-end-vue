import {defineStore} from 'pinia'
import {useRouter} from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false
    }),
    actions: {
        async login(email, password) {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            const data = await response.json()
            if (response.ok) {
                this.user = {email}
                this.isAuthenticated = true
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                return true
            } else {
                throw new Error('Credenciales incorrectas')
            }
        },
        async logout() {
            this.user = null
            this.isAuthenticated = false
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    getters: {
        token: () => localStorage.getItem('token'),
        // user: (state) => localStorage.getItem('user')
    }
})
