<template>
    <van-popup v-model="show" position="left" :style="{height:'100%',width:'70%'}" duration=".2" @click-overlay="closeSlide">
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
   closeSlide() {
     this.$emit('closeSlide')
   }
  },
  }
</script>

<style lang="scss" scoped>
  
</style>