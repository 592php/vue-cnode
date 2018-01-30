import axios from './api'
import qs from 'qs'
// 登录
export function login (data) {
  return axios.post('/accesstoken', {...data})
   .then(res => res.data)
}
// 获取未读消息
export function getMessages (data) {
  return axios.get('/message/count?' + qs.stringify(data))
   .then(res => res.data)
}
// 获取个人信息
export function getUser (data) {
  return axios.get('/user/' + data)
   .then(res => res.data)
}
// 获取主题列表
export function getList (data) {
  return axios.get('/topics?' + qs.stringify(data))
   .then(res => res.data)
}
// 发布主题
export function postArticle (data) {
  return axios.post('/topics?', {...data})
   .then(res => res.data)
}
// 主题详情
export function detailes (data) {
  return axios.get('/topic/' + data)
   .then(res => res.data)
}
// 收藏的主题
export function userCollect (data) {
  return axios.get('/topic_collect/' + data)
   .then(res => res.data)
}
