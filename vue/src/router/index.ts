import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const store = useAuthStore();

        if (store.user) {
          next();
        } else {
          next('/LogIn');
        }
      } 
    },
    {
      path: '/Create',
      name: 'Create',
      component: () => import('../views/CreatePost.vue'),
      meta: { requireLogin: true }
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requireLogin: true }
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: () => import('../views/LoginView.vue')
    },
 ]

});

 router.beforeEach((to,from,next)=> {
  const store = useAuthStore();
  if (to.matched.some(r => r.meta.requireLogin) && !store.user) {
    if (to.path !== '/Login') {
      next('/Login'); // Redirect to login only if not already on the login page
    } else {
      next(); 
    }
 } else {
    next(); // Proceed with the navigation
  } 
});


export default router
