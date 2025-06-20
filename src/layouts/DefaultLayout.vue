<script setup>
import { ref } from 'vue'
import {useRouter} from "vue-router";
import {useAuthStore} from "../store/auth.js";
const auth = useAuthStore()
const router = useRouter()

const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
const closeSidebar = () => {
  showSidebar.value = false
}

const logout = async () => {
  try {
    await auth.logout();
    await router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
</script>

<style scoped>
/* opcional: cerrar el sidebar al hacer clic fuera en mobile */
@media (min-width: 768px) {
  aside {
    position: static !important;
    height: auto !important;
  }
}
</style>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 flex items-center justify-between">
      <button class="md:hidden" @click="toggleSidebar">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 class="text-xl font-semibold">Dashboard</h1>
      <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
        Cerrar sesión
      </button>
    </header>

    <!-- Layout body -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside
          :class="[
          'bg-gray-100 w-64 p-4 md:block transition-all duration-300 z-10',
          showSidebar ? 'block absolute h-full left-0 top-0 shadow-md' : 'hidden'
        ]"
          @click.outside="closeSidebar"
      >
        <nav class="space-y-2">
          <RouterLink to="/students" class="block p-2 rounded hover:bg-gray-200">
            Estudiantes
          </RouterLink>
          <RouterLink to="/profile" class="block p-2 rounded hover:bg-gray-200">
            Perfil
          </RouterLink>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-4 bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>
