<script setup>
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const  user  =  await supabase.auth.getUser()
    console.log(user)
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username`)
      .eq('id', user.data.user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const user =  await supabase.auth.getUser()
    console.log(username.value)
    const updates = {
      id: user.data.user.id,
      username: username.value,
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>

    <div>
      <input
        type="submit"
        class="button"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>
  </form>
</template>

<style scoped>
label {
  font-size: 20px;
}
</style>