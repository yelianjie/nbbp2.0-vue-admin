<template>
  <div class="fixed_bottom">
    <el-button v-for="(v, i) in btns" :key="i" :type="v.type" @click.native="btnClick(i)" :loading="loading">{{v.text}}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  props: ['btns'],
  methods: {
    btnClick(index) {
      this.loading = true
      this.$emit('FixBtnClick', index, () => {
        this.loading = false
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.fixed_bottom {
  position: fixed;
  bottom: 0;
  left: 180px;
  right: 0;
  padding: 10px 32px;
  text-align: right;
  z-index: 1;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgba(0,0,0,.5);
  transition: left .28s;
}
#app .hideSidebar .fixed_bottom {
  left: 36px;
}
</style>

