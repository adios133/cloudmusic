<template>
  <div class='recent-nav'>
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
       <div class="bar-item">
          <div v-for="(item,index) in title" 
          :key="index" @click="switchItem(index)" 
          :class="{active:currentIndex === index}">{{item}}</div>
       </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'

export default {
  name:"RecentNav",
  components: {
    NavBar
  },
  data () {
    return {
      title:['最近一周','所有时间'],
      currentIndex:0
    };
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index
      this.$emit('switchItem',index)
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  }
</script>

<style lang="scss" scoped>
.recent-nav {
  font-size: 16px;
  .bar-item {
    display: flex;
    justify-content: space-evenly;
    div {
      padding: 0 15px;
    }
    .active {
      color: #D43C33;
      border-bottom: 2px solid #D43C33;
    }
  }
}
  
</style>