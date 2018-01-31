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
      <div style="text-align:right;margin-top:20px;">
        <el-button type="primary" @click="saveNotice">确定</el-button>
      </div>
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
          :headers="headers"
          :data="{type: 1}"
          :action="'/admin/file_upload/uploadBg'| uploadPrefixUrl"
          list-type="picture-card"
          :show-file-list="false"
          :before-upload="beforeImageUpload"
          :on-progress="handleProgress"
          :on-success="handleImageSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>
      <h3 class="bg-title">视频背景</h3>
      <el-row class="row-flex">
        <upload-preview :list="videoBgs" type="video" :on-remove="handleRemove"></upload-preview>
        <el-upload
          accept="video/*"
          :headers="headers"
          :data="{type: 2}"
          :action="'/admin/file_upload/uploadBg'| uploadPrefixUrl"
          list-type="picture-card"
          :show-file-list="false"
          :before-upload="beforeVideoUpload"
          :on-progress="handleProgress"
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
            :headers="headers"
            :data="{type: 2}"
            :action="'/admin/file_upload/uploadAdvert'| uploadPrefixUrl"
            list-type="picture-card"
            :show-file-list="false"
            :before-upload="beforeImageUpload"
            :on-progress="handleProgress"
            :on-success="handleBigImgSuccess">
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
            :headers="headers"
            :data="{type: 1}"
            :action="'/admin/file_upload/uploadAdvert'| uploadPrefixUrl"
            list-type="picture-card"
            :show-file-list="false"
            :before-upload="beforeImageUpload"
            :on-progress="handleProgress"
            :on-success="handleMobileImgSuccess">
            <img v-if="form.mobileImgUrl" :src="form.mobileImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
         <p class="tip">支持jpg、png等格式，建议尺寸：1080 × 1920 或 720 × 1280</p>
       </el-col>
     </el-row>
    </el-card>
  </div> 
</template>

<script>
import UploadPreview from './componets/upload-preview'
import { mapGetters } from 'vuex'
import { addNotice } from '@/api/screen.js'
export default {
  name: 'bigScreenManage',
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  data() {
    return {
      textarea: '',
      form: {
        bigImgUrl: '',
        mobileImgUrl: ''
      },
      picBgs: [],
      videoBgs: [],
      headers: {}
    }
  },
  mounted() {
    this.headers = {
      tId: this.token
    }
  },
  methods: {
    saveNotice() {
      /* addNotice({content: this.textarea}).then((response) => {
        this.$message.success('添加成功')
      }) */
    },
    handleProgress(event, file, fileList) {
      console.log(event, file)
    },
    beforeVideoUpload(file) {
      const isWebm = file.type === 'video/webm'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isWebm) {
        this.$message.error('上传视频只能是 Webm 格式!')
        return isWebm
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过 10MB!')
      }
      return isWebm && isLt10M
    },
    beforeImageUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 2MB!');
      }
      return isLt2M
    },
    handleRemove(index) {
      this.picBgs.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleImageSuccess(response, file, fileList) {
      console.log(response)
      this.picBgs.push({
        url: file.url,
        id: response.result
      })
    },
    handleVideoSuccess(response, file, fileList) {   
      console.log(file)
      this.videoBgs.push({
        url: file.url,
        id: response.result
      })
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
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
