export default {
  setUid(state,payload) {
    state.userId = payload
  },
  // 将播放列表存在state中
  setPlaylist(state,payload) {
    state.playlist = payload
  },

  // 
  setPlaying(state,payload) {
    state.playing = payload
  },

  setState(state,payload) {
    state.isplay = payload
  },
  setOrder(state,payload) {
    state.playorder = payload
  }
}


