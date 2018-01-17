<template>
  <div class="edit-container container">
    <h3 style="margin-top: 0;">CMK酒吧</h3>
    
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="酒吧名称">
              <el-input v-model="form.name" placeholder="请填写酒吧名称"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="form.mobile" placeholder="请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="代理选择">
              <el-select v-model="form.agent" placeholder="请选择代理选择">
                <el-option
                  v-for="item in agents"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒吧管理">
              <el-select v-model="form.manager" placeholder="请选择酒吧管理">
                <el-option
                  v-for="item in managers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒吧地址">
              <span class="address"><svg-icon icon-class="position" />浙江省宁波市鄞州区日丽中路700号<el-button @click.native="visibleMap = true">编辑</el-button></span>
            </el-form-item>
          </el-col>
          <el-col :xs="22" :sm="10" :md="10" :lg="10" :xl="10" :offset="2">
            <div class="upload-wrap">
              <div class="upload-text">上传图片</div>
              <div class="upload-inner">
                <el-upload
                  class="avatar-uploader"
                  accept="image/*"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleLogoSuccess"
                  :before-upload="beforeLogoUpload">
                  <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="format-tip">支持JPG、PNG等图片格式</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="line"></div>
        <el-form-item label="审核状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">审核通过</el-radio>
            <el-radio label="2">审核不通过</el-radio>
            <el-radio label="3">解约</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分成比例设置</span>
      </div>
      <el-form ref="rateForm" :model="rateForm" label-width="80px">
        <el-row class="rate-row">
          <el-col>
            <span class="percent-tip">酒吧用户</span>
            <el-input-number v-model="rateForm.user_rate" controls-position="right" @change="handleChange" size="small" :min="1" :max="25" class="input-number-percent"></el-input-number>%
          </el-col>
        </el-row>
        <el-row class="rate-row">
          <el-col>
            <span class="percent-tip">酒吧商户</span>
            <el-input-number v-model="rateForm.business_rate" controls-position="right" @change="handleChange" size="small" :min="1" :max="25" class="input-number-percent"></el-input-number>%
            <span class="percent-tip">酒吧管理</span>
            <el-input-number v-model="rateForm.barmanager_rate" controls-position="right" @change="handleChange" size="small" :min="1" :max="70" class="input-number-percent"></el-input-number>%
            <span class="percent-tip">代理</span>
            <el-input-number v-model="rateForm.barmanager_rate" controls-position="right" @change="handleChange" size="small" :min="1" :max="70" class="input-number-percent"></el-input-number>%
            <span class="percent-tip">牛霸平台</span>
            <el-input-number :disabled="true" v-model="rateForm.platform_rate" controls-position="right" size="small" :min="1" :max="70" class="input-number-percent"></el-input-number>%
          </el-col>
        </el-row>
        <p class="tip">酒吧用户参与分成：酒吧用户+商户+酒吧管理+代理 +牛霸平台=100%</p>
        <p class="tip">酒吧用户不参与分成：商户+酒吧管理+代理 +牛霸平台=100%</p>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>霸屏地址</span>
      </div>
      <div class="url-wrap">
        <div class="url-item">
          <p>&emsp;大屏URL：{{url}}<el-button type="primary" plain v-clipboard:copy='url' v-clipboard:success='clipboardSuccess'>复制</el-button><el-button type="primary" plain @click.native="openNewWindow">打开</el-button></p>
          <p>手机端URL：{{url}}<el-button type="primary" plain v-clipboard:copy='url' v-clipboard:success='clipboardSuccess'>复制</el-button></p>
        </div>
        <div class="qrcode-img">
          <img src="http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png">
        </div>
      </div>
    </el-card>
    <fix-bottom-btns :btns="actionBtns" @FixBtnClick="handleBtnClick"></fix-bottom-btns> 
    <BaiduMap v-if="visibleMap" @closeDialog="closeDialog"></BaiduMap>
  </div>
</template>

<script>
import FixBottomBtns from '@/components/FixBottomBtns/index'
import BaiduMap from '../components/map'
import clipboard from '@/directive/clipboard/index.js'
export default {
  name: 'barManageEdit',
  directives: {
    clipboard
  },
  data() {
    return {
      url: 'http://nb.siweiquanjing.com/app/index.php?i=15&c=entry&do=BigScreen&m=bl_wx_wall&jiubaid=130',
      visibleMap: false,
      actionBtns: [{
        text: '确定',
        type: 'primary'
      }],
      form: {
        name: '',
        agent: '',
        manager: '',
        status: '2',
        logoUrl: ''
      },
      rateForm: {
        user_rate: 10,
        business_rate: 50,
        barmanager_rate: 10,
        platform_rate: 25
      },
      agents: [{
        label: '张三',
        value: '1'
      }, {
        label: '李四',
        value: '2'
      }],
      managers: [{
        label: '张三',
        value: '1'
      }, {
        label: '李四',
        value: '2'
      }]
    }
  },
  methods: {
    handleBtnClick(index) {

    },
    handleChange(value) {
      console.log(value)
    },
    handleLogoSuccess(res, file) {
      this.form.logoUrl = URL.createObjectURL(file.raw);
    },
    beforeLogoUpload(file) {
      const isLt100K= file.size / 1024 < 100;
      if (!isLt100K) {
        this.$message.error('上传图片大小不能超过 100K!');
      }
      return isLt100K
    },
    closeDialog(data) {
      if (data != null) {
        console.log(data)
      }
      this.visibleMap = false
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
    openNewWindow() {
      window.open(this.url)
    }
  },
  components: {
    FixBottomBtns,
    BaiduMap
  }
}
</script>

<style lang="scss" scoped>
$color: #606266;
.box-card {
  margin-bottom: 40px;
}
.address {
  button {
    margin-left: 20px;
  }
}
.upload-wrap {
  display: flex;
  .upload-text {
    font-size: 14px;
    color: $color;
    font-weight: 700;
  }
  .upload-inner {
    flex: 1;
    margin-left: 15px;
  }
  .avatar-uploader-icon {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .avatar {
    width: 100px;
    height: 100px;
  }
  .format-tip {
    color: $color;
    font-size: 13px;
    margin-top: 20px;
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
}
.line {
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
}
.percent-tip {
  font-size: 14px;
  &:not(:first-child) {
    margin-left: 40px;
  }
}
.rate-row {
  margin-bottom: 14px;
}
.input-number-percent {
  margin: 0 5px;
}
.tip {
  color: $color;
  font-size: 14px;
  line-height: 16px;
  padding-left: 60px;
  &:first-of-type {
    margin-top: 30px;
  }
}
.url-wrap {
  padding: 0 20px;
  font-size: 14px;
}
.qrcode-img img {
  width: 200px;
  height: 200px;
}
.url-item {
  /deep/ button:first-of-type {
    margin-left: 15px;
  }
}
</style>
