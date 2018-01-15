<template>
  <div class="fixed_bottom">
    <el-button v-for="(v, i) in btns" :key="i" :type="v.type" @click.native="btnClick(i)">{{v.text}}</el-button>
  </div>
</template>

<script>
export default {
  props: ['btns'],
  methods: {
    btnClick(index) {
      this.$emit('FixBtnClick', index)
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
}
</style>

