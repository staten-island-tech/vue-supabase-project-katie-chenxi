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

const handleSubmit= async () => {
  try{
    loading.value = true
    const {user, session, error}  = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options:{
        data: {
          name: name.value
        }
      }
    
    });
    if (error) {
      console.log(error)
    } else{
      store.user = user;
      //router.push({path: '/Profile'})
      console.log("Succesful: ", user)
      showLogin.value = true;
    }
  } catch (error) {
    console.error('Error signing up:', error);
  } finally {
    loading.value = false;
  }
}

async function login() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error)
	{
		console.log(error);
	}
	else
	{
		console.log(data);
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
   <div v-if="showLogin">
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
<div v-else>
  <form @submit.prevent="handleSubmit">
    <h1>Register</h1>
    <label>Email <input v-model="form.email" required type="email" class="form"/></label>
    <label>Password <input v-model="form.password" required type="password" class="form"/></label>
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

