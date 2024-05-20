<script setup>
import UserAuth from '../components/UserAuth.vue'
</script>

<template>
	<h2>Log In</h2>
	<UserAuth></UserAuth>
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