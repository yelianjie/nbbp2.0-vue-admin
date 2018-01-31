<template>
 <div class="container">
   <el-tabs v-model="currentView" @tab-click="handleClick">
    <el-tab-pane label="霸屏时间" name="bptime"></el-tab-pane>
    <el-tab-pane label="霸屏主题" name="bptheme"></el-tab-pane>
    <el-tab-pane label="霸屏礼物" name="bpgift"></el-tab-pane>
  </el-tabs>
  <div class="subView">
    <component :is="currentView"></component>
  </div>
 </div>
</template>

<script>
import bptime from './bptime/index'
import bptheme from './bptheme/index'
import bpgift from './bpgift/index'
export default {
  name: 'resourceManage',
  data() {
    return {
      currentView: 'bptheme'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.currentView = tab.name
    }
  },
  components: {
    bptime,
    bptheme,
    bpgift
  }
}
</script>

<style lang="scss">
.avatar-uploader  {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
