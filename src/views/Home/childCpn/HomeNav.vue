<template>
    <nav-bar class="home-nav">
      <template v-slot:left >
        <span class="iconfont icon-24gl-list" @click="showSlide"></span>
    </template>
    <template v-slot:center>
      <div class="search" @click="searchClick">
        <div class="search-box">
          <span class="iconfont icon-iconfontzhizuobiaozhun22"></span>
          <span> content</span>
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
  data () {
    return {
      
    };
  },
  computed: {
    
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
    .search-box {
    width: 95%;
    height: 35px;
    line-height: 35px;
    margin: 4.5px auto;
    text-align: center;
    color: #ccc;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 18px;
  }
  }
</style>