import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 'home'
  },
  mutations: {
    pageChange(state, payload) {
      state.page = payload.page
    }
  },
  actions: {
    changePage() {
      console.log('SET NAVE HEIGHT', this.$refs)
    }
  }
})
