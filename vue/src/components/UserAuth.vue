<script setup>
import { supabase } from '../supabase.js'
import { ref } from 'vue'

const loading = ref(false)

const email = ref('')
const password = ref('')
const name = ref('')

const handleSubmit= async () => {
  try{
    loading.value = true
    const user  = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options:{
        data: {
          name: name.value
        }
      }
    
    })

    await supabase
      .from('profiles')
      .insert({ password: password.value, email: email.value})
     console.log("Succesful: ", user)
  } catch (error) {
    console.error('Error signing up:', user.message);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Register</h1>
    <label>Email <input v-model="email" required type="email" /></label>
    <label>Password <input v-model="password" required type="password" /></label>
    <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Sign Up'"
          :disabled="loading"
        />
      </div>
  </form>
</template>

