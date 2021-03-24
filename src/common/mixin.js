
import request from 'network/request'

function getUserId() {
  // 加上时间戳，使得每次请求不同
  const timestamp = +new Date()
  return request({
    url: '/user/account?timestamp=' + timestamp
  })
}
export const getUserID = {
  methods: {
    _getUserId() {
      return new Promise((resolve, reject) => {
        getUserId().then(res => {
          if (res.profile) {
            this.$store.commit("setUid", res.profile.userId)
            resolve(res.profile.userId)
          } else {
            reject('需要登录')
          }
        })
      })
    }
  },
}


// 歌单广场，和video页面导航
import Scroll from 'components/common/Scroll/Scroll'

export const navFun = {
  components: {
    Scroll
  },
  data () {
    return {
      currentIndex:0
    };
  },
  methods: {
    itemClick(index,params) {
      this.currentIndex = index
      this.$emit('cateClick',params)
      // animation
      /* 获取点击包裹父元素宽度，
         当点击元素左边距与父元素宽度（即最右边距离小于窗口宽度时，就固定滚动位置了）
      */
      const width = this.$refs.navItem[index].parentNode.offsetWidth
      const finalX = width-window.innerWidth
      if (width - this.$refs.navItem[index].offsetLeft > window.innerWidth) {
        this.$refs.scroll.scrollTo(-this.$refs.navItem[index].offsetLeft,0,300)
      }else {
        this.$refs.scroll.scrollTo(-finalX,0,300)
      }
    }
  },
}

export const fixedNum = {
  filters: {
    count(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + '亿';
      }else if (num > 10000) {
        return (num / 10000).toFixed(1) + '万';
      }else {
        return num
      }
      }
  }
}

export const randomFn = {
  methods: {
    getRandom(min, max) {
      const mins = Math.floor(min);
      const maxs = Math.ceil(max);
      return Math.floor(Math.random() * (maxs - mins)) + mins;
    }
  },
}

// 歌词功能
import Lyric from 'components/content/Lyric/Lyric'
import {getLyric} from 'network/lyric'
import Vue from 'vue'
import {Swipe, SwipeItem} from 'vant'
Vue.use(Swipe)
Vue.use(SwipeItem)
export const LyricModule = {
  components:{
    Lyric
  },
  data() {
    return {
      musicInfo:null,
      lyric:[],
      tlyric:[]
    }
  },
  methods: {
    _getLyric(id) {
      getLyric(id).then(res => {
        if (res.nolyric) {
          this.lyric = [{time:0,msg:'纯音乐'}]
        }else if (res.uncollected) {
          this.lyric = [{time:0,msg:'暂无歌词'}]
        }else if (res.tlyric.lyric){
          this.lyric = this.lyricsFormat(res.lrc.lyric)
          this.tlyric = this.lyricsFormat(res.tlyric.lyric)
          this.mergeLrcTranslate(this.lyric,this.tlyric)
        }else {
          this.lyric = this.lyricsFormat(res.lrc.lyric)
        }
      })
    },
    lyricsFormat(lrc) {
      const lyric = []
      if (lrc.length == 0) return;
      const lrcs = lrc.split('\n')
      for (let i in lrcs) { 
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, "")
        const t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"))
        const s = t.split(":")
        if (!isNaN(parseInt(s[0]))) {
          const arr = lrcs[i].match(/\[(\d+:.+?)\]/g)
          let start = 0
          for (let k in arr) {
            start += arr[k].length
          }
          const content = lrcs[i].substring(start)
          for (let k in arr) {
            const t = arr[k].substring(1, arr[k].length - 1)
            const s = t.split(":")
            lyric.push({
              time: Number((parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3)),
              msg: content
            })
          }
        }
      }	
      lyric.sort((a,b)=>  a.time - b.time)
      return lyric
    },
    mergeLrcTranslate(lrc,tlrc) {
     lrc.forEach((item,index) => {
      tlrc.forEach(el => {
        if(item.time === el.time) {
          lrc[index].tmsg = el.msg
        }
      })
     })
    }
  },
}

// 歌单播放全部吸顶和nav背景渐变
import {GRADIENT_DISTANCE} from './const'

export const barCeiling = {
  data() {
    return {
      opicity:0,
      isShow:false,
    }
  },
  methods: {
    scrolling(position) {
      this.opicity = -position.y / GRADIENT_DISTANCE
      this.isShow = -position.y >= this.$refs.playall2.$el.offsetTop + this.$refs.content.offsetTop - 44
    }
  },
}

// 抽离fm页面和playing页面公共部分

import PlayBg from 'components/content/Play/PlayBg'
import PlayNav from 'components/content/Play/PlayNav'
import PlayCover from 'components/content/Play/PlayCover'
import PlayProgressBar from 'components/content/Play/PlayProgressBar'

export const PlayAndFm = {
  components: {
    PlayNav,
    PlayBg,
    PlayCover,
    PlayProgressBar,
  }
}


