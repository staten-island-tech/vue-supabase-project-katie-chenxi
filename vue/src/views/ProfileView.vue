<template>
    <div>
      <h1>Posts</h1>
      <button @click="sortByLikes">Most Liked</button>
      <button @click="sortByRecent">Most Recent</button>
      <button @click="sortByOldest">Oldest</button>
      <ul>
        <li v-for="post in sortedPosts" :key="post.id">
          <h2>{{ post.title }}</h2>
          <p>{{ post.description }}</p>
          <video controls :src="post.videoUrl"></video>
          <button type="button" @click="incrementLikes(post)">Likes: {{ post.likes }}</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { supabase } from '../supabase.js'
  import { ref, onMounted } from 'vue'
  
  const posts = ref<{ id: number; title: string; description: string; video_name: string; videoUrl: string | null; likes: number }[]>([]);
  const sortedPosts = ref(posts);
  
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        throw new Error(error.message);
      }
      posts.value = data.map(post => ({ ...post, videoUrl: null}));
      for (const post of posts.value) {
        post.videoUrl = await getVideoUrl(post.video_name);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  const incrementLikes = async (post: any) => {
    try {
      const { error } = await supabase.from('posts').update({ likes: post.likes + 1 }).eq('id', post.id);
      if (error) {
        throw new Error(error.message);
      }
      post.likes++;
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  }
  
  const sortByLikes = () => {
    sortedPosts.value = [...posts.value].sort((a, b) => b.likes - a.likes);
  }
  
  const sortByRecent = () => {
    sortedPosts.value = [...posts.value].sort((a, b) => new Date (b.created_at) - new Date (a.created_at));
  }
  
  const sortByOldest = () => {
    sortedPosts.value = [...posts.value].sort((a, b) => new Date (a.created_at) - new Date (b.created_at));
  }
  
  
  onMounted(() => {
    fetchPosts();
  });
  
  const getVideoUrl = async (videoName: string) => {
    const { data, error } = await supabase.storage.from('videos').createSignedUrl(`videos/${videoName}`, 60);
    if (error) {
      console.error('Error getting video URL:', error.message);
      return null;
    }
    return data?.signedUrl || null;
  }
  </script>
  
  <style>
  video {
    width: 50%;
  }
  </style>
