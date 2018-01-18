import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Personal from '@/pages/personal'
import Home from '@/pages/home'
import Register from '@/pages/register'
import postArticle from '@/pages/postArticle'
import myArticle from '@/pages/myArticle'
import detailes from '@/pages/detailes'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/home',
    name: 'home',
    component: Home
  }, {
    path: '/personal',
    name: 'personal',
    component: Personal
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/postarticle',
    name: 'postArticle',
    component: postArticle
  }, {
    path: '/myarticle/:id',
    name: 'myArticle',
    component: myArticle
  }, {
    path: '/detailes/:id',
    name: 'detailes',
    component: detailes
  }]
})
