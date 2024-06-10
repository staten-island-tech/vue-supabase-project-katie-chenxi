<template>
    <div class="main">
      <UserProfile></UserProfile>
      <UserAccount></UserAccount>
      <UserPosts></UserPosts>
    </div>
  </template>
  
  <script setup>
  import { supabase } from '../supabase.js'
  import UserProfile from '../components/UserProfile.vue'
  import UserAccount from '../components/UserAccount.vue'
  import UserPosts from '../components/UserPosts.vue'
  import { onMounted } from 'vue'

  </script>

  <style scoped>
  .main {
    width: 50%;
    align-items: center;
    margin: 0 auto;
    padding: 2em;
  }
</style>../../supabase.js