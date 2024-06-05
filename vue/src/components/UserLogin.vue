<script src="three.r134.min.js"></script>
<script src="vanta.birds.min.js"></script>
<script>
VANTA.BIRDS({
  el: "#your-element-selector",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00
})
</script>
<script setup>
import BIRDS from 'vanta/dist/vanta.birds.min'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

export default {
  mounted() {
    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef
    })
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
}

import { ref } from 'vue'
import { supabase } from '../supabase'
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const { isAuthenticated } = authStore;
const loading = ref(false)
const email = ref('')
const password = ref('')

async function login() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error)
	{
		console.log(error);
	}
	else
	{
		console.log(data);
	}
    loading.value = false;
}

async function seeUser() {
	const localUser = await supabase.auth.getSession();
	console.log(localUser.data.session)
}

async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log(error);
	}
	else {
		console.log("Sign out success")
	}
}


</script>

<template>
	<div ref='vantaRef'>
    Foreground content here
  </div>
  <div v-if="isAuthenticated">User is authenticated!</div>
  <div v-else>Not authenticated.</div>
  <form class="row flex-center flex" @submit.prevent="login">
    <div class="col-6 form-widget">
      <h1 class="header">Sign in</h1>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
        <input class="inputField" required type="password" placeholder="Your password" v-model="password" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'doing it'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>