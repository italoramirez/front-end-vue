
<script setup>
import { useAuthStore } from '../store/auth'
import BaseButton from "./global/BaseButton.vue";
import {useRouter} from "vue-router";
const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  try {
    await auth.logout();
    await router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
</script>
<template>
  <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">Mi Aplicación</h1>
    <BaseButton
        @click="logout"
        class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
    >
      Cerrar sesión
    </BaseButton>
  </header>
</template>
