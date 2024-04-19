<template>
  <div>
      <div>
      <form @submit.prevent="createWorkout" >
          <h1>Generate Day</h1>
          <div>
              <label for="workout-name"> Workout Day </label>

              <input 
              type="text"
              required
              id="workout-name"
              v-model="workoutName">
          </div>

          <div class="flex-col">
              <label for="workout-day"> Date</label>

              <input 
              type="date"
              required
              id="workout-name"
              v-model="workoutDay">
          </div>

          <div class="flex flex-col flex-wrap " >
              <label for="add-workout"> Add excersises</label>

              <input 
              type="text"
              required
              id="add-workout"
              v-model="excersises">

              <button type="button">Save Excersises</button>
          </div>

          <button type="submit">Save</button>
      </form>

      </div>
  </div>
</template>

<script>
import {ref, computed} from "vue"
import { supabase } from '../supabase'
export default {
  name: 'Generate',
  setup() {
      const workoutName = ref('')
      const workoutDay = ref('')
      const excersises = ref([])
      const statusMsg = ref(null)
      const errorMsg = ref(null)
      const user = computed(() =>store.state.user)

      const createWorkout = async () => {
          try{
              const {error} = await supabase.from ("activity").insert([
                  {
                      workoutName: workoutName.value,
                      workoutDay: workoutDay.value,
                      excersises: excersises.value
                  }
              ])
              if (error) throw error
              statusMsg.value = "Day Created"
              workoutName.value= null
              workoutDay.value= null
              excersises.value = null

          }catch(error){
              errorMsg.value = `Error: ${error.message}`
              setTimeout(() =>{
                  errorMsg.value = false
                  },5000)
          }
      }

  return{createWorkout, workoutName, workoutDay, excersises, statusMsg, errorMsg}
  }
}
</script>