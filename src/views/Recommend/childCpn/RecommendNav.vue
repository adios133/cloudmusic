<template>
  <div class='rec-nav'
  :style="{'background-color':`rgba(255,255,255,${opicity})`,'color':`rgb(${255*(1-opicity)},${255*(1-opicity)},${255*(1-opicity)})`}">
    <nav-bar @click.native="backClick">
      <template #left>
        <span class="iconfont icon-back1 back" @click="backClick"></span>
      </template>
      <template #center>
        <div class="center">{{opicity>0.5 ? '每日推荐' : ''}}</div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'
export default {
  name:"RecommendNav",
  components: {
    NavBar
  },
  props: {
    opicity:{
      type:Number,
      default:0
    }
  },
  methods: {
    // back
    backClick() {
      this.$router.push('/home')
    }
  },
  }
</script>

<style lang="scss" scoped>
@mixin trans-bg {
  background-color: rgba(255,255,255,.3);
  box-shadow: 0 0 10px 10px rgba(255,255,255,.3);
}
  .rec-nav {
    position: absolute;
    width: 100%;
    font-size: 16px;
    z-index: 5;
    .back {
      position: absolute;
      left: 20px;
      font-weight: 600;
      &::before {
      @include trans-bg;
      color: #333;
      border-radius: 10px
      }
    }
  }
</style>