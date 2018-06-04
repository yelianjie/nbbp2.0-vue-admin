<template>
	<el-tooltip placement="left-end">
    <div slot="content" class="tooltip-custom"> 
      <p v-for="(v, i) in toolTipsData"  >
        {{v.title}} <template v-if="v.title">:</template> {{v.tooltip}}
      </p>
    </div>
    <i class="el-icon-question icon-custom"  ></i>
  </el-tooltip>
</template>

<script>
export default {
  name: 'toolTips',
  props: {
    toolTipsData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
.icon-custom {
  font-size: 24px;
  position: absolute;
  top: 2rem;
  right: 1.5rem;
  z-index: 1;
}
</style>