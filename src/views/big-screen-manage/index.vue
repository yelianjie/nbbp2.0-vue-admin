<template>
  <div class="container" v-loading="loading">
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
      <div class="row-flex flex-align-center">
        <h3 class="bg-title flex-1">图片背景</h3>
        <el-upload
          accept="image/*"
          :headers="headers"
          :data="{type: 1}"
          :action="'/admin/file_upload/uploadBg'| uploadPrefixUrl"
          :show-file-list="false"
          :before-upload="beforeImageUpload"
          :on-progress="handleProgress"
          :on-success="handleImageSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-row class="row-flex">
        <upload-preview :list="picBgs" type="image" :on-remove="handleRemove"></upload-preview>
      </el-row>
      <div class="row-flex flex-align-center">
        <h3 class="bg-title flex-1">视频背景</h3>
        <el-upload
          accept="video/*"
          :headers="headers"
          :data="{type: 2}"
          :action="'/admin/file_upload/uploadBg'| uploadPrefixUrl"
          :show-file-list="false"
          :before-upload="beforeVideoUpload"
          :on-progress="handleProgress"
          :on-success="handleVideoSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-row class="row-flex">
        <upload-preview :list="videoBgs" type="video" :on-remove="handleRemove"></upload-preview>
      </el-row>
      <div class="row-flex flex-align-center">
        <h3 class="bg-title flex-1">手机视频背景</h3>
        <el-button size="small" type="primary" @click.native="dialogFormVisible = true">添加视频</el-button>
      </div>
      <el-row class="row-flex">
        <upload-preview :list="mp4s" type="video" :on-remove="handleMp4sRemove"></upload-preview>
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
            <img v-if="ad.bigImgUrl" :src="ad.bigImgUrl" class="avatar">
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
            <img v-if="ad.mobileImgUrl" :src="ad.mobileImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
         <p class="tip">支持jpg、png等格式，建议尺寸：1080 × 1920 或 720 × 1280</p>
       </el-col>
     </el-row>
    </el-card>
    <el-dialog title="添加手机视频" :visible.sync="dialogFormVisible" width="80%" @close="onDialogClose">
      <el-form :model="formMp4" label-width="120px">
        <el-form-item label="选择关联的视频">
          <el-row :gutter="20" style="margin-left:0;font-size:0;">
            <div class="video-preivew" v-for="(v, i) in videoBgs" :key="i" @click="choseParentId(i)">
              <label class="status-label" v-show="selectedMp4 === i">
                <i class="el-icon-upload-success el-icon-check"></i>
              </label>
              <video class="video" :src="v.url"></video>
            </div>
          </el-row>
        </el-form-item>
        <el-form-item label="MP4视频">
          <upload-preview :list="dialogMp4s" type="video" :on-remove="handleMp4Remove"></upload-preview>
          <el-upload
            accept="video/*"
            :headers="headers"
            :data="{type: 2}"
            :action="'/admin/file_upload/uploadBg'| uploadPrefixUrl"
            :show-file-list="false"
            :before-upload="beforeVideoUpload"
            :on-progress="handleProgress"
            :on-success="handleVideoMp4Success">
            <el-button size="small" type="primary" v-if="dialogMp4s.length == 0">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMp4">确 定</el-button>
      </div>
    </el-dialog>
  </div> 
</template>

