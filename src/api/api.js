import axios from 'axios'
import qs from 'qs'
// import store from '../store/index'
const IS_DEV = process.env.NODE_ENV // 环境判断
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = IS_DEV ? ' https://cnodejs.org/api/v1' : ' https://cnodejs.org/api/v1'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  // if (config.method === 'get') {
  //   config.data = qs.stringify(config.data)
  // }
  // if (store.state.common.accesstoken) { // 判断是否存在token，如果存在的话，则每个http header都加上token
  //   config.headers.Authorization = `${store.state.common.accesstoken}`
  // }
  return config
}, (error) => {
  // _.toast('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (!res.data.success) {
    // _.toast(res.data.msg);
    return Promise.reject(res)
  }
  return res
}, (error) => {
  // _.toast('网络异常', 'fail')
  return Promise.reject(error)
})
export default axios
