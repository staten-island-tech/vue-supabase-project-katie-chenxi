// authStore.js
import { defineStore } from "pinia";
import { supabase } from '../supabase.js'
import {ref} from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const error = ref(null)
  const showLogin = ref(false)

  const fetchUser = async () => {
      const currentUser = await supabase.auth.user();
      if (currentUser) {
        user.value = currentUser;
      }
 }
 const signUp = async (email, password) => {
   const { error } = await supabase.auth.signUp({
     email,
     password,
   },

   )
   if (error) {
    console.log(error)
  } else{

    console.log("Succesful: ", user)
    showLogin.value = true;
  }
 }
 const signIn = async (email, password) => {
   const { data, error } = await supabase.auth.signInWithPassword({
     email,
     password,
   })
   if (error) {
     error.value = error.message;
   } else {
     user.value = data;
   }
 }
 const signOut = async () => {
   await supabase.auth.signOut();
   user.value = null;
 }

 const getUsername = async () => {
  if (!user.value) {
    // Return null if the user is not logged in
    return null;
  }
  const { data, error } = await supabase
    .from("profile")
    .select("id")
    .eq("email", user.value.email)
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
