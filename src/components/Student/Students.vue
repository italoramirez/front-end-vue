<script setup>

import {onMounted, ref} from 'vue'
import {reactive} from "vue";
import Datatable from "../Datatable.vue";
import BaseButton from "../global/BaseButton.vue";
import router from "../../router/router.js";
import {useAuthStore} from "../../store/auth.js";

const apiUrl = import.meta.env.VITE_API_URL
const auth = useAuthStore()

const student = reactive({
  name: '',
  lastname: '',
  document: '',
  course: '',
  id: null,
})

const columns = reactive([
  {field: 'name', label: 'Nombres'},
  {field: 'lastname', label: 'Apellidos'},
  {field: 'document', label: 'Documento'},
  {field: 'age', label: 'Edad'},
  {field: 'course', label: 'Curso'},
  {field: 'actions', label: 'Acciones'}
]);

const data = ref([])

const handleSubmit = async (event) => {
  event.preventDefault();

  const method = student.id ? 'PUT' : 'POST';
  const url = student.id
      ? `${apiUrl}/students/${student.id}`
      : `${apiUrl}/students`;

  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`
    },
    body: JSON.stringify(student)
  })
  await allStudents();
  console.log('Estudiante procesado:', student);
  clearForm();
}


const handleEdit = (row) => {
  Object.assign(student, {
    name: row.name || '',
    lastname: row.lastname || '',
    document: row.document || '',
    age: row.age || '',
    course: row.course || '',
    id: row.id || null
  });
}


const allStudents = async () => {
  try {
    const response = await fetch(`${apiUrl}/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      cache: 'no-store'
    });
    if (response.ok) {
      const result = await response.json();
      data.value = Array.isArray(result) ? result : result.data;
    }
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

const handleView = (row) => {
  if (!row?.id) {
    console.warn('ID del estudiante no disponible.');
    return;
  }

  router.push({
    name: 'StudentDetail',
    params: { id: row.id }
  });
};
const handleDelete = async (row) => {
  if (confirm('Are you sure you want to delete this student?')) {
    await fetch(`${apiUrl}/students/${row.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
    await allStudents()
  }
}

const clearForm = () => {
  student.name = ''
  student.lastname = ''
  student.document = ''
  student.course = ''
  student.age = ''
}


onMounted(async () => {
  await allStudents()
})

</script>

<template>

  <div class="max-w-5xl mx-auto mt-10 space-y-8">
    <form
        @submit.prevent="handleSubmit"
        class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-6">
      <div>
        <label class="block text-gray-700 text-left font-bold mb-2" for="name">Nombres</label>
        <input
            id="name"
            name="name"
            v-model="student.name"
            class="w-full px-3 py-2 text-black border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            required
        >
      </div>
      <div>
        <label class="block text-gray-700 text-left font-bold mb-2" for="lastname">Apellidos</label>
        <input
            id="lastname"
            name="lastname"
            v-model="student.lastname"
            class="w-full px-3 py-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            required
        >
      </div>
      <div>
        <label class="block text-gray-700 text-left font-bold mb-2" for="document">Documento</label>
        <input
            v-model="student.document"
            id="document"
            name="document"
            class="w-full px-3 py-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            required
        >
      </div>
      <div>
        <label class="block text-gray-700 text-left font-bold mb-2" for="document">Edad</label>
        <input
            v-model="student.age"
            id="age"
            name="age"
            class="w-full px-3 py-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            required
        >
      </div>
      <div>
        <label class="block text-gray-700 text-black text-left font-bold mb-2" for="course">Curso</label>
        <input
            v-model="student.course"
            id="course"
            name="course"
            class="w-full px-3 py-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            required
        >
      </div>
      <BaseButton
          type="submit"
          class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Registrar Estudiante
      </BaseButton>
    </form>

    <div class="p-6 bg-white rounded-lg shadow-md">
      <Datatable
          :columns="columns"
          :rows="data"
          @view="handleView"
          @edit="handleEdit"
          @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>

</style>