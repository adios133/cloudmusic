<template>
  <div class='home-recommend'>
    <div class="rec-item" v-for="(item,index) in recommend" :key="index" @click="recClick(index)">
      <div class="iconfont" :class="item.class"></div>
      <i>{{item.name}}</i>
    </div>
  </div>
</template>

<script>

export default {
  name:"HomeRecommend",
  data () {
    return {
      recommend:[
        {class:'icon-rili',name:'每日推荐',path:'/recommend'},
        {class:'icon-diantai',name:'私人FM',path:'/playing'},
        {class:'icon-gedan',name:'歌单',path:'/songlist'},
        {class:'icon-paixing',name:'排行榜',path:'/rank'}
      ]
    };
  },
  computed: {
    
  },
  methods: {
    recClick(index) {
      this.$router.push(this.recommend[index].path).catch(e=>e)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .home-recommend {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    .iconfont {
      width: 50px;
      height: 50px;
      line-height: 50px;
      margin: 5px;
      font-size: 26px;
      background-color: #EC4141;
      color: #fff;
      border-radius: 25px;
    }
    i {
      font-style: normal;
      font-size: 14px;
    }
  }
</style>