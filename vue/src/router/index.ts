import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      beforeEnter: (to) => {
        const authStore = useAuthStore();
        const isAuthenticated = authStore.isAuthenticated;

        if (!isAuthenticated && to.name !== "login-adm") {
          return { name: "login-adm" };
        }
      }
    },
    {
      path: '/Create',
      name: 'Create',
      component: () => import('../views/CreatePost.vue')
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: () => import('../views/UserLogin.vue')
    },
 ]
})

export default router
