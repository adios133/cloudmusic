<template>
  <div class='my-favor'>
    <div class="favor-item" v-for="(item,index) in itemList" :key="index" @click="itemClick(index)">
      <span>{{item.name}}</span>
      <span class="iconfont icon-more"></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  name:"ProfileFavor",
  props:{
    favorListId:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      itemList:[
        {name:'听歌排行',path:'/recent'},
        {name:'我喜欢的音乐',path:''}, //需要将用户的‘喜欢歌单’的id传进来，watch属性变化修改path
        {name:'我的音乐',path:'/music'},
        {name:'我的视频',path:'/video'},

      ]
    };
  },
  watch:{
    favorListId() {
      this.itemList[1].path = '/listdetail/' + this.favorListId
    }
  },
  computed: {
    
  },
  methods: {
    itemClick(index) {
      // 如果没有登陆，提示用户登录，停止向下执行,toast，自己封装 or 直接使用vant插件
      if ((index === 0 || index === 1) && this.$store.state.userId == '') {
        Toast.fail({
          message:'需要登录',
          duration:1500
        })
        return
      }
      this.$router.push(this.itemList[index].path)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .my-favor {
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    background-color: #fff;
    .favor-item {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
    }
    .recent-play {
      border-bottom: 1px solid #eee;
    }
  }
</style>