<template>
  <div class="navbar">
    <div class="user-h islogin">
      <div class="avatar i-avatar">
        <img :src="userInfo.avatar_url" alt="">
      </div>
      <div class="user-d">
        <p class="username">{{userInfo.loginname}}</p>
      </div>
    </div>
    <v-nav :itemTab="itemTab" @change="changeTab"></v-nav>
    <v-list :datalist="datalist" @loads="loadMore"></v-list>
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import loading from '@/components/loading'
  import tab from '@/components/tab'
  import pageList from '@/components/pageList'
  export default {
    components: {
      'v-loading': loading,
      'v-nav': tab,
      'v-list': pageList
    },
    data () {
      const tabs = {
        replies: 0,
        topics: 1,
        collect: 2
      }
      return {
        params: {
          page: 1,
          limit: 10,
          tab: 'all'
        },
        datalist: [],
        listMore: true,
        loading: false,
        replies: [],
        topics: [],
        collect: [],
        tabName: tabs,
        itemTab: [{
          title: '最近回复',
          type: 'replies'
        }, {
          title: '我的文章',
          type: 'topics'
        }, {
          title: '我的收藏',
          type: 'collect'
        }],
        id: 'replies'
      }
    },
    created () {
      this.id = this.$route.params.id
      this.getdata()
    },
    computed: {
      ...mapGetters(['loginStatus', 'userInfo'])
    },
    methods: {
      changeTab (index) {
        window.scroll(0, 0)
        this.initIndex = index
        if (index > 1) {
          this.datalist = this.collect
        } else {
          this.datalist = index ? this.topics : this.replies
        }
      },
      getdata () {
        this.loading = true
        this.$store.dispatch('userCollect').then(res => {
          if (res.success) {
            this.collect = res.data
          }
          this.loading = false
        })
        this.$store.dispatch('getUser').then(res => {
          if (res.success) {
            this.replies = res.data.recent_replies
            this.topics = res.data.recent_topics
            this.datalist = this.replies
          }
          this.loading = false
        })
      },
      loadMore () { }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/px2rem';
  .navbar {
    padding-bottom: px2rem(100px);
    .islogin {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .i-avatar {
        display: flex;
      }
      .user-d {
        margin-top: px2rem(10px);
        p {
          line-height: px2rem(50px);
          text-align: left;
          &.username {
            font-size: 20px;
            color: #fff;
          }
          &.desc {
            font-size: 16px;
            padding-left: 2px;
          }
        }
      }
    }
    .user-h {
      box-sizing: border-box;
      height: px2rem(310px);
      color: #323232;
      background: #76d49b;
      text-align: center;
      padding-top: px2rem(20px);
      .avatar {
        width: px2rem(160px);
        height: px2rem(160px);
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .u-avatar {
        margin: 0 auto;
      }
      .u-button {
        display: flex;
        justify-content: center;
        margin-top: px2rem(20px);
        a {
          display: block;
          text-align: center;
          width: px2rem(160px);
          color: #2ad2c9;
          background: #fff;
          height: px2rem(72px);
          line-height: px2rem(72px);
          font-size: 14px;
          border-radius: 0 5px 5px 0;
        }
        .t-login {
          background: #2ad2c9;
          color: #fff;
          border-radius: 5px 0 0 5px;
        }
      }
    }
    .btn-apply {
      position: fixed;
      bottom: px2rem(40px);
      right: px2rem(30px);
      width: px2rem(110px);
      height: px2rem(110px);
      background-color: #76d49b;
      border-radius: 50%;
      text-align: center;
      z-index: 9;
      line-height: 1;
      display: block;
      font-size: 14px;
      div {
        .icon {
          display: block;
          line-height: px2rem(60px);
        }
        span {
          color: #fff;
        }
      }
    }
  }
</style>