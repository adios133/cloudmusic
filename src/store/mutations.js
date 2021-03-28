export default {
  setUid(state,payload) {
    state.userId = payload
  },
  // 将播放列表存在state中
  setPlaylist(state,payload) {
    state.playlist = payload
  },

  // 设置正在播放的音乐信息
  setPlaying(state,payload) {
    state.playing = payload
  },
  // 设置播放状态
  setState(state,payload) {
    state.isplay = payload
  },
  // 设置播放顺序
  setOrder(state,payload) {
    state.playorder = payload
  },
  // 改变当前歌词行
  setLine(state,payload) {
    state.currentLine = payload
  },
  // 设置是否是fm界面，不然从fm返回从下面的点击进入会返回到playing界面
  setFm(state,payload) {
    state.isFm = payload
  },
  setVolume(state,payload) {
    state.volume = payload
  },
  setLastestVol(state,payload) {
    state.lastestVol = payload
  },
}


