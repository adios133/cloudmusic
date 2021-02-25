import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './mutations'
import getters from './getters'

Vue.use(Vuex)
const state = {
  userId:''
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
