<template>
  <div>
    <form @submit.prevent="postSubmit" enctype='multipart/form-data'>
      <h1>Create Post</h1>
      <label>Title: <input v-model="title" required type="text" /></label>
      <label>Description: <input v-model="description" required type="text" /></label>
      <label>Video:<input name="video" type="file" /></label>
      <div>
        <input type="submit" class="button block" />
      </div>
    </form>
    <div>
    <h3>Please wait a few seconds for your post to upload!</h3>
  </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { supabase } from '../supabase.js'
  import { ref } from 'vue'
  
  const title = ref('')
  const description = ref('')
  
  const postSubmit = async (event: any) => {
    try {
      event.preventDefault()
      const tableName = 'posts'
      if (event.target.video.files.length > 0) {
        const file = event.target.video.files[0]
        await supabase.storage.from('videos').upload(file.name, file, {
          cacheControl: '3600',
          upsert: false,
        })
        async function postData(videoName: string) {
          const dataToPost = {
            description: description.value,
            title: title.value,
            video_name: videoName,
            };
          await supabase.from(tableName).upsert([dataToPost]);
          console.log('File name:', file.name);
          console.log('Posted!');
        }
        postData(file.name);
        console.log('Posted!')
      } else {
        console.error('No file selected.')
      }
    } catch (error) {
      console.error('Error posting, sorry.')
    }
  }
  </script>

  <style scoped>
  h3 {
    display: inline-block;
  }
  label {
    margin: 1em;
  }
</style>