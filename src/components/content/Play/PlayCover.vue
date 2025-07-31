<script setup lang="ts">
import { computed } from "vue";
import useStore from "@/store";
defineOptions({
  name: "PlayCover"
});

defineProps<{ picUrl: string }>();
const store = useStore();
const isplay = computed(() => {
  return store.state.isplay;
});
</script>

<template>
  <div class="play-cover">
    <div class="needle">
      <img
        src="@/assets/img/default/styli2.png"
        alt=""
        :class="{ playing: isplay }"
      />
    </div>
    <div class="cover" :class="{ round: isplay }">
      <img src="@/assets/img/default/disc.png" alt="" class="disc" />
      <img :src="picUrl" alt="" class="album" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes rotate-cover {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.play-cover {
  position: relative;
  .needle {
    position: relative;
    height: 11.25rem;
    img {
      position: absolute;
      left: 50%;
      margin-left: -5.625rem;
      height: 100%;
      transform: rotate(-35deg);
      transition: transform 0.5s;
      transform-origin: 5.5rem 1.93rem;
      z-index: 4;
    }
    .playing {
      transform: rotate(0deg);
    }
  }
  .cover {
    position: relative;
    overflow: hidden;
    top: -5rem;
    width: 16.5rem;
    height: 16.5rem;
    margin: 0 auto;
    animation: rotate-cover 10s linear infinite;
    animation-delay: 0.5s;
    animation-play-state: paused;
    border-radius: 8.25rem;
    .disc {
      position: absolute;
      width: 100%;
      height: 100%;
      // @include anim;
      z-index: 3;
    }
    .album {
      position: absolute;
      top: 3.25rem;
      left: 3.25rem;
      width: 10rem;
      height: 10rem;
      // @include anim;
      z-index: 2;
    }
    // .round {
    //   animation-play-state:running;
    // }
  }
  div.round {
    animation-play-state: running;
  }
}
</style>
