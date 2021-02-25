<template>
    <van-popup 
    v-model="show" 
    position="bottom" 
    :style="{height:'70%',width:'100%'}" 
    duration=".2" 
    @click-overlay="closeList" 
    class="play-list" closeable 
    @click-close-icon="closeList">
      1111
    </van-popup>
</template>

<script>
import Vue from 'vue'
import {Popup} from 'vant'
Vue.use(Popup)

export default {
  name:"HomeSlide",
  props: {
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      show:false
    };
  },
  watch: {
    isShow() {
      this.show = this.isShow
    }
  },
  computed: {
    
  },
  methods: {
   closeList() {
     this.$emit('closeList')
   }
  },
  }
</script>

<style lang="scss" scoped>
  .play-list {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
</style>