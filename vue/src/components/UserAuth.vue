<script setup>
import { supabase } from '../supabase'
import { ref, toRefs } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
});

const handleSubmit= async () => {
  try{
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })
    if (error) throw error
    alert('Signed Up!')
  } catch (error) {
    console.error('Error signing up:', error.message);
  } 
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Register</h1>
    <label>Name <input v-model="form.name" type="text" class="form" /></label>
    <label>Email <input v-model="form.email" type="email" class="form"/></label>
    <label>Password <input v-model="form.password" type="password" class="form" /></label>
    <button>Register</button>
  </form>

  
</template>

