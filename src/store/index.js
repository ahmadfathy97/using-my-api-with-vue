import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: 'https://tiny-blog-api.herokuapp.com/api'
    // api: 'http://127.0.0.1:3000/api'
  },
  getters:{
    api: state => state.api
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
