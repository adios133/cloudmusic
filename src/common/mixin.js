
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


