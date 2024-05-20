<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from './supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Create">Create</RouterLink>
        <RouterLink to="/Profile">Profile</RouterLink>
        <RouterLink to="/LogIn">LogIn</RouterLink>
      </nav>
  </div>
  <router-view>
    
  </router-view>  
</template>