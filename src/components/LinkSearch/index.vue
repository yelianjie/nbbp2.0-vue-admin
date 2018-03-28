<template>
	<el-row style="margin-bottom: 15px;">
		<el-col>
			{{links.title}}：
			<el-button v-for="(v, i) in links.links" :key="i" @click.native="select(v.value)" :class="{'active': type == v.value}">{{v.label}}</el-button>
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
  props: ['type', 'links'],
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
</style>