<template>
  <div class='list-header'>
    <div class="bg">
      <img :src="listInfo.coverUrl" alt="">
    </div>
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1 back" @click="goBack"></span>
      </template>
    </nav-bar>
    <div class="info">
      <div class="cover">
          <img :src="listInfo.coverUrl" alt="">
      </div>
      <div class="list-info">
        <div class="title">{{listInfo.name}}</div>
        <div class="creator">
          <img :src="creatorInfo.avatar" alt="">
          <span>{{creatorInfo.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'
export default {
  name:"ListDetailHeader",
  components: {
    NavBar
  },
  props: {
    listInfo:{
      type:Object,
      default() {
        return {}
      }
    },
    creatorInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .list-header {
    position: relative;
    overflow: hidden;
    height: 250px;
    .bg {
      position: absolute;
      z-index: -1;
      height: 100%;
      filter: blur(20px);
      img {
        width: 100%;
      }
    }
    .back {
      color: #fff;
    }
    .info {
      display: flex;
      .cover {
        line-height: 206px;
        img {
          width: 120px;
          height: 120px;
          margin: 0 20px;
          border-radius: 10px;
          vertical-align: middle;
        }
      }
      .list-info {
        margin-top: 35px;
        .title {
          margin: 10px 0;
          color: #fff;
          font-size: 16px;
        }
        .creator {
          color: #ccc;
          font-size: 14px;
          img {
            width: 30px;
            height: 30px;
            margin-right:5px;
            border-radius: 15px;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>