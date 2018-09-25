import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 'home',
    navStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100px',
      alignItems: 'center',
      padding: '0 4em',
      position: 'fixed',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
      transition: 'all 0.6s ease'
    },
    logoStyle: {
      opacity: 0,
      transition: 'all 0.6s ease'
    }
  },
  mutations: {
    pageChange(state, payload) {
      if(payload.page !== 'home') {
        state.navStyle.height = '70px'
        state.navStyle.backgroundColor = '#fdf5e6'
        state.logoStyle.opacity = 1
      }
      else {
        if(window.scrollY === 0) {
          state.navStyle.height = '100px'
          state.navStyle.backgroundColor = 'rgba(0,0,0,0)'
          state.logoStyle.opacity = 0
        }
      }
      state.page = payload.page
    }
  },
  actions: {
  }
})
