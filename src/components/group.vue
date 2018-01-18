<template>
    <div class="group">
        <cell v-for="(item,index) in cellLists" 
            :link="item.link" 
            :icon-url="item.iconUrl" 
            :text="item.text" 
            :desc="item.desc" 
            :badg="item.badg"
            :more="item.more"
            :key="index">
        </cell>
    </div>
</template>

<script>
import cell from '@/components/userCell'

export default {
  props: {
    cellLists: Array
  },
  components: {
    cell
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/px2rem';

.group {
    margin-bottom: px2rem(20px);
}

</style>