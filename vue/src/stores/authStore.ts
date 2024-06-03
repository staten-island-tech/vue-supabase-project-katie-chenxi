// authStore.js
import { defineStore } from "pinia";
import { supabase } from '../supabase.js'
import {ref} from 'vue'

export const useAuthStore = defineStore('auth', () => {
  let user = ref(null)

  const fetchUser = async () => {
      const currentUser = await supabase.auth.user();
      if (currentUser) {
        user.value = currentUser;
      }
 }
 const signUp = async (email, password) => {
   const { user, error} = await supabase.auth.signUp({
     email,
     password,
   },

   )
   if (error) {
    console.error(error.message)
  } else{

    console.log("Succesful: ", user)
  }
 }
 const signIn = async (email, password) => {
   const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
   })
   if (error) {
    console.log(error.message);
   } else {
    user = data;
    console.log("Succesful: ", user)
   }
 }
 const signOut = async () => {
   await supabase.auth.signOut();
   user = null;
 }

 const getUsername = async () => {
  if (!user.value) {
    // Return null if the user is not logged in
    return null;
  }
  const { data, error } = await supabase
    .from("profile")
    .select("id")
    .eq("email", user.email)
    .single();
  if (error) {
    // Return null if there was an error fetching the username
    return null;
  } else {
    // Return the username
    return data.id;
  }
}

return { user, fetchUser, signUp, signIn, signOut, getUsername }
})
