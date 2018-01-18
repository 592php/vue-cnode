<template>
  <div class="nav-box clearfix">
      <ul class="nav-bar">
        <li v-for="(item, index) in itemTab" :key="index" class="nav-bar-item" :class="{'nav-bar-active':initIndex === index}" @click="changeTab(index)">
          {{item.title}}
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          loading: false,
          initIndex: 0
        }
      },
      props: ['itemTab'],
      methods: {
        changeTab(index) {
          window.scroll(0, 0)
          this.initIndex = index
          this.$emit('change', index)
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import '../assets/css/px2rem';
    .nav-box {
      // position: fixed;
      // top: px2rem(100px);
      z-index: 1;
      width: 100%;
      height: px2rem(100px);
      line-height: px2rem(100px);
      text-align: center;
      background: #fff;
      .nav-bar {
        display: flex;
        .nav-bar-item {
          flex: 1;
          font-size: 14px;
          border-bottom: 1px solid #ddd;
        }
        .nav-bar-active {
          border-bottom: 3px solid #76d49b;
          color: #76d49b;
        }
      }
    }
</style>