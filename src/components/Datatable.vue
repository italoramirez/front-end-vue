<script setup>
const emit = defineEmits(['view', 'edit', 'delete'])
defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <table class="min-w-full border border-gray-300 rounded">
    <thead class="bg-gray-100">
    <tr>
      <th v-for="col in columns" :key="col.field" class="px-4 py-2 text-left text-black">
        {{ col.label }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, idx) in rows" :key="idx" class="border-t">
      <td v-for="col in columns" :key="col.field" class="px-4 py-2 text-black">
        {{ row[col.field] }}
      </td>
      <td class="px-1 py-0 space-x-2">
        <button @click="emit('view', row)" class="text-blue-600 hover:underline text-sm">Ver</button>
        <button @click="emit('edit', row)" class="text-yellow-600 hover:underline text-sm">Editar</button>
        <button @click="emit('delete', row)" class="text-red-600 hover:underline text-sm">Eliminar</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>