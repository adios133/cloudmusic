
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
// mistake 
// export const getID = {
//   methods: {
//     _getUserId() {
//       getUserId().then(res => {
//         return new Promise((resolve, reject) => {
//           if (res.profile) {
//             this.$store.commit("setUid", res.profile.userId)
//             resolve(res.profile.userId)
//           } else {
//             reject('需要登陆')
//           }
//         })
//       })
//     }
//   },
// }


