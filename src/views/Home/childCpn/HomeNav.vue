<template>
    <nav-bar class="home-nav">
      <template v-slot:left >
        <span class="iconfont icon-24gl-list" @click="showSlide"></span>
    </template>
    <template v-slot:center>
      <div class="search" @click="searchClick">
        <div class="search-box">
          <span class="iconfont icon-iconfontzhizuobiaozhun22"></span>
          <span class="keyword">{{keyword}}</span>
        </div>
      </div>
    </template>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'
export default {
  name:"HomeNav",
  components: {
    NavBar,
  },
  props: {
    keyword:String
  },
  methods: {
    showSlide() {
      this.$emit('showSlide')
    },
    searchClick() {
      this.$router.push('/search')
    }
  },
  }
</script>

<style lang="scss" scoped>
  .home-nav {
    background-color: rgba(237, 238, 220,.2);
    font-size: 16px;
    .search-box {
      overflow: hidden;
      width: 60vw;
      height: 35px;
      line-height: 35px;
      margin: 4.5px auto;
      padding: 0 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      color: #ccc;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 18px;
      .keyword {
        font-size: 14px;
      }
  }
  }
</style>