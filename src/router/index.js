import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/admin/LoginView.vue'
import InstagramStats from '../views/admin/InstagramStats.vue'
import Admin from '../views/admin/Admin.vue'
import Screens from '../views/admin/Screens.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresGuest: true,
      layout: 'LoginLayout'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/instagram',
    name: 'InstagramStats',
    component: InstagramStats,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/screens',
    name: 'Screens',
    component: Screens,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegação
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !currentUser) {
    // Se a rota requer autenticação e o usuário não está logado
    next('/login')
  } else if (requiresGuest && currentUser) {
    // Se a rota é para visitantes (como login) e o usuário já está logado
    next('/admin')
  } else {
    next()
  }
})

export default router 