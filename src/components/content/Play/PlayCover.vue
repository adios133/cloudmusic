<template>
    <div class='play-cover'>
    <div class="needle">
      <img src="~assets/img/default/styli2.png" alt="" :class="{'playing':isplay}">
    </div>
    <div class="cover" :class="{'round':isplay}">
      <img src="~assets/img/default/disc.png" alt="" class="disc" >
      <img :src="picUrl" alt="" class="album" >
    </div>
  </div>
</template>

<script>

export default {
  name:"PlayCover",
  props: {
    picUrl:String
  },
  computed: {
    isplay() {
      return this.$store.state.isplay
    }
  }
  }
</script>

<style lang="scss" scoped>
@mixin positions {
  position: absolute;
  left: 50%;
}
@mixin anim {
  animation: rotateCover 10s linear infinite;
  animation-delay: .5s;
  animation-play-state: paused;
}
@keyframes rotateCover {
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
        @include positions;
        margin-left: -5.625rem;
        height: 100%;
        transform: rotate(-35deg) ;
        transition: transform .5s;
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
        @include anim;
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
      animation-play-state:running;
    }
    
  }
  
</style>