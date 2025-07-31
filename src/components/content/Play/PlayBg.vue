<script setup lang="ts">
defineOptions({
  name: "PlayBg"
});
defineProps<{ picUrl: string }>();
</script>

<template>
  <div class="play-bg">
    <img :src="picUrl" alt="" />
  </div>
</template>

<style lang="less" scoped>
.play-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  filter: blur(40px) contrast(60%);
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
