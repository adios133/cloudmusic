<template>
  <div class='search-list'>
    <div class="item" 
    v-for="(item,index) in searchList" 
    :key="index" 
    @click="goPlay(item.id,index)">{{item.name}} - {{item.artists[0].name}}</div>
  </div>
</template>

<script>

export default {
  name:"SearchList",
  props: {
    searchList: {
      type:Array,
      default() {
        return []
      }
    },
  },
  computed: {
    searchListFixed() {
      const list = []
      this.searchList.forEach(item => {
        const t1 = {}
        t1.al = item.album;
        t1.ar = item.artists;
        t1.name = item.name;
        t1.id = item.id;
        list.push(t1)
      })
      return list
    }
  },
  methods: {
    goPlay(id,index) {
      // 记录历史
      let arr = []
      const item = JSON.parse(localStorage.getItem('history'))
      const noSame =item && !item.some(el => el == this.searchList[index].name)
      if (item && noSame) {
      arr = [...item,this.searchList[index].name]
      }else {
        arr.push(this.searchList[index].name)
      }
      localStorage.setItem('history',JSON.stringify(arr))
      // 播放页
      this.$store.commit('setState',false)
      this.$store.commit("setLine",0)
      this.$bus.$emit('playsong',id)
      this.$router.push('/playing/' + id)
      this.$store.commit('setFm',true)
      // 数据不一样,不搞列表了只有选中的一个单曲循环
      this.$store.commit('setPlaylist',[this.searchListFixed[index]])
    }
  },
  }
</script>

<style lang="scss" scoped>
$border:1px solid #eee;
.search-list {
  font-size: 15px;
  // border: $border;
  .item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 35px;
    margin: 10px 0;
    line-height: 28px;
    text-indent: 10px;
    border-bottom: $border;
  }
}
  
</style>