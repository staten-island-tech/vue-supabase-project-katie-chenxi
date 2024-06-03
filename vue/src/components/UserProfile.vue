<template>
<button class="button block" @click="logout" :disabled="loading">Sign Out</button>
</template>

<script setup>
//import { useEffect, useState } from 'react'
import { onMounted, ref, toRefs } from 'vue'
import { useAuthStore } from "@/stores/authStore";

const loading = ref(false)

const store = useAuthStore()
async function logout() {
  loading.value = true
  store.signOut();
  loading.value = false
}

</script>

<style scoped>
</style>