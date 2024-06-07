<script setup lang="ts">
import CreatePost from '../components/Create.vue'
</script>

<template>
    <CreatePost></CreatePost>
</template>
const title = ref('')
const description = ref('')

const handleSubmit = async (event: any) => {
  try {
    event.preventDefault();
    const tableName = 'posts';
    if (event.target.video.files.length > 0) {
      const file = event.target.video.files[0];
      const { data, error } = await supabase.storage.from('videos').upload('videos/', file)
      if (error) {
        console.log(error)
      } else {
        console.log(data)
      }
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
    } else {
      console.error('No file selected.');
    }
  } catch (error) {
    console.error('Error posting, sorry.');
  }
}
</script>
