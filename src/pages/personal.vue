<template>
	<div class="user">
		<div v-if="!loginStatus">
			<div class="user-h">
				<div class="avatar u-avatar">
					<img src="../assets/images/user-img0.jpg" alt="">
				</div>
				<div class="u-button">
					<router-link to="/login" class="t-login">登录</router-link>
					<router-link to="/register" class="t-regist">注册</router-link>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="user-h islogin">
				<div class="avatar i-avatar">
					<img :src="userInfo.avatar_url" alt="">
				</div>
				<div class="user-d">
					<p class="username">{{userInfo.loginname}}</p>
				</div>
			</div>
		</div>
    <div class="user-h-list">
			<ul>
				<li>
					<router-link to="/myarticle/replies">
              <span class="num">{{replies}}</span> 
						<span>最近回复</span>
					</router-link>
				</li>
				<li>
					<router-link to="/myarticle/collect">
						<span>我的收藏</span>
					</router-link>
				</li>
				<li>
					<router-link to="/myarticle/topics">
            <span class="num">{{topics}}</span> 
						<span>我的文章</span>
					</router-link>
				</li>
			</ul>
		</div>
		<group :cell-lists="cellLists1"></group>
		<group :cell-lists="cellLists2"></group>
	</div>
</template>

<script>
import group from '@/components/group'
import { mapGetters } from 'vuex'
export default {
  components: {
    group
  },
  data () {
    return {
      cellLists1: [
        {
          link: '',
          iconUrl: 'http://hzzly.net/xyy-vue/images/user-cert.png',
          text: '我的消息',
          desc: '',
          badg: '',
          more: true
        },
        {
          link: '',
          iconUrl: 'http://hzzly.net/xyy-vue/images/user-detail.png',
          text: '我的收藏',
          desc: '',
          badg: '',
          more: true
        },
        {
          link: '',
          iconUrl: 'http://hzzly.net/xyy-vue/images/user-message.png',
          text: '个人资料',
          desc: '',
          badg: '',
          more: true
        }
      ],
      cellLists2: [
        {
          link: '',
          iconUrl: 'http://hzzly.net/xyy-vue/images/user-set.png',
          text: '关于',
          desc: '',
          badg: '',
          more: true
        },
        {
          link: '',
          iconUrl: 'http://hzzly.net/xyy-vue/images/user-call.png',
          text: '联系邮箱',
          desc: '326959013@qq.com',
          badg: '',
          more: true
        }
      ],
      pubTotravelNum: 0,
      pubTosportNum: 0,
      replies: 0,
      topics: 0

    }
  },
  created () {
    if (this.loginStatus) {
      this.$store.dispatch('getMessage').then(res => {
        if (res.success) {
          // console.log(res)
        }
      })
      this.$store.dispatch('getUser').then(res => {
        if (res.success) {
          this.replies = res.data.recent_replies.length
          this.topics = res.data.recent_topics.length
        }
      })
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'userInfo'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/px2rem';

.user {
  height: 100%;
  .islogin {
    display: flex;
    flex-direction: column;
      justify-content: center;
      align-items: center;
    .i-avatar {
      display: flex;
      // margin: px2rem(40px) px2rem(30px) 0;
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
  .circle {
    display: flex;
    justify-content: space-between;
    height: px2rem(150px);
    line-height: px2rem(150px);
    background: #fff;
    margin-bottom: px2rem(20px);
    > div:first-child {
      display: flex;
    }
    .circle-n {
      width: px2rem(100px);
      text-align: center;
      font-size: 15px;
    }
    .circle-p {
      li {
        display: inline-block;
        width: px2rem(120px);
        height: px2rem(120px);
        margin-top: px2rem(15px);
        img {
          width: 100%;
        }
      }
    }
  }
  .circle-more {
    img {
      width: px2rem(35px);
      height: px2rem(35px);
      margin-top: px2rem(60px);
      margin-right: px2rem(20px);
    }
  }
  .user-h-list {
    background: #fff;
    padding: px2rem(20px) 0;
    margin-bottom: px2rem(20px);
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        height: px2rem(80px);
        line-height: px2rem(80px);
        border-right: 1px solid #89f0eb;
        font-size: 14px;
        &:last-child {
          border-right: none;
        }
        a {
          display: block;
          .num {
            color: #2ad2c9;
          }
        }
      }
    }
  }
}
</style>