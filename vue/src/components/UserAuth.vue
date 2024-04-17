<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')
const password = ref('')
const first_name = ref('')

async function signUp(){
  try {
    loading.value = true
    const { user, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: first_name.value,
        age: 15,
      }
    },
  })
  if (!error) {
  console.log('User signed up successfully:');
  }
    if (error) {
      console.log(error)
    } else {
      console.log(user)
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

async function login(){
  console.log("working")
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
})
if(error){
  console.log(error)
}else{
  console.log(data)
};
}

async function view() {
	const localUser = await supabase.auth.getSession();
	console.log(localUser.data.session)
}

async function logout() {
  const { error } = await supabase.auth.signOut()

  if(error){
    console.log(error)
  }else{
    console.log("signed out!!!")
  }
}
</script>

<template>
  <main class="bg">
  <div class="container">
    <label for="email"> Email: </label>
		<input type="email" id="email" v-model="email">
    
	<div class="inputContainer">
		<label for="email"> Password: </label>
		<input type="password" id="password" v-model="password">
	</div>

	<div class="inputContainer">
		<label for="firstName"> First Name </label>
		<input type="firstName" id="firstName" v-model="first_name">
  </div>
  <div class="buttons">
		<button @click="login"> Login </button>
    <button @click="signUp"> Sign Up </button>
		<button @click="view"> See user </button>
		<button @click="logout"> Logout </button>
	</div>
</div>
</main>
</template>

<style scoped>
.container{
  display: flex;
}

</style>