<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const { isAuthenticated } = authStore;
const loading = ref(false)
const email = ref('')
const password = ref('')

async function login() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error)
	{
		console.log(error);
	}
    loading.value = false;
}

async function seeUser() {
	const localUser = await supabase.auth.getSession();
	console.log(localUser.data.session)
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
  <div v-if="isAuthenticated">User is authenticated!</div>
  <div v-else>Not authenticated.</div>
  <form class="row flex-center flex" @submit.prevent="login">
    <div class="col-6 form-widget">
      <h1 class="header">Sign in</h1>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
        <input class="inputField" required type="password" placeholder="Your password" v-model="password" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'doing it'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>