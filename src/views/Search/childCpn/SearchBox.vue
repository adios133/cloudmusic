<template>
  <div class="search-box">
    <span class="iconfont icon-iconfontzhizuobiaozhun22 icon"></span>
    <input type="text" @input="getKeyWord" :value="word" @focus="getKeyWord" @keyup="setHistory" />
    <span @click="goBack" class="cancel">取消</span>
  </div>
</template>

<script>

export default {
  name: "SearchBox",
  components: {},
  data() {
    return {
      word:''
    };
  },
  computed: {},
  methods: {
    getKeyWord(e) {
      this.$emit('getContent',e.target.value)
    },
    goBack() {
      this.$router.push('/home')
    },
    setHistory(e) {
      // 去重，可以使用set数据结构
      if (e.keyCode === 13) {
        let arr = []
        const item = JSON.parse(localStorage.getItem('history'))
        const noSame =item && !item.some(el => el == e.target.value)
        if (item && noSame) {
        arr = [...item,e.target.value]
        }else {
          arr.push(e.target.value)
        }
        localStorage.setItem('history',JSON.stringify(arr))
      }  
    }
  },
  mounted() {
    this.$bus.$on('fillWord',text=> {
      this.word = text
    })
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  input {
    height: 32px;
    width: 70vw;
    margin: 6px 10px;
    text-indent: 28px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 18px;
  }
  .icon {
    position:absolute;
    left: 20px;
  }
  .cancel {
    display: inline-block;
    width: calc(30vw - 42px);
    text-align: center;
  }
}
</style>
