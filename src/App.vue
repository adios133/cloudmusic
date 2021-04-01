<template>
  <div id="app">
      <!-- <transition name="slide"> -->

    <keep-alive exclude="Search,Rrecommend,Home,ListDetail">
        <router-view/>
    </keep-alive>
      <!-- </transition> -->

  <play-bar v-if="this.$route.meta.showPlaybar" :atBottom="!this.$route.meta.showTab" />
  <main-bar v-if="this.$route.meta.showTab" />
  <play-list :isShow="show" @closeList="closeList" />
  </div>
</template>

<script>
import MainBar from 'components/content/MainBar/Mainbar'
import PlayBar from 'components/content/PlayBar/PlayBar'
import PlayList from 'components/content/PlayList/PlayList'
export default {
  components: {
    MainBar,
    PlayBar,
    PlayList
  },
  data() {
    return {
      show:false
    }
  },
  methods: {
    closeList() {
      this.show = false
    }
  },
  beforeUpdate() {
    this.$bus.$on('showList',()=> {
      this.show = true
    })
  }
}
</script>

<style lang="scss">
@import url(~assets/css/base.css);
@import url(//at.alicdn.com/t/font_2360697_u9r0tdqa3l.css);
// .slide-enter-active,.slide-leave-active {
//   transition: transform 0.3s;
// }
// .slide-enter,.slide-leave-to {
//   transform: translateY(100vh);
// }
// .slide-enter-to,.slide-leave {
//   transform: translateX(100vw);
// }
</style>
