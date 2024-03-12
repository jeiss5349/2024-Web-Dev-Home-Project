import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/friend-activity',
      name: 'Friend Activity',
      component: () => import('../views/FriendActivityView.vue')
    }
  ]
})

export default router
