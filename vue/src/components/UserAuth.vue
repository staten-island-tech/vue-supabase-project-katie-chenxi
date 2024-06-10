<template>
  <div v-if="showLogin" class = "authCont">
   <form @submit.prevent="login">
   <h1>Log In</h1>
   <label>Email <input v-model="email" /></label>
   <label>Password <input type="password" v-model="password" /></label>
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
   <label>Email <input type = " email" v-model="email" class="form"/></label>
   <label>Password <input type="password" v-model="password" class="form"/></label>
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


<script setup>

import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '../supabase.js';

const store = useAuthStore();
const loading = ref(false);
const showLogin = ref(false);
const email = ref('');
const password = ref('');
const username = ref('')

const handleSubmit = async () => {
  loading.value = true;
  try {
    await store.signUp(email.value, password.value);
    const userData = [{ username: username.value }];
    console.log('Data to upsert:', userData);
    await supabase.from('profiles').update(userData, { returning: 'minimal' });
    await fetchUser();
  } catch (error) {
    console.error('Error upserting data:', error.message);
  } finally {
    loading.value = false;
  }
};

const login = async () => {
  loading.value = true;
  await store.signIn(email.value, password.value);
  await fetchUser();
  loading.value = false;
};

const fetchUser = async () => {
  loading.value = true;
  await store.fetchUser();
  loading.value = false;
};
</script>

<style scoped>
.authCont{
  justify-content: space-between;
  margin: 1em;
  flex-direction: column;
}
label {
  margin:1em;
}
</style>