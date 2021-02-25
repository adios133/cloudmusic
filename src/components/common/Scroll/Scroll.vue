<template>
  <div class='wrapper' ref="wrapper">
    <div class="content" :style="modeX">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveImage from '@better-scroll/observe-image'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
BScroll.use(PullDown)
BScroll.use(Pullup)
BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)
export default {
  name:"Scroll",
  props: {
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad: {
      type:Boolean,
      default:false
    },
    pullDownRefresh: {
      type:Boolean,
      default:false
    },
    click: {
      type:Boolean,
      default:true
    },
    scrollX: {
      type:Boolean,
      default:false
    },
    scrollY: {
      type:Boolean,
      default:true
    },
    momentum: {
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      scroll:null
    };
  },
  computed: {
    modeX() {
      return this.scrollX ? {display:'inline-block'} : {}
    }
  },
  mounted() {
    // 创建BS实例
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:this.click,
      observeDOM: true,
      observeImage: true,
      pullDownRefresh: this.pullDownRefresh,
      pullUpLoad: this.pullUpLoad,
      probeType:this.probeType,
      scrollX:this.scrollX,
      scrollY:this.scrollY,
      momentum:this.momentum
    })
    // 当检测类型为 2 或者 3 时，监听滚动事件，向外发出自定义事件
    if(this.probeType ===2 || this.probeType === 3) {
      this.scroll.on("scroll",position=> {
        this.$emit("scrolling",position)
      })
    }
    // 监听下来加载更多
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',()=> {
        console.log('pullingup');
        this.$emit("pullingUpLoad")
      })
    }
    // 监听下拉刷新
    if(this.pullDownRefresh) {
      this.scroll.on('pullingDown',()=> {
        console.log('pullingdown');
        this.$emit('pullingDownLoad')
      })
    }
  },
  methods: {
    scrollTo(x,y,time=500) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll && this.sroll.finishPullUp()
    },
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown()
    }
  },
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
  }
</style>