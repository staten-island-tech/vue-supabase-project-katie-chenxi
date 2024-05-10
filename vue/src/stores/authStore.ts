// authStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
        // for initially empty lists
      userList: [] as UserInfo[],
        // for data that is not yet loaded
      user: null as UserInfo | null,
    }
  },
});
    


export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
   isAuthenticated: false,
  }),
});
    
    
    interface UserInfo {
      password: string
      email: string
    }

