<template>
  <div class="summary-tip">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.summary-tip {
  background-color: #f4f4f5;
  color: #909399;
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  /deep/ .el-tag {
    margin: 0 4px;
  }
}
</style>
