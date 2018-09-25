import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import Checkout from './views/Checkout.vue'
import AdminLogin from './views/AdminLogin.vue'
import AdminPage from './views/AdminPage.vue'
import CalendarPage from './views/CalendarPage.vue'

Vue.use(Router)

const router = new Router({
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
      component: Checkout,
      props(route) {
        return {cart: route.query.cart}
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarPage
    },
    {
      path: '/admin',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/admin-page',
      name: 'admin-page',
      component: AdminPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'));
    if(authUser && authUser.token) {
      next();
    }
    else {
      next({name: 'admin-login'});
    }
  }
  next();
});

export {router};
