<script setup lang="ts">
function warn(message, event){
  if (event){
    event.preventDefault()
  }
  alert(message)
}
</script>

<template>
  <main>
    <form> 
    <h2 class="label-wrapper">
    <label for="new-todo-input"
    class="label_lg">user input maybe</label>
    </h2>
    <input type="text"
    id="new-todo-input"
    autocomplete="off"
    trim="label"
    class="input_lg"/>
    <button type="submit" class="btn btn_primary btn_lg" @click="warn('testing', $event)">Add</button>
<!-- can alert if set password is too short -->
  </form>
  </main>


</template>

<style>
h2{
  background-color: pink;
}
</style>