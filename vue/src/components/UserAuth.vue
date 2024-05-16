<script setup>
import { storeToRefs } from 'pinia';
import { supabase } from '../supabase.js'
import { ref } from 'vue'


const loading = ref(false)

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
      router.push({path: '/'})
      console.log("Succesful: ", user)
    }
  } catch (error) {
    console.error('Error signing up:', error);
  } finally {
    loading.value = false;
  }
}


</script>

<template>
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
</template>

