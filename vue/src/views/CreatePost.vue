<template>
  <form @submit.prevent="handleSubmit">
    <h1>Create Post</h1>
    <label>Title: <input v-model="title" required type="title" /></label>
    <label>Description: <input v-model="description" required type="description" /></label>
    <label>Video:<input name="video" class="video" type="file" /></label>
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
      description: description.value,
      title: title.value,
    };

    async function postData() {
      const { data } = await supabase.from(tableName).upsert([dataToPost])
      console.log('Data posted successfully:', data);
    }
    async function postVideo() {
      const { data } = await supabase
        .storage
        .from('videos')
        .uploadToSignedUrl('videos', 'token-from-createSignedUploadUrl', File1, {
          upsert:true,
        })
      console.log('Video uploaded successfully', data)
    }
    postVideo();
    postData();
  }
  catch (error) {
    console.error('Error posting:', error);
  }
}
</script>