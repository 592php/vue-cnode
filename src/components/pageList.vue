<template>
 <section class="scroll-list" v-load-more="loadMores">
      <ul class="posts-list">
        <li v-for="item in datalist" :key="item.id">
          <router-link :to="{name:'detailes',params:{id:item.id}}">
          <h3 v-text="item.title" :class="getTabInfos(item.tab, item.good, item.top, true)" :title="getTabInfos(item.tab, item.good, item.top, false)">
          </h3>
          <div class="content-t">
            <img class="avatar" :src="item.author.avatar_url" />
            <div class="info">
              <p>
                <span class="name">{{item.author.loginname}}</span>
                <span class="status" v-if="item.reply_count > 0">
                            <b>{{item.reply_count}}</b>
                           /{{item.visit_count}}
                                                </span>
              </p>
              <p>
                <time>{{item.create_at | getLastTimeStr(true) }}</time>
                <time>{{item.last_reply_at |getLastTimeStr(true) }}</time>
              </p>
            </div>
          </div>
          </router-link>
        </li>
      </ul>
    </section>
</template>

<script>
import { getLastTimeStr, getTabInfo, loadMore } from '@/config/common'
export default {
  data () {
    return {
    }
  },
  filters: {
    getLastTimeStr (time, isFromNow) {
      return getLastTimeStr(time, isFromNow)
    }
  },
  props: ['datalist'],
  mixins: [loadMore],
  methods: {
    loadMores () {
      this.$emit('loads')
    },
     // 获取不同tab的样式或者标题
    getTabInfos (tab, good, top, isClass) {
      return getTabInfo(tab, good, top, isClass)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/css/px2rem';
  .scroll-list {
    background: #fff;
    .posts-list {
  background-color: $white;
  li {
    padding: 10px $padding;
    border-bottom: $border;
  }
  h3 {
    @extend .title;
    &:before {
      content: attr(title);
      margin-right: 10px;
      margin-top: -3px;
      @extend .tag;
      color: $white;
    }
    &.top:before {
      background: #e74c3c;
    }
    &.ask:before {
      background: #3498db;
    }
    &.good:before {
      background: #e67e22;
    }
    &.job:before {
      background: #9b59b6;
    }
    &.share:before {
      background: #1abc9c;
    }
    &.dev:before {
      background: #5c32a9;
    }
    &.replies:before {
      background: #1abc9c;
    }
    &.topics:before {
      background: #5c32a9;
    }
  }
  .content-t {
    padding-top: 10px;
    display: flex;
  }
  .avatar {
    @extend .user-avatar;
  }
  .info {
    display: block;
    width: 100%;
    flex: 1;
  }
  p {
    padding: 3px 0;
    display: flex;
    color: $text;
    font-size: $font-info;
    &:first-child {
      font-size: $font-content;
    }
    .name,
    time:first-child {
      display: block;
      width: 100%;
      flex: 1;
    }
    b {
      color: #42b983;
    }
  }
}
  }
</style>