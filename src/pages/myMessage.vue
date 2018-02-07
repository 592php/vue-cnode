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
    <div class="page">
      <div class="message markdown-body" v-for="(item,index) in datalist" :key="index">
        <section class="user">
          <img class="head" :src="item.author.avatar_url" />
          <div class="info">
            <span class="cl">
              <span class="name">{{item.author.loginname}}</span>
              <span class="name" v-if="item.type==='at'">在回复中@了您</span>
              <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
            </span>
            <span class="cr">
              <span class="name" v-text="getLastTimeStr(item.reply.create_at, true)"></span>
            </span>
          </div>
        </section>
        <div class="reply_content" v-html="item.reply.content"></div>
        <router-link :to="{name:'detailes',params:{id:item.topic.id}}">
          <div class="topic-title">
            话题：{{item.topic.title}}
          </div>
        </router-link>
      </div>
    </div>
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
import { getLastTimeStr } from '@/config/common'
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
      read: 0,
      noread: 1
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
      noread: [],
      read: [],
      tabName: tabs,
      itemTab: [{
        title: '已读消息',
        type: 'read'
      }, {
        title: '未读消息',
        type: 'noread'
      }],
      id: 'read'
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getdata()
  },
  computed: {
    ...mapGetters(['loginStatus', 'userInfo', 'token'])
  },
  methods: {
    changeTab (index) {
      window.scroll(0, 0)
      this.initIndex = index
      this.datalist = this.initIndex ? this.noread : this.read
    },
    getLastTimeStr (date, friendly) {
      return getLastTimeStr(date, friendly)
    },
    getdata () {
      this.loading = true
      let data = {
        mdrender: true,
        accesstoken: this.token
      }
      this.$store.dispatch('messages', data).then(res => {
        if (res.success) {
          console.log(res, 'res')
          this.read = res.data.has_read_messages
          this.noread = res.data.hasnot_read_messages
          this.datalist = this.read
        }
        this.loading = false
      })
    },
    loadMore () {}
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/css/px2rem';
  $title: #2c3e50;
  $padding: 15px;
  $colorf0:#f0f0f0;
  $gap:5px;
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
  .break {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.page{
  background-color: #fff;
  padding: 10px;
}
.user {
    width: 100%;
    margin: $gap*2 0;
    padding: 0 $gap*2;
    display: flex;
    .tab {
        display: inline-block;
        width: $gap*8;
        color: $color62;
        border-radius: $gap;
        background-color: $colore7;
        margin-right: $gap*2;
        text-align: center;
        height: $gap*4;
        line-height: $gap*4;
        vertical-align: middle;
    }
    .good {
        background-color: $color80;
        color: $colorfff;
    }
    .title {
        font-size: $gap*3.6;
        font-weight: bold;
        display: block;
        width: 100%;
        flex: 1;
        @extend .break;
    }
    .head {
        display: inline-block;
        width: $gap*9;
        height: $gap*9;
        margin-right: $gap*2;
        border-radius: 10px;
        img {
            width: $gap*9;
            border: 2px solid #fff6e6;
            border-radius: 50%;
        }
    }
    .info {
        overflow: hidden;
        display: block;
        width: 100%;
        flex: 1;
        &:after {
            clear: both;
        }
        .t-title {
            font-size: $gap*3.6;
            font-weight: bold;
            width: 100%;
            color: #333;
            @extend .break;
        }
        .mt12 {
            margin-top: 12px;
        }
        .cl {
            display: inline-block;
            width: 68%;
            .name {
                color: $color62;
            }
            .mt10 {
                margin-top: $gap*2;
            }
        }
        .cr {
            width: 30%;
            display: inline-block;
            text-align: right;
            .name {
                margin-top: $gap*2;
                color: $color80;
                font-size: $gap*2.4;
            }
        }
    }
}
.reply_content {
    padding: 0 $gap*3;
    margin-bottom: $gap*3;
    img {
        width: auto\9;
        height: auto;
        max-width: 100%;
        vertical-align: middle;
        border: 0;
        -ms-interpolation-mode: bicubic;
    }
    p {
        line-height: 1.3;
    }
}
.topic-title {
    padding: $gap;
    margin:$padding;
    font-size: 18px;
    color: $title;
    line-height: 1.5;
    background-color:$colorf0;
    border-radius:$gap;
}
</style>
