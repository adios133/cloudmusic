<template>
  <div class='songlist-nav'>
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        歌单广场
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'

export default {
  name:"SongListNav",
  components: {
    NavBar
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .songlist-nav {
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }
</style>