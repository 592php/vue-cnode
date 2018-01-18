<template>
  <div class="navbar">
    <v-nav :itemTab="itemTab" @change="changeTab" ></v-nav>
    <v-list :datalist="datalist" @loads="loadMore"></v-list>
    <v-loading v-show="loading"></v-loading>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loading from '@/components/loading'
import tab from '@/components/tab'
import pageList from '@/components/pageList'
export default {
  components: {
    'v-loading': loading,
    'v-nav': tab,
    'v-list': pageList
  },
  data() {
    return {
      initIndex: 0,
      params: {
        page: 1,
        limit: 10,
        tab: 'all'
      },
      datalist: [],
      listMore: true,
      loading: false,
      itemTab: [
        {
          title: '全部',
          type: 'all'
        },
        {
          title: '精华',
          type: 'good'
        },
        {
          title: '分享',
          type: 'share'
        },
        {
          title: '客户端测试',
          type: 'dev'
        }
      ],
      id: ''
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getdata()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    changeTab(index) {
      window.scroll(0, 0)
      this.initIndex = index
      this.params.tab = this.itemTab[index].type
      this.getdata(true)
    },
    post() {
      this.$router.push('/user/post')
    },
    getdata(tab) {
      this.loading = true
      this.$store.dispatch('getList', this.params).then(res => {
        if (res.success) {
          if (tab) {
            this.datalist = res.data
          } else {
            if (res.data.length < 10) {
              this.listMore = false
            }
            this.datalist = res.data.concat(this.datalist)
          }
        }
        this.loading = false
      })
    },
    loadMore() {
      if (this.listMore && !this.loading) {
        this.params.page++
        this.getdata()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/px2rem';
.navbar {
  padding-bottom: px2rem(100px);
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