<template>
  <div class='fm' v-if="musicInfo">
    <fm-bg :picUrl="musicInfo.album.picUrl" />
    <div class="container">
      <fm-nav :musicInfo="musicInfo" />
      <fm-cover :picUrl="musicInfo.album.picUrl" />
      <fm-progress-bar />
      <fm-controller />
    </div>
  </div>
</template>

<script>

import FmBg from './childCpn/FmBg'
import FmNav from './childCpn/FmNav'
import FmCover from './childCpn/FmCover'
import FmProgressBar from './childCpn/FmProgressBar'
import FmController from './childCpn/FmController'

import {getFm} from 'network/fm'
export default {
  name:"Fm",
  components: {
    FmNav,
    FmBg,
    FmCover,
    FmProgressBar,
    FmController
  },
  data () {
    return {
      musicInfo:null,
      
    };
  },
  methods:{
    _getFm() {
      getFm().then(res => {
        this.musicInfo = res.data[0]
      })
    }
  },
  
  created() {
    this._getFm()
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
  .fm {
    width: 100vw;
    overflow: hidden;
    .container {
      position: absolute;
      width: 100vw;
      height: 100vh;
      z-index: 1;
    }
  }
  

  
</style>