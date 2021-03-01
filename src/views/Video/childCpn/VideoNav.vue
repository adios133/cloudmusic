<template>
  <div class='video-nav'>
    <scroll :scrollX="true" ref="scroll">
      <span v-for="(item,index) in cateList" 
      :key="index" 
      class="nav-item"
      :class="{'active':currentIndex === index}"
      @click="itemClick(index,item.id)"
      ref="navItem">{{item.name}}</span>
    </scroll>
  </div>
</template>

<script>
import {navFun} from 'common/mixin'
export default {
  name:"VideoNav",
  mixins:[navFun],
  props: {
    cateList:{
      type:Array,
      default() {
        return []
      }
    }
  },
  computed: {
    
  },
  }
</script>

<style lang="scss" scoped>
  $color:#D43C33;
  .nav-item {
    font-size: 16px;
    height: 45px;
    line-height: 45px;
    padding: 5px 10px;
  }
  .active {
    color: $color;
    border-bottom: 2px solid $color;
  }
</style>