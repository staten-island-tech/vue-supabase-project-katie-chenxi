<script setup>
import UserLogin from '../components/UserLogin.vue'
</script>

<template>
	<h2>Log In</h2>
	<UserLogin></UserLogin>
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