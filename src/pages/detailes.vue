<template>
  <div class="page">
    <div :class="{'show-menu':showMenu}" v-if="topic.title">
      <h2 class="topic-title" v-text="topic.title"></h2>
      <section class="author-info">
        <img class="avatar" :src="topic.author.avatar_url" />
        <div class="col">
          <span>{{topic.author.loginname}}</span>
        </div>
        <div class="right">
          <span class="tag" :class="getTabInfos(topic.tab, topic.good, topic.top, true)" v-text="getTabInfos(topic.tab, topic.good, topic.top, false)">
          </span>
        </div>
      </section>
      <section class='markdown-body topic-content' v-html="topic.content">
      </section>
      <div class="topic-reply">
        <strong>
          <span class="iconfont icon-pinglun"></span>{{topic.reply_count}}回复</strong>
        <strong>
          <span class="iconfont icon-chakan"></span>{{topic.visit_count}}次预览</strong>
        <strong>
          <span class="iconfont icon-web-icon-"></span>{{topic.create_at | getLastTimeStr(true)}}</strong>
        <strong @click="replybox">
          <span class="iconfont icon-leimupinleifenleileibie"></span>回复</strong>
      </div>
      <section class="reply-list">
        <div class="reply-box">
          <nv-reply :topic.sync="topic" :topic-id="topicId" :reply-id="curReplyId" :show.sync="curReplyId" @replies="newsreplies" v-if="replyshow"></nv-reply>
        </div>
        <ul>
          <li v-for="(item,index) in topic.replies" :key="index" class="topic-list">
            <div class="postUser">
              <div class="postUser__portrait">
                <router-link :to="{name:'user',params:{loginname:item.author.loginname}}">
                  <img class="head" :src="item.author.avatar_url" />
                </router-link>
              </div>
              <div class="postUser__name" v-text="item.author.loginname"></div>
            </div>
            <div class="postBody">
              <div class="postBody__content" v-html="item.content">
              </div>
              <div class="postBody__date">
                发布于:{{item.create_at | getLastTimeStr(true)}}
              </div>
              <div class="cr">
                <span @click="upReply(index)" :class="{'uped':isUps(item.ups)}" class="iconfont icon-dianzan"></span>{{item.ups.length}}
                <span class="iconfont icon-iconfankui" @click="addReply(item.id)"></span>
              </div>

            </div>
            <nv-reply :topic.sync="topic" :topic-id="topicId" :reply-id="item.id" :reply-to="item.author.loginname" :show.sync="curReplyId"
              @replies="newsreplies" v-if="userInfo.id && curReplyId === item.id"></nv-reply>
          </li>
        </ul>
      </section>
    </div>
    <div class='no-data' v-if="noData">
      <div class="tips-ico">
        <i class="iconfont icon-pinglun"></i>
      </div>
      <div class="tips-title"> 该话题不存在! </div>
      <div class="tips-back" @click="backhome()">返回首页</div>
    </div>
    <v-alert v-show="showAlert"></v-alert>
  </div>
</template>

