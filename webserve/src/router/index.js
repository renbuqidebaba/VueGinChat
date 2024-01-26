import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/RealHome',
    name: 'RealHome',
    component: ()=>import('../views/RealHome')
  },
  {
    path: '/Login',
    name: 'Login',
    component: ()=>import('../views/back/Login')
  },
  {
    path: '/Chating',
    name: 'Chating',
    component: ()=>import('../views/back/Chating')
  },
  {
    path: '/Dynamics',
    name: 'Dynamics',
    component: ()=>import('../views/back/Dynamics')
  },
  {
    path: '/Star',
    name: 'Star',
    component: ()=>import('../views/back/Star')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
