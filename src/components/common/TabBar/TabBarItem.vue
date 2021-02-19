<template>
  <div class='tab-bar-item' @click="itemClick" :style="activeStyle">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>

export default {
  name:"TabBarItem",
  props: {
    path:String,
    tabFontColor:{
      type:String,
      default: '#D43C33'
    }
  },
  computed: {
    isActived() {
      return this.$route.path.indexOf(this.path) !==-1
    },
    activeStyle() {
      return this.isActived ? {color:'#D43C33'} :{}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path).catch(e=>e)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .tab-bar-item {
    flex: 1;
    height: 49px;
    text-align: center;
  }
</style>