<script>
  import {
    getLastTimeStr,
    getTabInfo
  } from '@/config/common'
  import * as _ from '@/config/tool'
  import nvReply from '@/components/reply.vue'
  import alert from '@/components/alert'
  import {
    mapGetters
  } from 'vuex'
  export default {
    components: {
      nvReply,
      'v-alert': alert
    },
    data () {
      return {
        topic: {}, // 主题
        noData: false,
        showMenu: false,
        topicId: '',
        replyshow: false,
        curReplyId: ''
      }
    },
    filters: {
      getLastTimeStr (time, isFromNow) {
        return getLastTimeStr(time, isFromNow)
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo', 'showAlert'])
    },
    created () {
      this.getData(this.$route.params.id)
      if (this.loginStatus) {}
    },
    methods: {
      getLastTimeStrs (time, ago) {
        return getLastTimeStr(time, ago)
      },
      // 获取不同tab的样式或者标题
      getTabInfos (tab, good, top, isClass) {
        return getTabInfo(tab, good, top, isClass)
      },
      getData (id) {
        // 获取url传的tab参数
        this.topicId = this.$route.params.id
        this.$store.dispatch('detailes', id).then(res => {
          if (res.success) {
            this.topic = res.data
          } else {
            this.noData = true
          }
        })
      },
      isUps (ups) {
        return ups.indexOf(this.userInfo.id) >= 0
      },
      newsreplies (data) {
        this.$store.dispatch('replies', data).then(res => {
          if (res.success) {
            _.alert('操作成功')
            this.curReplyId = ''
            this.replyshow = false
            this.getData(this.$route.params.id)
          } else {
            _.alert(res.error_msg)
          }
        })
      },
      upReply (index) {
        let item = this.topic.replies[index]
        let data = {
          accesstoken: this.token,
          id: item.id
        }
        this.$store.dispatch('replyUps', data).then(res => {
          if (res.success) {
            if (res.action === 'down') {
              let reast = item.ups.indexOf(this.userInfo.id)
              item.ups.splice(reast, 1)
              _.alert('取消成功')
            } else {
              item.ups.push(this.userInfo.id)
              _.alert('操作成功')
            }
          } else {
            _.alert(res.error_msg)
          }
        })
      },
      addReply (id) {
        if (!this.userInfo.id) {
          this.$router.push({
            name: 'login'
          })
        }
        this.curReplyId = id
      },
      hideItemReply () {
        this.curReplyId = ''
      },
      replybox () {
        if (!this.userInfo.id) {
          this.$router.push({
            name: 'login'
          })
        }
        this.replyshow = !this.replyshow
      },
      backhome () {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/px2rem';
  .page {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .topic-title {
    padding: $gap;
    margin: $padding;
    font-size: 18px;
    color: $title;
    line-height: 1.5;
    background-color: $colorf0;
    border-radius: $gap;
  }

  .author-info {
    display: flex;
    align-items: center;
    padding: 0 $padding;
    color: $text;
    font-size: 12px;
    .col {
      display: block;
      width: 100%;
      flex: 1;
    }
    .avatar {
      display: block;
      width: 40px;
      height: 40px;
      margin-right: $padding;
      border-radius: 50%;
    }
    .right {
      text-align: right;
    }
    span,
    time {
      display: block;
      padding: 5px 0;
    }
    .tag {
      @extend .tag;
      color: #ffffff;
      &.top {
        background: #e74c3c;
      }
      &.ask {
        background: #3498db;
      }
      &.good {
        background: #e67e22;
      }
      &.job {
        background: #9b59b6;
      }
      &.share {
        background: #1abc9c;
      }
      &.dev {
        background: #2ad2c9;
      }
    }
  }

  .topic-content {
    padding: $padding;
    margin-top: $padding;
    background: #ffffff;
    border-bottom: solid 1px $colord4;
    .from {
      color: $red;
    }
  }

  .topic-reply {
    border-bottom: 1px solid #eef2f2;
    height: 1rem;
    strong {
      width: 24%;
      display: inline-block;
      text-align: center;
      font-size: 12px;
      line-height: 1rem;
      position: relative;
      color: #777;
      &::before {
        content: '';
        position: absolute;
        height: 1rem;
        top: 0;
        left: 0;
        width: 1px;
        background: #eef2f2 top;
      }
      span {
        margin-right: 5px;
      }
    }
  }

  .reply_num {
    margin-top: $gap*4;
    background-color: $colore7;
    padding: $gap*2 0 $gap*2 $gap*2;
    border-top: solid 1px $colord4;
    border-bottom: solid 1px $colord4;
  }

  .reply-list {
    width: 100%;
    margin-top: $gap*3;
    .reply-box {
      margin-right: 5%;
      margin-bottom: 10px;
    }
    ul {
      width: 100%;
      list-style: none;
      padding-left: 0; //评论列表
      .topic-list {
        display: flex;
        flex-wrap: wrap;
        .postuser {
          flex: 0 1 auto;
          padding-bottom: 10px;
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
        .postUser__portrait {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 70px;
          font-size: 20px;
          line-height: 0;
        }
        .postUser__name {
          color: #577727;
          font-size: 12px;
          font-weight: 700;
          line-height: 1px;
          text-align: center;
        }
        .postBody:after,
        .postBody:before {
          right: 100%;
          top: 35px;
          border: solid transparent;
          content: ' ';
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
        }
        .postBody {
          flex: 1 1 0%;
          position: relative;
          padding: 15px;
          border: 1px solid #cad0d2;
          border-radius: 4px;
          margin-right: 5%;
          &:after {
            border-color: transparent;
            border-right-color: #ffffff;
            border-width: 8px;
            margin-top: -8px;
          }
          &:before {
            border-color: transparent;
            border-right-color: #cad0d2;
            border-width: 9px;
            margin-top: -9px;
          }
        }
        .postBody__content {
          color: #57727c;
          font-size: 12px;
          img {
            width: 100%;
            max-width: 350px;
          }
        }
        .postBody__date {
          margin-top: 5px;
          color: #86969c;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .cr {
          align-self: flex-end;
          position: absolute;
          right: 10px;
          .uped {
            color: #2ad2c9;
          }
        }
      }
      li {
        width: 100%;
        list-style: none;
        margin-bottom: 15px;
      }
    }
  }

  /* 话题不存在 */

  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 10px;
    .tips-ico {
      margin-bottom: 20px;
      i {
        color: #86969c;
        font-size: 70px;
      }
    }
    .tips-title {
      color: #86969c;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 20px;
    }
    .tips-back {
      height: 40px;
      font-size: 15px;
      line-height: 40px;
      text-align: center;
      padding: 0 15px;
      border-radius: 4px;
      background: #54d9e0;
      color: #fff;
    }
  }

  /* 回复框样式 */

</style>
