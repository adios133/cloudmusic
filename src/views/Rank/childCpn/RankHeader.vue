<template>
  <div class='rank-head'>
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <span>排行榜</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'
export default {
  name:"RankHeader",
  components: {
    NavBar
  },
  data () {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .rank-head {
    border-bottom: 1px solid #eee;
  }
</style>