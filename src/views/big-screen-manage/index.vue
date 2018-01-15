<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>平台公告</span>
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>背景添加</span>
      </div>
      <el-row>
        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>广告图设置</span>
      </div>
     <el-row>
       <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
         <p>大屏幕端：</p>
          <el-upload
            class="avatar-uploader"
            accept="image/*"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleBigImgSuccess"
            :before-upload="beforeBigImgUpload">
            <img v-if="form.bigImgUrl" :src="form.bigImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
         <p class="tip">支持jpg、png等格式 建议尺寸大小：1920*1080</p>
       </el-col>
       <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
         <p>手机端：</p>
         <el-upload
            class="avatar-uploader"
            accept="image/*"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleMobileImgSuccess"
            :before-upload="beforeMobileImgUpload">
            <img v-if="form.mobileImgUrl" :src="form.mobileImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
         <p class="tip">支持jpg、png等格式，建议尺寸：1080 × 1920 或 720 × 1280</p>
       </el-col>
     </el-row>
    </el-card>
    <fix-bottom-btns :btns="actionBtns" @FixBtnClick="handleBtnClick"></fix-bottom-btns>
  </div> 
</template>

<script>
import FixBottomBtns from '@/components/FixBottomBtns/index'
export default {
  name: 'bigScreenManage',
  data() {
    return {
      textarea: '',
      actionBtns: [{
        text: '确定',
        type: 'primary'
      }],
      form: {
        bigImgUrl: '',
        mobileImgUrl: ''
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemoveBigScreenPic(file, fileList) {

    },
    handleRemoveMobilePic(file, fileList) {

    },
    handleBtnClick(index) {
      console.log(index)
    },
    handleBigImgSuccess(res, file) {
      this.bpThemeForm.img = URL.createObjectURL(file.raw);
    },
    handleMobileImgSuccess(res, file) {
      this.bpThemeForm.img = URL.createObjectURL(file.raw);
    },
    beforeBigImgUpload(file) {
      const isLt300K= file.size / 1024 < 300;
      if (!isLt300K) {
        this.$message.error('上传图片大小不能超过 300K!');
      }
      return isLt300K
    },
    beforeMobileImgUpload(file) {
      const isLt100K= file.size / 1024 < 100;
      if (!isLt100K) {
        this.$message.error('上传图片大小不能超过 100K!');
      }
      return isLt100K
    }
  },
  components: {
    FixBottomBtns
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 60px;
}
.tip {
  color: #c3c3c3;
  font-size: 14px;
}
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
