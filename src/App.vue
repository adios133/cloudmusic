<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  <main-bar />
  <play-bar />
  </div>
</template>

<script>
import MainBar from 'components/content/MainBar/Mainbar'
import PlayBar from 'components/content/PlayBar/PlayBar'
export default {
  components: {
    MainBar,
    PlayBar
  }
}
</script>

<style lang="scss">
@import url(~assets/css/base.css);
@import url(//at.alicdn.com/t/font_2360697_lv8d1yd24f.css);
</style>
