<script setup >


defineProps({
  user: {
    type: Array,
    required: true
  }
})




</script>

<template>
  <div class="max-w-3xl mx-auto mt-12">
    <!-- Loading -->
    <div v-if="loading" class="text-center text-blue-600 text-lg font-semibold">
      Cargando perfil...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 text-lg font-semibold">
      {{ error }}
    </div>

    <!-- User Profile -->
    <div v-else-if="user" class="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
      <!-- Avatar -->
      <div class="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600 font-bold mb-6">
        {{ user.name.charAt(0).toUpperCase() }}
      </div>

      <!-- User Info -->
      <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ user.name }} {{ user.lastname }}</h2>
      <p class="text-gray-600 mb-1"><strong>Email:</strong> {{ user.email }}</p>
      <p class="text-gray-600 mb-1"><strong>Rol:</strong> {{ user.role || 'Usuario' }}</p>
      <p class="text-gray-600 mb-1"><strong>Documento:</strong> {{ user.document }}</p>

      <!-- Optional: Edit button -->
      <div class="mt-6">
        <button
            @click="goToEdit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Editar Perfil
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>