<template>
  <div class='fm-nav'>
    <nav-bar>
      <template v-slot:left>
        <span class="back iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <div class="name"><span>{{musicInfo.name}}</span></div>
          <div class="artists">
            <span v-for="(artist, index) in musicInfo.artists" :key="artist.id">
              {{ artist.name }}<span v-if="index < musicInfo.artists.length - 1">/</span>
            </span>
          </div>        
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'
export default {
  name:"FmNav",
  components: {
    NavBar
  },
  props: {
    musicInfo:{
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
@mixin trans-bg {
  background-color: rgba(255,255,255,.05);
  box-shadow: 0 0 20px 15px rgba(255,255,255,.05);
}
  .fm-nav {
    @include trans-bg;
    color: #333; 
    font-size: 16px;  
    .name {
      width: 70vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 60%;
      font-size: 15px;
      line-height: 28px;
    }
    .artists {
      font-size: 12px;
      height: 40%;
      line-height: 16px;
      color: #555;
    }
  }
</style>