import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false
    }),
    actions: {
        async login(email, password) {
            if (email === 'admin@admin.com' && password === '1234') {
                this.user = { email }
                this.isAuthenticated = true
                localStorage.setItem('auth', 'true')
                return true
            } else {
                throw new Error('Credenciales incorrectas')
            }
        },
        async logout() {
            this.user = null
            this.isAuthenticated = false
            localStorage.removeItem('auth')
        }
    }
})
