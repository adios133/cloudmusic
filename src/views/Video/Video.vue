<template>
  <div id='video'>
    <video-nav :cateList="cateList" @cateClick="cateClick" />
    <scroll class="video-scroll" :pullUpLoad="true" @pullingUpLoad="pullingUpLoad" ref="scroll">
      <div class="v-item" v-for="(item,index) in videoGroup" :key="index">
        <video-item :videoInfo="item.data" 
        class="v_item" 
        @coverClick="coverClick" 
        ref="vItem"
        :isVideo="currentPlayId === item.data.vid" />
      </div>
    </scroll>
  </div>
</template>

<script>

import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)

import {getVideoCate,getViedoList,getVideoUrl} from 'network/video'

import Scroll from 'components/common/Scroll/Scroll'
import VideoNav from './childCpn/VideoNav'
import VideoItem from './childCpn/VideoItem'
export default {
  name:"Video",
  components: {
    VideoNav,
    Scroll,
    VideoItem
  },
  data () {
    return {
      cateList:[],
      offset:0,
      videoGroup:[],
      groupId:'',
      currentPlayId:''
    };
  },
  computed: {

  },
  methods: {
    _getViedoList(id,offset) {
      getViedoList(id,offset).then(res=> {
        // 加载更多，使用push
        Toast.clear()
        // 为每个对追加index属性，以便后续点击确定获取是哪个的url，由于有上拉加载更多，且使用push，后续的index需要处理
        res.datas.map((item,index) => {
        item.data.index = index + this.offset * res.datas.length
      })
        this.videoGroup.push(...res.datas)
      })
    },
    _getVideoUrl(info) {
      getVideoUrl(info.id).then(res => {
        this.$refs.vItem[info.index].url= res.urls[0].url
        // currentTime 可实现指定位置播放
        // this.$refs.vItem[info.index].$el.children[0].children[0].currentTime = 20
      })
    },
    cateClick(id) {
      // 每次点击重置offset,清空videoGroup
      this.offset = 0
      this.videoGroup = []
      this.groupId = id
      Toast.loading('加载中...')
      this._getViedoList(id)
    },
    coverClick(info) {
      // currentPlayId是用于点击那个，那个变为video，其他变成img
      this.currentPlayId = info.id
      this._getVideoUrl(info)
    },
    pullingUpLoad() {
      this.offset+=1
      this._getViedoList(this.groupId,this.offset)
      // 结束上拉，可进行下一次上拉，不然只会触发一次
      this.$refs.scroll.scroll.finishPullUp()
    }
  },
  activated() {
    getVideoCate().then( res => {
      // 变量存储
      Toast.loading('加载中...')
      // pop删除最后一个，最后一个为mv，里面的数据和其他的不一样，直接删除
      res.data.pop()
      this.cateList = res.data
      // 上来加载列表第一个
      this.groupId = this.cateList[0].id
      this._getViedoList(this.groupId)
    }).catch(err=> {
      Toast.fail({
          message:err.response.data.msg,
          duration:1500
        })
    })
  }
  }
</script>

<style lang="scss" scoped>
  .video-scroll {
    height: calc(100vh - 93.5px);
    .v_item {
      width: 90%;
      margin: 0 auto;
    }
  }
</style>