<script>
import UploadPreview from './componets/upload-preview'
import { mapGetters } from 'vuex'
import * as Api from '@/api/screen.js'
import { uploadPrefixUrl } from '@/utils/common'
export default {
  name: 'bigScreenManage',
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: true,
      textarea: '',
      ad: {
        bigImgUrl: '',
        mobileImgUrl: ''
      },
      picBgs: [],
      videoBgs: [],
      headers: {},
      form: {
        
      },
      formMp4: {
        fid: '',
        id: ''
      },
      selectedMp4: -1,
      dialogMp4s: [],
      mp4s: []
    }
  },
  created() {
    const getNotice = Api.getNotice()
    const getBpImages = Api.getBpImages()
    const getBpVideos = Api.getBpVideos()
    const getAdImages = Api.getAdImages()
    const getBpVideoMp4 = Api.getBpVideoMp4()
    Promise.all([getNotice, getBpImages, getBpVideos, getAdImages, getBpVideoMp4]).then((result) => {
      const noticeResult = result[0].data
      const bpImagesResult = result[1].data
      const bpVideosResult = result[2].data
      const adImagesResult = result[3].data
      const bpVideoMp4Result = result[4].data
      console.log(adImagesResult)
      if (Array.isArray(noticeResult.result)) {
        this.textarea = noticeResult.result[0].content
      }
      
      if (Array.isArray(bpImagesResult.result)) {
        bpImagesResult.result.forEach((v) => {
          v.url = uploadPrefixUrl(v.url)
        })
        this.picBgs = bpImagesResult.result
      }

      if (Array.isArray(bpVideosResult.result)) {
        bpVideosResult.result.forEach((v) => {
          v.url = uploadPrefixUrl(v.url)
        })
        this.videoBgs = bpVideosResult.result
      }

      if (Array.isArray(adImagesResult.result)) {
        adImagesResult.result.forEach((v) => {
          v.url = uploadPrefixUrl(v.url)
          if (v.type == 1 && v.ht_id === '0') {
            this.ad.mobileImgUrl = v.url
          } else if (v.type == 2 && v.ht_id === '0') {
            this.ad.bigImgUrl = v.url
          }
        })
      }

      if (Array.isArray(bpVideoMp4Result.result)) {
        bpVideoMp4Result.result.forEach((v) => {
          v.url = uploadPrefixUrl(v.url)
        })
        this.mp4s = bpVideoMp4Result.result
      }

      this.loading = false
    }).catch((error) => {
      this.loading = false
      this.$message.error(error.message)
    })
  },
  mounted() {
    this.headers = {
      tId: this.token
    }
  },
  methods: {
    saveNotice() {
      Api.addNotice({content: this.textarea}).then((response) => {
        this.$message.success('更新成功')
      })
    },
    handleProgress(event, file, fileList) {
      console.log(event, file)
    },
    beforeVideoUpload(file) {
     /*  const isWebm = file.type === 'video/webm'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isWebm) {
        this.$message.error('上传视频只能是 Webm 格式')
        return isWebm
      } */
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过 10MB')
      }
      return isLt10M
    },
    beforeImageUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 2MB');
      }
      return isLt2M
    },
    handleMp4Remove(index, type) {
      this.$confirm('确定删除该资源吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = this.dialogMp4s[index].id
        Api.removeResource({id: id}).then((response) => {
          this.dialogMp4s.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((error) => {    
          this.$message({
            type: 'error',
            message: error.msg
          })
        })
      })
    },
    handleMp4sRemove(index, type) {
      this.$confirm('确定删除该资源吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = this.mp4s[index].id
        Api.removeResource({id: id}).then((response) => {
          this.mp4s.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((error) => {    
          this.$message({
            type: 'error',
            message: error.msg
          })
        })
      })
    },
    handleRemove(index, type) {
      console.log(index)
      this.$confirm('确定删除该资源吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = Number(type) == 1 ? this.picBgs[index].id : this.videoBgs[index].id
        Api.removeResource({id: id}).then((response) => {
          if (Number(type) == 1) {
            this.picBgs.splice(index, 1)
          } else {
            this.videoBgs.splice(index, 1)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((error) => {    
            this.$message({
              type: 'error',
              message: error.msg
            })
          })
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleImageSuccess(response, file, fileList) {
      console.log(response)
      this.picBgs.push({
        url: file.url,
        id: response.result,
        type: 1
      })
    },
    handleVideoSuccess(response, file, fileList) {   
      console.log(file)
      this.videoBgs.push({
        url: file.url,
        id: response.result,
        type: 2
      })
    },
    handleVideoMp4Success(response, file, fileList) {
      this.formMp4.id = response.result
      this.dialogMp4s = []
      this.dialogMp4s.push({
        url: file.url,
        id: response.result,
        type: 2
      })
    },
    handleBigImgSuccess(res, file) {
      this.ad.bigImgUrl = URL.createObjectURL(file.raw)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    handleMobileImgSuccess(res, file) {
      this.ad.mobileImgUrl = URL.createObjectURL(file.raw)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
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
    },
    choseParentId(index) {
      if (this.selectedMp4 === index) {
        this.selectedMp4 = -1
      } else {
        this.selectedMp4 = index
      }
    },
    addMp4() {
      if (this.selectedMp4 === -1) {
        this.$message.error('请选择关联视频')
        return false
      }
      this.formMp4.fid = this.videoBgs[this.selectedMp4].id
      Api.addMp4Url(this.formMp4).then((response) => {
        this.mp4s.push(this.dialogMp4s[0])
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.dialogFormVisible = false
      })
    },
    onDialogClose() {
      this.dialogMp4s = []
    }
  },
  components: {
    UploadPreview
  }
}
</script>

<style lang="scss" scoped>
.container /deep/ .el-upload-list__item:hover {
  background: transparent;
}
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
.flex-align-center {
  align-items: center;
}
.flex-1 {
  flex: 1;
}
.bg-title {
  font-weight: normal;
  font-size: 15px;
  color: #6c6c6c;
}
.video-preivew {
  position: relative;
  width: 148px;
  height: 148px;
  overflow: hidden;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 6px;
  display: inline-block;
  .status-label {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
    box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
    z-index: 1;
    i {
      font-size: 12px;
      margin-top: 11px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      color: #fff;
    }
  }
}
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  display: block;
}
</style>
