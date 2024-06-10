<template>
<div>
    <h1>Your Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <video controls :src="post.videoUrl ?? undefined"></video>
      <button @click="handleDelete(post.id)">Delete</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { supabase } from '../supabase'
import { ref, onMounted } from 'vue'

const posts = ref<{ id: number; title: string; description: string; video_name: string; videoUrl: string | null; likes: number; user_id: string; user_name: string }[]>([]);

onMounted(() => {
  fetchPosts();
}); 
const fetchPosts = async () => {
  try {
    const user = await supabase.auth.getUser();
    if (user?.data?.user) {
      const userId = user.data.user.id;
      const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId);
      if (error) {
        throw new Error(error.message);
      }
      posts.value = data.map(post => ({ ...post, videoUrl: null }));
      for (const post of posts.value) {
        post.videoUrl = await getVideoUrl(post.video_name);
      }
    } else {
      console.error('User data is null or undefined.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
const handleDelete = async (postId: number) => {
  try {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) {
      throw new Error(error.message);
    }
    posts.value = posts.value.filter(post => post.id !== postId);
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
const getVideoUrl = async (videoName: string) => {
  const { data } = await supabase.storage.from('videos').getPublicUrl(`${videoName}`);
  return data?.publicUrl || null;
}
</script>

<style scoped>
video {
  width: 40%;
  display: block;
  margin: 0 auto;
}

</style>
