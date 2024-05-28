<script setup>
import { supabase } from '../supabase.js'
import { ref } from 'vue'
import { useAuthStore } from "@/stores/authStore";

const store = useAuthStore();
const loading = ref(false)
const showLogin = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')


const username = store.fetchUser; 

const handleSubmit= async () => {
    loading.value = true
    store.signUp
}

const login= async () => {
    loading.value = true
    store.signIn
}

const fetchUser= async () => {
    loading.value = true
    store.fetchUser
}

async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log(error);
	}
	else {
		console.log("Sign out success")
	}
}


</script>

<template>
   <div v-if="showLogin" class = "authCont">
    <form @submit.prevent="login">
    <h1>Log In</h1>
    <label>Email <input v-model="email" /></label>
    <label>Password <input v-model="password" /></label>
    <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Log In'"
          :disabled="loading"
        />
      </div>
  </form>
  <button @click="showLogin = false">Don't Have An Account?</button>
</div>
<div v-else class = "authCont">
  <form @submit.prevent="handleSubmit">
    <h1>Register</h1>
    <label>Username <input v-model="username" class="form"/></label>
    <label>Email <input v-model="email" class="form"/></label>
    <label>Password <input v-model="password" class="form"/></label>
    <div>
        <input
          type="submit"
          class="button"
          :value="loading ? 'Loading' : 'Sign Up'"
          :disabled="loading"
        />
      </div>
  </form>
  <button @click="showLogin = true">Already Have an Account?</button>
</div>
</template>

<style scoped>
.authCont{
  justify-content: space-between;
  margin: 1em;
  flex-direction: column;
}
</style>