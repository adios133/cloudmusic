<template>
  <div class='item-title'>
    <div class="title">{{title}}</div>
    <div class="more" @click="seeMore">{{more}}</div>
  </div>
</template>

<script>

export default {
  name:"ItemTitle",
  props: {
    title:{
      type:String,
      default:''
    },
    more: {
      type:String,
      default:'更多'
    },
    path:{
      type:String,
      default:''
    }
  },
  methods: {
    seeMore() {
      this.$router.push(this.path).catch(e=>e)
    }
  }
  }
</script>

<style lang="scss" scoped>
  .item-title {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    .title {
      font-size: 20px;
      font-weight: 550;
      color: #333;
    }
    .more {
      padding: 0 10px;
      font-size: 13px;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
  }
</style>