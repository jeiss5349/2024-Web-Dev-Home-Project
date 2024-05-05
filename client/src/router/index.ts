import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/current-user',
      name: 'Current User',
      component: () => import('../views/CurrentUserView.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/friend-request',
      name: 'FriendRequest',
      component: () => import('../views/FriendRequests.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/friend-activity',
      name: 'Friend Activity',
      component: () => import('../views/FriendActivityView.vue')
    }
  ]
})

export default router
