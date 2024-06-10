<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from './supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session
  })
})

</script>

<template>
  <header>
  <div >
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Create">Create</RouterLink>
        <RouterLink to="/Profile">Profile</RouterLink>
        <RouterLink to="/LogIn">Log In</RouterLink>
      </nav>
  </div>
</header>
  <router-view>
    
  </router-view>  

</template>

<style scoped>
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #f1bec5;
  display: flex;
  padding: 0.8rem;
  justify-content: space-between;
  align-items: center;
  color: #6d1734;
}
nav a {
  padding: 0 1.5rem;
  text-decoration: none;
  color: #7e2744;
  font-size: 18px;
  position: relative;
  user-select: none;
  font-size: 20px;
  cursor: pointer;
  margin: 0 20px;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: rgb(136, 69, 86);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>../supabase