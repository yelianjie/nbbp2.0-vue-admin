<template>
	<el-row style="margin-bottom: 15px;">
		<el-col class="flex">
      <div :style="{'width': labelWidth == -1 ? 'auto' : labelWidth + 'px'}">{{links.title}}：</div>
      <div class="flex-1"><el-button size="small" v-for="(v, i) in links.links" :key="i" @click.native="select(v.value)" :class="{'active': type === v.value}">{{v.label}}</el-button></div>
		</el-col>
	</el-row>
</template>

<script>
export default {
  name: 'LinkSearch',
  model: {
    prop: 'type',
    event: 'setType'
  },
  props: {
    type: {
    },
    links: {
      type: Object,
      default: []
    },
    labelWidth: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
  	select (v) {
  	  this.$emit('setType', v)
  	  this.$emit('onClick')
  	}
  }
}
</script>

<style lang="scss">
.active {
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-1 {
  flex: 1;
}
</style>