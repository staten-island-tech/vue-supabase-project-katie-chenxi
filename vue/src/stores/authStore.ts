// authStore.js
import { defineStore } from "pinia";

interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
  actions: {
    loadUser() {
      this.user = supabase.auth.user(); 
    },
    clearUser() {
      this.user = null;
    }
    },
    getters: {
      isAuthenticated(state) {
        return !!state.user;
      }
    }
})

interface UserInfo {
  name: string
  age: number
}
    

/* 
export const u = defineStore("AuthStore", {
  state: () => ({
   isAuthenticated: false,
  }),
});
     */
    
   /*  interface UserInfo {
      password: string
      email: string
    }

 */