import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
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
      component: () => import('../views/LoginView.vue')
    },
 ]

});

 router.beforeEach((to,from,next)=> {
  const auth = useAuthStore();
  if (to.matched.some(r => r.meta.requireLogin) && auth.user === null) {
    if (to.path !== '/Login') {
      next('/Login'); // Redirect to login only if not already on the login page
    } else {
      next(); // Allow navigation to the login page
    }
  } else {
    next(); // Proceed with the navigation
  }
});

/* router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
   */
export default router
