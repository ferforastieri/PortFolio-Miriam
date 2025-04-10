import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import LoginForm from '../components/LoginForm.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
    meta: {
      requiresGuest: true // Apenas usuários não logados podem acessar
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      requiresAuth: true // Requer autenticação
    }
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