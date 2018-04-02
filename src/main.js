// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {getStore} from './config/common'
import store from './store/index'
Vue.config.productionTip = false

/* eslint-disable no-new */
const whiteList = ['/', '/home', '/login', '/register', '/detailes'] // 不重定向白名单
function strt (str) {
  let url = str.match(/([^/]+)/)
  return '/' + url[0]
}
router.beforeEach((to, from, next) => {
  let userInfo = getStore('userInfo')
  if (!userInfo) {
    if (whiteList.indexOf(strt(to.path)) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
