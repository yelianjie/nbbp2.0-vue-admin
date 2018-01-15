<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: 'APP'
  }
</script>

<style lang="scss">
.container {
  padding: 116px 32px 32px;
}
.el-date-editor .el-range-separator {
  box-sizing: content-box;
}
/* .main-container {
  display: flex;
  flex-direction: column;
}
.app-main {
  flex: 1;
  overflow: auto;
} */
</style>

