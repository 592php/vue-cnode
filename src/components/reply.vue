<template>
  <section class="reply">
    <textarea id="content" rows="8" class="text" :class="{'err':hasErr}" v-model="content" placeholder='请输入评论内容'>
      </textarea>
    <a class="button" @click="addReply">确定</a>
  </section>
</template>

<script>
import { linkUsers } from '@/config/common'
// const markdown = require('markdown').markdown
export default {
  replace: true,
  props: ['topic', 'replyId', 'topicId', 'replyTo', 'show'],
  data () {
    return {
      hasErr: false,
      content: ''
    }
  },
  computed: {},
  mounted () {
    if (this.replyTo) {
      this.content = `@${this.replyTo} `
    }
  },
  methods: {
    addReply () {
      if (!this.content) {
        this.hasErr = true
      } else {
        let linkUser = linkUsers(this.content)
        // let htmlText = markdown.toHTML(linkUser)
        // let replyContent = `<div class="markdown-text">${htmlText}</div>`
        let replyContent = `${linkUser}`
        let postData = {
          accesstoken: this.$store.getters.token,
          content: replyContent,
          topic_id: this.topicId
        }
        if (this.replyId) {
          postData.reply_id = this.replyId
        }
        this.$emit('replies', postData)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/px2rem';
.reply {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-right: 5%;
  padding-top: 5px;
  justify-content: flex-end;
  .text {
    background: #f4f7f7;
    margin-left: 80px;
    border-radius: 4px;
    border: none;
    font-size: 15px;
    width: 100%;
    padding: 10px;
    height: 88px;
    resize: none;
  }
  .button{
    margin-top:10px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
    padding: 0 15px;
    border-radius: 4px;
    background: #54d9e0;
    color: #fff;
  }
}
</style>
