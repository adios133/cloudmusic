<template>
  <div class='lyric'>
    <scroll class="lyric-box" ref="scroll">
        <div class="content" ref="content">
          <div v-for="(item,index) in data" :key="index" class="line" :class="{'now-time':index === $store.state.currentLine-1}" ref="item">{{item.msg}}</div>
        </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll'
export default {
  name:"Lyric",
  components:{
    Scroll
  },
  props:{
    lyric:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      data:[],
      // 解决再次进入页面歌词跳转到指定位置，保存到vuex
      // currentLine:0,
      height:(window.innerHeight-180) / 2 ,
      duration:0,
      index:0
    };
  },
  watch: {
    lyric() {
      this.data = this.lyric
    },
  },  
  mounted() {
    this.$bus.$on('playingsong',data => {
      if (this.data.length > 0 && this.$store.state.currentLine <this.data.length && data.currentTime >= this.data[this.$store.state.currentLine].time) {
        if (this.$store.state.currentLine <= this.data.length - 1) {
          this.$refs.scroll.scrollTo(0,-this.$refs.item[this.$store.state.currentLine].offsetTop + this.height,0)
          this.$store.commit("setLine",this.$store.state.currentLine+=1)
          this.duration = data.duration
        }else {
          this.$store.commit("setLine",this.data.length-1)
        }
      }
    })
    this.$bus.$on('nextSong',() => {
      this.data = []
      this.$store.commit("setLine",0)
      this.$refs.scroll.scrollTo(0,0,0)
    })
    this.$bus.$on('oneSong',()=> {
      this.data = []
      this.$store.commit("setLine",0)
      this.$refs.scroll.scrollTo(0,0,0)
    })
    this.$bus.$on('seekTo',percent => {
      this.data.length> 0 && this.$store.commit("setLine",this.data.findIndex(item => item.time >= percent*this.duration))
      this.$refs.scroll.scrollTo(0,-this.$refs.item[this.$store.state.currentLine].offsetTop + this.height,100)
    })
  },
  beforeDestroy() {
    this.$bus.$off('playingsong')
    this.$bus.$off('nextSong')
    this.$bus.$off('oneSong')

  },
  }
</script>

<style lang="scss" scoped>
  .lyric-box {
    overflow: hidden;
    width: 100vw;
    height: calc(100vh - 180px);
    text-align: center;
    color: rgba(255, 255, 255,.7);
    .content {
      width: 90%;
      margin: 0 auto;
      padding-top: calc(50vh - 90px);
      padding-bottom: calc(50vh - 70px);
      .line {
        // height: 40px;
        line-height: 40px;
        font-size: 15px;
      }
      .now-time {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
      }
    }
    
    
  }
</style>