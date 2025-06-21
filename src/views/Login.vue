<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth.js'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import BaseButton from "../components/global/BaseButton.vue";

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const success = await auth.login(email.value, password.value)
    if (success) {
      await router.push('/students')
      await Swal.fire('Login correcto', '', 'success')
    }
  } catch (err) {
    await Swal.fire('Error', 'Credenciales incorrectas', 'error')
  }
}
</script>
<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-100">
    <form
        @submit.prevent="handleLogin"
        class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 cursor-pointer"
    >
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
      <div>
        <label class="block text-gray-700 text-left mb-1" for="email">Email</label>
        <input
            v-model="email"
            id="email"
            type="email"
            required
            class="w-full px-3 py-2 border border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-gray-700 text-left mb-1" for="password">Password</label>
        <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full px-3 py-2 border border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <BaseButton
          type="submit"
          class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Login
      </BaseButton>
    </form>
  </div>
</template>