<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  <play-bar v-if="this.$route.meta.showPlaybar" @showList="showList" :atBottom="!this.$route.meta.showTab" />
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
    showList() {
      this.show = true
    },
    closeList() {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
@import url(~assets/css/base.css);
@import url(//at.alicdn.com/t/font_2360697_9fecoyi5lo.css);
</style>
