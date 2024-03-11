import { defineStore } from "pinia"
import { ref } from "vue"
import { PLAY_STYLE, DEFAULT_VOLUME, DEFAULT_PLAY_STYLE } from "@/config/play"
export const usePlayInfo = defineStore("play", () => {
  const playList = ref([]) // 播放列表
  const currentPlay = ref("") // 当前播放
  const volume = ref(DEFAULT_VOLUME) // 当前音量
  const lastestVolume = ref(DEFAULT_VOLUME) // 上次音量(静音切换)
  const playState = ref(false) // 是否正在播放
  const playStyle = ref(DEFAULT_PLAY_STYLE)
  return {
    playList,
    currentPlay,
    volume,
    lastestVolume,
    playState,
    playStyle
  }
})
