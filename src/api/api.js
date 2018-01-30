import axios from 'axios'
import qs from 'qs'
const IS_DEV = process.env.NODE_ENV // 环境判断
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = IS_DEV
  ? ' https://cnodejs.org/api/v1'
  : ' https://cnodejs.org/api/v1'

// POST传参序列化
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
axios.interceptors.response.use(
  res => {
    if (res.data.success) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
