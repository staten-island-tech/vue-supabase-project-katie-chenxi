// authStore.js
import { defineStore } from "pinia";
import { supabase } from '../supabase.js'
import { useRouter } from 'vue-router';
import {ref} from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const usersname = ref(null)
  const router = useRouter();

  const fetchUser = async () => {
      const currentUser = await supabase.auth.getUser();
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
 const signIn = async (email, password, username) => {
   const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    data:{
      username
    }
   })
   if (error) {
    console.log(error.message);
   } else {
    user.value = data;
    usersname.value = data.username
    console.log("Succesful: ", user, usersname)
   }
 }
 const signOut = async () => {
  const { error } = await supabase.auth.signOut();
   user.value = null;
   if (error) {
    console.log(error.message);
   } else {
    console.log("Succesful: ", user)
    router.push('/login');
   }
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
    console.error(error.message);
    // Return null if there was an error fetching the username
    return null;
  } else {
    // Return the username
    return data.id;
  }
}

return { user, fetchUser, signUp, signIn, signOut, getUsername }
})
