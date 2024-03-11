<script setup>
import { useAudio } from "@/hooks/useAudio"
import { TEST_URL } from "@/common/const"
defineOptions({
  name: "Home",
})

const {
  audio,
  onSetAudioUrl,
  onPlay,
  onPause,
  onSetAudioVolume,
  onPlayed,
  onPlaying,
  onPaused,
  onAudioSeekTo,
  onPlayEnd,
} = useAudio()
const onUrl = () => {
  onSetAudioUrl(TEST_URL)
}
onPlaying((e,info) => {
  console.log("playing", e,info)
})
onPlayed(e => {
  console.log("play", e)
})
onPaused(e => {
  console.log("pause", e)
})
onPlayEnd(e => {
  console.log("end", e)
})
</script>

<template>
  <div>
    <button @click="onUrl">set url</button>
    <button @click="onPlay">play</button>
    <button @click="onPause">pause</button>
  </div>
</template>

<style lang="less" scoped></style>
