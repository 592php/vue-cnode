<template>
  <div class="userCollect">
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
    this.getdata()
  },
  computed: {
    ...mapGetters(['loginStatus', 'userInfo'])
  },
  methods: {
    getdata () {
      this.loading = true
      this.$store.dispatch('getUser').then(res => {
        if (res.success) {
          this.replies = res.data.recent_replies
          this.topics = res.data.recent_topics
          this.datalist = this.replies
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/px2rem';

</style>