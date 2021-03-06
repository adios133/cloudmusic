<template>
  <div class='cloud-nav'>
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <span>我的云盘</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'
export default {
  name:"CloudNav",
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
      this.$router.push('/home')
    }
  },
  }
</script>

<style lang="scss" scoped>
  .cloud-nav {
    border-bottom: 1px solid #eee;
  }
</style>