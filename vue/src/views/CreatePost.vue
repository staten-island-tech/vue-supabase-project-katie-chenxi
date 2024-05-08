<template>
  <h1>Hi!</h1>
  <form @submit.prevent="handleSubmit">
    <h1>Create Post</h1>
    <label>Title: <input v-model="title" required type="title" /></label>
    <label>Description: <input v-model="description" required type="description" /></label>
    <div>
      <input type="submit" class="button block" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { supabase } from '../supabase.js'
import { ref } from 'vue'

const title = ref('')
const description = ref('')

const handleSubmit = async () => {
  try {
    const tableName = 'posts';

    const dataToPost = {
      description: 'description',
      title: 'title',
    };

    async function postData() {
      const { data } = await supabase.from(tableName).upsert([dataToPost]);

      console.log('Data posted successfully:', data);
    }

    postData();
  }
    catch (error) {
    console.error('Error posting:', error);
  }
}
</script>

