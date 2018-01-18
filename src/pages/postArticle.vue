<template>
  <div class="add-activity">
    <form class="create-event " method="post" data-abide="" prevent-submit="false" novalidate="">
      	<div class="form-group">
			  标题：
				<input type="text" class="form-control destination1"  v-model="title" placeholder="文章标题" required >
			</div>
       <div class="form-group">
        选择分类：
       <v-select :options="itemClass" v-model="classfly"> </v-select>
      </div>
      <div class="event-edit form-group">
        <textarea class="form-control textarea" cols="30" rows="10" placeholder="输入文章内容" required v-model="content"></textarea>
      </div>
      <div id="btn_create_event" type="button" @click="post" class="btn cy-btn">确定发布</div>
    </form>
      <v-alert v-show="showAlert"></v-alert>
  </div>
</template>

<script>
  import vSelect from 'vue-select'
  import * as _ from '@/config/tool'
  import {
    mapGetters
  } from 'vuex'
  import alert from '@/components/alert'
  export default {
    components: {
      'v-alert': alert,
      vSelect
    },
    data() {
      return {
        title: '',
        content: '',
        selected: null,
        tab: 'dev',
        itemClass: [
          {
            label: '精华',
            value: 'good'
          },
          {
            label: '分享',
            value: 'share'
          },
          {
            label: '客户端测试',
            value: 'dev'
          }],
        classfly: '客户端测试'
      }
    },
    computed: {
      ...mapGetters(['token', 'showAlert'])
    },
    methods: {
      post() {
        if (!this.title) {
          _.alert('请输入文章标题')
          return
        }
        if (!this.content) {
          _.alert('请输入内容')
          return
        }
        let data = {
          title: this.title,
          tab: this.tab,
          content: this.content,
          accesstoken: this.token
        }
        this.$store.dispatch('postArticle', data).then(res => {
          if (res.success) {
            _.alert('发布成功')
            setTimeout(() => {
              this.$router.push('home')
            }, 1000)
          }
        })
      },
      address() {}
    },
    mounted() {}
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/px2rem';
  .add-activity {
    position: relative;
    padding: 10px;
    background: #fff;
    padding-bottom: px2rem(50px);
    .create-event {
      .form-group {
        display: flex;
        border-bottom: 1px solid #d8d8d8;
        line-height: px2rem(100px);
        .icon {
          color: #76d49b;
          padding: 0 px2rem(20px);
        }
        input {
          border: none;
          width: 80%;
          height: px2rem(80px);
          line-height: px2rem(80px);
          margin-top: px2rem(10px);
          box-shadow: none;
        }
        textarea {
          box-sizing: border-box;
          width: 100%;
          margin-top: px2rem(15px);
          padding: px2rem(20px) 0;
          height: px2rem(300px);
          border: none;
          overflow: hidden;
          resize: none;
          outline: none;
          overflow: auto;
        }
      }
      .btn {
        width: 100%;
        height: px2rem(100px);
        line-height: px2rem(100px);
      }
      #btn_create_event {
        background-color: #0bd38a;
        margin-top: px2rem(30px);
        color: #fff;
        font-size: 20px;
        text-align: center;
        height: px2rem(100px);
        line-height: px2rem(100px);
        margin-bottom: px2rem(50px);
        border-radius: 4px;
      }
    }
  }
.select-area{
  position: relative;
  overflow: hidden;  
  select{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
}
}


</style>