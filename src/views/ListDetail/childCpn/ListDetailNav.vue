<template>
  <div class='list-nav'
  :style="{'background-color':`rgba(255,255,255,${opicity})`,'color':`rgb(${255*(1-opicity)},${255*(1-opicity)},${255*(1-opicity)})`}">
    <nav-bar >
      <template #left>
        <span class="iconfont icon-back1 back" @click="goBack"></span>
      </template>
      <template #center>
        <div class="center">{{opicity>0.5 ? name : '歌单详情'}}</div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'

export default {
  name:"ListDetailNav",
  components: {
    NavBar
  },
  props: {
    opicity: {
      type:Number,
      default:0
    },
    name: String
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .list-nav {
    position: absolute;
    width: 100%;
    z-index: 5;
    .center {
      width: calc(100vw - 120px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 16px;
    }
  }
</style>