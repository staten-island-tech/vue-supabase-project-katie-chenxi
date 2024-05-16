<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const { isAuthenticated } = authStore;
const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try { 
    const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  })

    if (error) throw error
    alert('Logged In!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}


</script>

<template>
  <div v-if="isAuthenticated">User is authenticated!</div>
  <div v-else>Not authenticated.</div>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Sign in</h1>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>