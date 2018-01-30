<template>
  <div class="page">
    <div :class="{'show-menu':showMenu}" v-if="topic.title">
      <h2 class="topic-title" v-text="topic.title"></h2>
      <section class="author-info">
        <img class="avatar" :src="topic.author.avatar_url" />
        <div class="col">
          <span>{{topic.author.loginname}}</span>
          <time>
            发布于:{{topic.create_at | getLastTimeStr(true)}}
          </time>
        </div>
        <div class="right">
          <span class="tag" :class="getTabInfos(topic.tab, topic.good, topic.top, true)" v-text="getTabInfos(topic.tab, topic.good, topic.top, false)">
          </span>
          <span class="name">{{topic.visit_count}}次浏览</span>
        </div>
      </section>
      <section class='markdown-body topic-content' v-html="topic.content">
      </section>
      <h3 class="topic-reply">
        <strong>{{topic.reply_count}}</strong> 回复
      </h3>
      <section class="reply-list">
        <ul>
          <li v-for="(item,index) in topic.replies" :key="index">
            <section class="user">
              <router-link :to="{name:'user',params:{loginname:item.author.loginname}}">
                <img class="head" :src="item.author.avatar_url" />
              </router-link>
              <div class="info">
                <span class="cl">
                  <span class="name" v-text="item.author.loginname"></span>
                  <span class="name mt10">
                    <span></span> 发布于:{{item.create_at | getLastTimeStr(true)}}</span>
                </span>
                <span class="cr">
                  <span @click="upReply(index)"  :class="{'uped':isUps(item.ups)}" class="iconfont icon-dianzan"></span> {{item.ups.length}}
                  <span class="iconfont icon-iconfankui" @click="addReply(item.id)"></span>
                </span>
              </div>
            </section>
            <div class="reply_content" v-html="item.content"></div>
            <nv-reply :topic.sync="topic" :topic-id="topicId" :reply-id="item.id" :reply-to="item.author.loginname" :show.sync="curReplyId"
              @close="hideItemReply" v-if="userInfo.id && curReplyId === item.id"></nv-reply>
          </li>
        </ul>
      </section>
    </div>
    <div class='no-data' v-if="noData">
      <i class="iconfont icon-empty">&#xe60a;</i> 该话题不存在!
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
      if (this.loginStatus) { }
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
        this.$store.dispatch('detailes', id).then(res => {
          if (res.success) {
            this.topic = res.data
          }
        })
      },
      isUps (ups) {
        return ups.indexOf(this.userInfo.id) >= 0
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
        this.curReplyId = id
        if (!this.userInfo.id) {
          this.$router.push({
            name: 'login'
          })
        }
      },
      hideItemReply () {
        this.curReplyId = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/px2rem';
  .page {
    width: 100%;
    height: 100%;
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
    @extend .title;
    padding: $padding;
    border-bottom: solid 1px $colord4;
    strong {
      color: #42b983;
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
    ul {
      width: 100%;
      list-style: none;
      padding-left: 0;
      li {
        width: 100%;
        list-style: none;
        border-bottom: solid 1px $colord4;
        &:last-child {
          border-bottom: none;
        }
        .uped {
          color: $color80;
        }
        .icon {
          font-size: 26px;
        }
        .from {
          color: $red;
        }
        .language-javascript {
          background-color: $colorf0;
          overflow-x: auto;
        }
      }
    }
  }

  /* 回复框样式 */

  .reply {
    margin: 0 $padding;
    textarea {
      display: block;
      width: 100%;
      flex: 1;
      border: $border;
      background-color: #fff;
      font-size: 14px;
      padding: $padding;
      color: #313131;
    }
    .button {
      display: inline-block;
      width: 100%;
      height: 42px;
      margin: $padding 0;
      line-height: 42px;
      color: #fff;
      font-size: 16px;
      background-color: #4fc08d;
      border: none;
      border-bottom: 2px solid #3aa373;
      text-align: center;
      vertical-align: middle;
    }
  }

  .display-flex {
    display: -moz-box;
    /* Firefox */
    display: -ms-flexbox;
    /* IE10 */
    display: -webkit-box;
    /* Safari */
    display: -webkit-flex;
    /* Chrome, WebKit */
    display: flexbox;
    display: flex;
  }

  .break {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user {
    width: 95%;
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
        .iconfont{
          font-size: 22px;
          font-weight: bold;
        }
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
</style>