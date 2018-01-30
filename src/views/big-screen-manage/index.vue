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
      <h3 class="bg-title">图片背景</h3>
      <el-row class="row-flex">
        <upload-preview :list="picBgs" type="image" :on-remove="handleRemove"></upload-preview>
        <el-upload
          accept="image/*"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :show-file-list="false"
          :on-progress="handleProgress"
          :on-success="handlePictureSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>
      <h3 class="bg-title">视频背景</h3>
      <el-row class="row-flex">
        <upload-preview :list="videoBgs" type="video" :on-remove="handleRemove"></upload-preview>
        <el-upload
          accept="video/webm"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="handleVideoSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
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
import UploadPreview from './componets/upload-preview'
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
      },
      picBgs: [],
      videoBgs: []
    }
  },
  mounted() {

  },
  methods: {
    handleProgress(event, file, fileList) {
      console.log(event, file)
    },
    beforeUpload(file) {
      console.log(file)
    },
    handleRemove(index) {
      this.picBgs.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureSuccess(response, file, fileList) {
      console.log(file)
      this.picBgs.push(file)
    },
    handleVideoSuccess(response, file, fileList) {   
      console.log(file)
      this.videoBgs.push(file)
    },
    handleRemoveBigScreenPic(file, fileList) {

    },
    handleRemoveMobilePic(file, fileList) {

    },
    handleBtnClick(index) {
      console.log(index)
    },
    handleBigImgSuccess(res, file) {
      this.form.bigImgUrl = URL.createObjectURL(file.raw);
    },
    handleMobileImgSuccess(res, file) {
      this.form.mobileImgUrl = URL.createObjectURL(file.raw);
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
    FixBottomBtns,
    UploadPreview
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
.row-flex {
  display: flex;
}
.bg-title {
  font-weight: normal;
  font-size: 15px;
  color: #6c6c6c;
}
</style>
