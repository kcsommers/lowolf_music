import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import Checkout from './views/Checkout.vue'
import AdminLogin from './views/AdminLogin.vue'
import AdminPage from './views/AdminPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/admin',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/admin-page',
      name: 'admin-page',
      component: AdminPage
    }
  ]
})
