<template>
  <div class='cloud'>
    <cloud-nav />
    <scroll :pullUpLoad="true" @pullingUpLoad="pullingUpLoad" class="scroll" v-if="songList.length > 1" ref="scroll">
      <cloud-item v-for="(item,index) in songList" :key="index" :rank="index" :songInfo="item" @saveList="saveList" />
    </scroll>
  </div>
</template>

<script>
import CloudNav from './childCpn/CloudNav'
import Scroll from 'components/common/Scroll/Scroll'
import {getCloudMusic} from 'network/cloud'
import CloudItem from './childCpn/CloudItem'
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)

export default {
  name:"Cloud",
  components: {
    CloudNav,
    Scroll,
    CloudItem
  },
  data () {
    return {
      songList:[],
      limit:100,
      offset:0
    };
  },
  computed: {
    
  },
  methods: {
    // 获取音乐信息
    _getCloudMusic(limit,offset) {
      getCloudMusic(limit,offset).then(res => {
        Toast.clear()
        this.songList.push(...res.data)
      })
    },
    // 上拉加载更多
    pullingUpLoad() {
      this.offset+=this.limit
      this._getCloudMusic(this.limit,this.offset)
      this.$refs.scroll.scroll.finishPullUp();
    },
    // 播放，保存播放列表
    saveList() {
      const list =[]
      this.songList.forEach(item => {
        list.push(item.simpleSong)
      })
      this.$store.commit('setPlaylist',list)
    }
  },
  created() {
    Toast.loading({
      message:"加载中"
    })
    this._getCloudMusic()
  }
  }
</script>

<style lang="scss" scoped>
  .cloud {
    .scroll {
      height: calc(100vh - 93px);
    }
  }
</style>