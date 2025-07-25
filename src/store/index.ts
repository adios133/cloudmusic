import { defineStore } from "pinia";
import { ref } from "vue";
export default defineStore("play", () => {
  const state = ref({
    userId: "",
    playlist: null,
    playing: null,
    isplay: false,
    playorder: "list", // 播放方式
    currentLine: 0, //记录歌词
    isFm: false,
    volume: 0.6, //音量
    lastestVol: 0 //控制静音，记录上次音量
  });
  const setUid = (id: string) => {
    state.value.userId = id;
  };
  const setPlaylist = (list: any[]) => {
    state.value.playlist = list;
  };
  const setPlaying = (playSongInfo: any) => {
    state.value.playing = playSongInfo;
  };
  const setState = (isPlaying: boolean) => {
    state.value.isplay = isPlaying;
  };
  const setOrder = (order: string) => {
    state.value.playorder = order;
  };
  // 改变当前歌词行
  const setLine = (payload: number) => {
    state.value.currentLine = payload;
  };
  // 设置是否是fm界面，不然从fm返回从下面的点击进入会返回到playing界面
  const setFm = (payload: boolean) => {
    state.value.isFm = payload;
  };
  const setVolume = (payload: number) => {
    state.value.volume = payload;
  };
  const setLastestVol = (payload: number) => {
    state.value.lastestVol = payload;
  };
  return {
    state,
    setUid,
    setPlaylist,
    setPlaying,
    setState,
    setOrder,
    setLine,
    setFm,
    setVolume,
    setLastestVol
  };
});
