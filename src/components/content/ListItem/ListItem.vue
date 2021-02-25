<template>
  <div class='list-item'>
    <img src="~assets/img/default/default.jpg" alt="" v-if="imgSrc === ''">
    <img :src="imgSrc" alt="" v-else>
    <div class="desc">{{desc}}</div>
  </div>
</template>

<script>

export default {
  name:"ListItem",
  props:{
    imgSrc:{
      type:String,
      default:''
    },
    desc:{
      type:String,
      default:'歌单'
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  }
</script>

<style lang="scss" scoped>
  .list-item {
    width: 6.25rem;
    img {
      width: 6.25rem;
      height: 6.25rem;
      border-radius: 20px
    };
    .desc {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      white-space: normal;
      width: 100%;
      margin-top: 5px;
      font-size: 12px;
      line-height: 1.2;
    }
  }
</style>