<template>
  <div class='list-playall'>
    <span class="iconfont icon-play1"></span>
    <i>播放全部</i>
    <span class="number">({{num}})</span>
  </div>
</template>

<script>

export default {
  name:"ListDetailPLayAll",
  components: {
    
  },
  props:{
    num:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  }
</script>

<style lang="scss" scoped>
  .list-playall {
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    span {
      color: #d43c33;
      margin: 10px;
    }
    i {
      font-style: normal;
      font-weight: 700;
    }
    .number {
      margin: 0;
      font-weight: normal;
      color: #aaa;
    }
  }
</style>