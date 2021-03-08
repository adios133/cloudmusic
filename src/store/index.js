import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './mutations'
import getters from './getters'

Vue.use(Vuex)
const state = {
  userId:'',
  playlist:null,
  playing:null,
  isplay:false,
  playorder:'list',
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
