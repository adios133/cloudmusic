export const useAudio = () => {
  if (!Audio) throw '不支持Audio!'
  const audio = new Audio()
  // 事件回调
  const audioCalbacks = {}
  // 自动播放
  const onAudioCanPlay = () => {
    audio.play()
  }
  const onAudioTimeUpdate = e => {
    audioCalbacks.onPlaying &&
      audioCalbacks.onPlaying(e, {
        currentTime: audio.currentTime,
        duration: audio.duration,
        volume: audio.volume,
        src: audio.src,
        playRate: audio.currentTime / audio.duration || 0
      })
  }
  // 开始播放
  const onAudioPlay = e => {
    audioCalbacks.onPlayed && audioCalbacks.onPlayed(e)
  }
  // 暂停
  const onAudioPaused = e => {
    audioCalbacks.onPaused && audioCalbacks.onPaused(e)
  }
  // 播放完毕
  const onAudioEnded = e => {
    audioCalbacks.onPlayEnd && audioCalbacks.onPlayEnd(e)
  }
  // 指定音频url
  const onSetAudioUrl = url => {
    audio.src = url
  }
  // 手动播放音频
  const onPlay = () => {
    audio.play()
  }
  // 手动暂停音频
  const onPause = () => {
    audio.pause()
  }
  // 设置音量
  const onSetAudioVolume = volume => {
    // 0~1
    audio.volume = volume
  }
  // 跳转至指定时间
  const onSeekTo = time => {
    audio.currentTime = time
  }
  // 音频播放回调
  const onPlayed = callback => {
    audioCalbacks.onPlayed = callback
  }
  // 播放时回调
  const onPlaying = callback => {
    audioCalbacks.onPlaying = callback
  }
  // 音频暂停回调
  const onPaused = callback => {
    audioCalbacks.onPaused = callback
  }
  // 播放结束回调
  const onPlayEnd = callback => {
    audioCalbacks.onPlayEnd = callback
  }
  audio.addEventListener("canplay", onAudioCanPlay)
  audio.addEventListener("timeupdate", onAudioTimeUpdate)
  audio.addEventListener("play", onAudioPlay)
  audio.addEventListener("pause", onAudioPaused)
  audio.addEventListener("ended", onAudioEnded)
  return {
    audio,
    onSetAudioUrl,
    onPlay,
    onPause,
    onSetAudioVolume,
    onPlayed,
    onPlaying,
    onPaused,
    onSeekTo,
    onPlayEnd,
  }
}
