<script setup>
import UserAuth from '../components/UserAuth.vue'
import UserLogin from '../components/UserLogin.vue'
</script>

<template>
    <UserAuth></UserAuth>
    <div class="buttonContainer">
		<button @click={UserAuth}> Create </button>
		<button @click={UserLogin}> Login </button>
	</div>
</template>

<style scoped>
.buttonContainer {
	display: flex;
	flex-direction: column;
	margin-top: 1em;
}

button {
	margin-bottom: 1em;
	padding: 1em 2em 1em 2em;
}
</style>