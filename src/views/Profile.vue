<script setup>

import Profile from "../components/Profile/Profile.vue"
import {useAuthStore} from "../store/auth.js";
const auth = useAuthStore()
console.log(auth.user)

</script>

<template>

  <Profile :user="auth.user" />

</template>

<style scoped>

</style>