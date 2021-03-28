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
  playorder:'list',   // 播放方式
  currentLine:0,   //记录歌词
  isFm:false,
  volume:0.5, //音量
  lastestVol:0//控制静音，记录上次音量
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
