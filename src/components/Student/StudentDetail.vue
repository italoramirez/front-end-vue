<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../store/auth.js'

const route = useRoute()
const auth = useAuthStore()
const apiUrl = import.meta.env.VITE_API_URL

const student = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`${apiUrl}/students/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      }
    })

    if (res.ok) {
      const result = await res.json()
      student.value = result.data
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto mt-12">
    <!-- Loading -->
    <div v-if="loading" class="text-center text-blue-600 text-lg font-semibold">
      Cargando información del estudiante...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 text-lg font-semibold">
      {{ error }}
    </div>

    <!-- Student Details -->
    <div v-else-if="student" class="bg-white shadow-lg rounded-xl p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Detalle del Estudiante</h2>

      <div class="space-y-4 text-gray-700">
        <p><span class="font-semibold">Nombre:</span> {{ student.name }}</p>
        <p><span class="font-semibold">Apellidos:</span> {{ student.lastname }}</p>
        <p><span class="font-semibold">Documento:</span> {{ student.document }}</p>
        <p><span class="font-semibold">Edad:</span> {{ student.age }}</p>
        <p><span class="font-semibold">Curso:</span> {{ student.course }}</p>
      </div>

      <div class="mt-6 text-right">
        <router-link to="/" class="text-blue-600 hover:underline text-sm">
          ← Volver a la lista
        </router-link>
      </div>
    </div>
  </div>
</template>

