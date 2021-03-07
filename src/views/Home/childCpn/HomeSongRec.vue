<template>
  <div class='home-song-rec' v-if="recommendList[0]">
    <scroll :scrollX="true" class="home-scroll" >
      <div class="scroll-item" v-for="item in recommendList" :key="item.id" @click="songClick(item.id)">
        <list-item  :imgSrc="item.picUrl" :desc="item.name" :playCount="item.playCount" />
      </div>
    </scroll>
  </div>
</template>

<script>
import ListItem from 'components/content/ListItem/ListItem'
import Scroll from 'components/common/Scroll/Scroll'

export default {
  name:"HomeSongRec",
  components: {
    ListItem,
    Scroll
  },
  props: {
    recommendList: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 点击跳转到歌单详情
    songClick(id) {
      this.$router.push('/listdetail/'+ id)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .home-song-rec {
    .home-scroll {
      width: 100vw;
      .scroll-item {
      display: inline-block;
      margin: 4px 8px;
      vertical-align: top;
    }
    }
    
  }
</style>