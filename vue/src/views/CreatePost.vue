<template>
  <form @submit.prevent="handleSubmit">
    <h1>Create Post</h1>
    <label>Title: <input v-model="title" required type="title" /></label>
    <label>Description: <input v-model="description" required type="description" /></label>
    <label>Video:<input name="video" @change="handleFileUpload" type="file" /></label>
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

const handleSubmit = async (event: any) => {
  try {
    const tableName = 'posts';
    const dataToPost = {
      description: description.value,
      title: title.value,
    };
    const handleFileUpload = async (event: any) => {
      const file = event.target.files[0];
      const { data, error } = await supabase.storage.from('videos').upload('videos/' + file.name, file, {
        cacheControl: '3600',
        upsert: false,
      });
    }
    const videoInTable = {
        video_name: file.name,
      };
    async function postData() {
      const { data } = await supabase.from(tableName).upsert([dataToPost, videoInTable])
      console.log('Data posted successfully:', data);
    }
    postData();
  }
  catch (error) {
    console.error('Error posting:', error);
  }
}
/* const handleFileUpload = async (event: any) => {
  const file = event.target.files[0];
  const { data, error } = await supabase.storage.from('videos').upload('videos/' + file.name, file, {
    cacheControl: '3600',
    upsert: false,
  });
  const videoInTable = {
    video_name: file.name,
  };
  const { videoToPost } = await supabase.from('posts').upsert([videoInTable])
  if (error) {
    console.error('Error uploading file:', error.message);
  } else {
    console.log('File uploaded successfully:', data);
  }
} */