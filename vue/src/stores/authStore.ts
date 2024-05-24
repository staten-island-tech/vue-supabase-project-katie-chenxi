// authStore.js
import { defineStore } from "pinia";
import { supabase } from '../supabase.js'


interface State {
  userList: UserInfo[];
  user: UserInfo | null;
  Authenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      userList: [],
      user: null,
      Authenticated: false,
    }
  },
  actions: {
    async loadUser() {
      const user = await supabase.auth.user();
      this.user = user;
      this.Authenticated = !!user;
    },
    clearUser() {
      this.user = null;
      this.Authenticated = false; 
    },

    },
    getters: {
      isAuthenticated(state) {
        return state.Authenticated;
      }
    }
})

interface UserInfo {
  name: string
  age: number
} 
