<script setup>
import { onMounted, ref } from 'vue'
import UserAccount from './components/UserAccount.vue'
import UserAuth from './components/UserAuth.vue'
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
 <!--         <RouterLink to="/LogIn">LogIn</RouterLink> -->
      </nav>
    <UserAccount v-if="session" :session="session" />
    
    <UserAuth v-else />
  </div>
</template>