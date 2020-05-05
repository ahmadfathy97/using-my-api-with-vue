import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: 'https://tiny-blog-api.herokuapp.com/api'
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
