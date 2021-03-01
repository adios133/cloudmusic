<template>
  <div class=''>
    <div class="back" @click="goBack">back</div>
    playing page id:
    {{$route.params.id}}
    <audio :src="url" controls ref="audio"></audio>
  </div>
</template>

<script>
import {getMusicUrl} from 'network/playing'
export default {
  name:"Playing",
  components: {
    
  },
  data () {
    return {
      url:''
    };
  },
  computed: {
    
  },
  methods: {
    _getMusicUrl(id) {
      getMusicUrl(id).then(res=> {
        this.url = res.data[0].url  
      }).then(res=> {
        // 在回调中播放
          this.$refs.audio.play()
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  activated() {
    this._getMusicUrl(this.$route.params.id)
  }
  }
</script>

<style lang="scss" scoped>
  .back {
    width: 100px;
    height: 100px;
    color: #fff;
    line-height: 100px;
    text-align: center;
    background-color: red;
  }
</style>