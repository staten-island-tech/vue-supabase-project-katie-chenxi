<template>
  <div class="main">
    <h1>Posts</h1>
    <button @click="sortByLikes">Most Liked</button>
    <button @click="sortByRecent">Most Recent</button>
    <button @click="sortByOldest">Oldest</button>
    <p>Total Likes Across All Posts: {{ allLikes }}</p>
    <div class='postCard'v-for="post in sortedPosts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <h3>Created by user: {{ post.user_name }}</h3>
      <video controls :src="post.videoUrl ?? undefined"></video>
      <p>Likes: {{ post.likes }}</p>
      <button type="button" @click="incrementLikes(post)">Like</button>
      <button type="button" @click="incrementLikesNeg(post)">Dislike</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../supabase.js'
import { ref, onMounted } from 'vue'

async function totalLikes() {
  try {
    const { data } = await supabase.from('total_likes_view').select('*');
    return data[0].total_likes;
  } catch (error) {
    console.error('Error fetching total likes:', error);
    return 0;
  }
}
const allLikes = ref(0);
onMounted(async () => {
  allLikes.value = await totalLikes();
});

const posts = ref<{ id: number; title: string; description: string; video_name: string; videoUrl: string | null; likes: number; user_id: string; user_name: string }[]>([]);
const sortedPosts = ref(posts);

const fetchPosts = async () => {
  try {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      throw new Error(error.message);
    }
    posts.value = data.map(post => ({ ...post, videoUrl: null }));
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

const incrementLikesNeg = async (post: any) => {
  try {
    const { error } = await supabase.from('posts').update({ likes: post.likes - 1 }).eq('id', post.id);
    if (error) {
      throw new Error(error.message);
    }
    post.likes--;
  } catch (error) {
    console.error('Error updating like count:', error);
  }
}

const sortByLikes = () => {
  sortedPosts.value = [...posts.value].sort((a, b) => b.likes - a.likes);
}

const sortByRecent = () => {
  sortedPosts.value = [...posts.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

const sortByOldest = () => {
  sortedPosts.value = [...posts.value].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
}


onMounted(() => {
  fetchPosts();
});

const getVideoUrl = async (videoName: string) => {
  const { data, error } = await supabase.storage.from('videos').getPublicUrl(`${videoName}`, 60);
  if (error) {
    console.error('Error getting video URL:', error.message);
    return null;
  }
  return data?.publicUrl || null;
}
</script>

<style scoped>
video {
  width: 60%;
  display: block;
  margin: 0 auto;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 20px;
}
button {
  margin: 0.5em;
}

div {
  margin: 4em;
}
p {
  font-size: 20px;
}
.postCard {
  background-color: rgb(231, 180, 187);
  width: 60%;
  margin: 0 auto;
  margin-top: 3em;
  border-radius: 40px;
  padding: 1em;
}
</style>