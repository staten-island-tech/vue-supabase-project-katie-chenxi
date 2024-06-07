<template>
    <div>
      <h2>Dashboard</h2>
      <p>Average Likes: {{ formattedAverageLikes }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  
  const averageLikes = ref(5.75); 
  
  const formattedAverageLikes = computed(() => {
    return averageLikes.value.toFixed(2); 
  });
  
  watch(averageLikes, (newVal) => {
    console.log('Average likes updated:', newVal);
  });
  </script>