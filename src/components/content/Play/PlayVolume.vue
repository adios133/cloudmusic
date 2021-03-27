<template>
  <div class='play-volume'>
    <span class="iconfont" :class="isMuted" @click="muted"></span>
    <div 
    class="volume-bar" 
    @click="volumeChange"
     ref="bar">
      <div class="volume" :style="{'width':percent *100 + '%'}"></div>
      <div class="dot" :style="{'left':percent *100 + '%'}"></div>
    </div>
  </div>
</template>

<script>

export default {
  name:"PlayVolume",
  data() {
    return {
      percent:1,
      lastRec:0
    }
  },
  computed: {
    isMuted() {
      return this.percent<=0 ? "icon-Volume-Mute" : "icon-Volume-"
    }
  },
  methods: {
    volumeChange(e) {
      const x = e.pageX - this.$refs.bar.offsetLeft
      const percent = (x / this.$refs.bar.offsetWidth)
      if (percent <= 0) {
        percent = 0
      }else if(percent >=1){
        percent = 1
      }
      this.percent = percent
      this.$bus.$emit('volumeChange',this.percent)
    },
    muted() {
      if (this.percent !== 0) {
        this.lastRec = this.percent
        this.percent = 0
      }else {
        this.percent = this.lastRec
      }
      this.$bus.$emit('volumeChange',this.percent)
    }
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
        left: -4px;
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