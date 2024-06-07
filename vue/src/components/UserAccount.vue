<template>
  <h1>User Account</h1>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { supabase } from '../supabase.js'
import { onMounted, ref, toRefs } from 'vue'
import { defineProps } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)
const loading = ref(true)
const username = ref('')
const user = session.value.user;

onMounted(() => {
  console.log('Session data:', session.value)
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`id`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      user.id.value = data.id
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
try {
  loading.value = true
  const { user } = session.value

  const updates = {
    id: user.id,
    updated_at: new Date(),
    username: username.value,
  }

  const { error } = await supabase.from('profiles').upsert(updates)

  if (error) throw error
} catch (error) {
  alert(error.message)
} finally {
  loading.value = false
}
}
async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>