<template>
  <div class='profile-bg'>
    <img :src="picUrl" alt="" v-if="picUrl != ''">
    <img src="~assets/img/default/bgImg2.jpg" alt="" v-else>
  </div>
</template>

<script>

export default {
  name:"ProfileBackground",
  components: {
    
  },
  props: {
    picUrl:{
      type:String,
      default:''
    }
  },
  computed: {
  },
  methods: {
    
  },
  }
</script>

<style lang="scss" scoped>
  .profile-bg img {
    width: 100%;
  }
</style>