<template>
  <div class='play-volume'>
    <span class="iconfont" :class="isMuted" @click="muted"></span>
    <div 
    class="volume-bar" 
    @click="volumeChange"
     ref="bar">
      <div class="volume" :style="{'width':$store.state.volume *100 + '%'}"></div>
      <div class="dot" :style="{'left':$store.state.volume *100 + '%'}"></div>
    </div>
  </div>
</template>

<script>

export default {
  name:"PlayVolume",
  data() {
    return {
      // startX:0,
      // moveX:0
    }
  },
  computed: {
    isMuted() {
      return this.$store.state.volume <=0 ? "icon-Volume-Mute" : "icon-Volume-"
    }
  },
  methods: {
    volumeChange(e) {
      const x = e.pageX - this.$refs.bar.offsetLeft
      let percent = (x / this.$refs.bar.offsetWidth)
      if (percent <= 0) {
        percent = 0
      }else if(percent >=1){
        percent = 1
      }
      this.$store.commit('setVolume',percent)
      this.$bus.$emit('volumeChange',this.$store.state.volume)
    },
    muted() {
      if (this.$store.state.volume !== 0) {
        this.$store.commit('setLastestVol',this.$store.state.volume)
        this.$store.commit('setVolume',0)
      }else {
        this.$store.commit('setVolume',this.$store.state.lastestVol)

      }
      this.$bus.$emit('volumeChange',this.$store.state.volume)
    },
    /*
    // touchstart(e) {
    //   this.startX = e.touches[0].pageX
    // },
    // touchmove(e) {
    //   this.moveX = e.touches[0].pageX - this.startX
    //   // update position
    //   this.startX = e.touches[0].pageX
    //   let changePercent = this.moveX / this.$refs.bar.offsetWidth
    //   let data = this.$store.state.volume + changePercent
    //   if (data <= 0) {
    //     data = 0
    //   }else if(data >=1){
    //     data = 1
    //   }
    //   this.$store.commit('setVolume',data)
    //   this.$bus.$emit('volumeChange',data)
    // },
    // touchend(e) {
    //   e.preventDefault();
    // }
    */
  },
  }
</script>

<style lang="scss" scoped>
  .play-volume {
    display: flex;
    justify-content: center;
    color: #fff;
    span {
      font-size: 14px;
    }
    .volume-bar {
      position: relative;
      top: 6.5px;
      width: 65vw;
      height: 2px;
      margin: 0 10px;
      background-color: rgba(255,255,255,.6);
      .dot {
        position: absolute;
        top: -3px;
        margin-left: -4px;
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 4px;
      }
      .volume {
        height: 100%;
        width: 0;
        background-color: #d43c33;
      }
    }
  }
</style>  