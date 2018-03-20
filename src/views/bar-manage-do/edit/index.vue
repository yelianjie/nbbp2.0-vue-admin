<template>
  <div class="edit-container container">
    <h3 style="margin-top: 0;">{{form.name}}</h3>
    
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="酒吧名称" prop="name">
              <el-input v-model="form.name" placeholder="请填写酒吧名称"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contact_tel">
              <el-input type="number" v-model.number="form.contact_tel" placeholder="请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="代理选择">
              <el-select v-model="selectAgent" placeholder="请选择代理选择" clearable>
                <el-option
                  v-for="item in agents"
                  :key="item.id"
                  :label="item.name"
                  :value="item.mc_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒吧管理">
              <el-select v-model="selectManager" placeholder="请选择酒吧管理" clearable>
                <el-option
                  v-for="item in managers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒吧地址">
              <span class="address"><svg-icon icon-class="position" />{{form.province_name}}{{form.city_name}}{{form.area_name}}{{form.address}}<el-button @click.native="visibleMap = true">编辑</el-button></span>
            </el-form-item>
          </el-col>
          <el-col :xs="22" :sm="10" :md="10" :lg="10" :xl="10" :offset="2">
            <div class="upload-wrap">
              <div class="upload-text">酒吧LOGO</div>
              <div class="upload-inner">
                <el-upload
                  class="avatar-uploader"
                  accept="image/*"
                  action=""
                  :http-request="uploadLogo"
                  :show-file-list="false"
                  :before-upload="beforeLogoUpload">
                  <img v-if="form.logo" :src="form.logo | uploadPrefixUrl" class="avatar">
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
            <el-radio label="0">审核不通过</el-radio>
            <el-radio label="-1">解约</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button type="primary" @click.native="updateBarAction">确定</el-button>
        </el-row>
        
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分成比例设置</span>
      </div>
      <el-form ref="rateForm" :model="form" label-width="80px">
        <el-row class="rate-row">
          <el-col>
            <span class="percent-tip">酒吧用户</span>
            <el-input-number v-model="form.users_separate" controls-position="right" @change="handleChangeUser" size="small" :min="1" :max="100" class="input-number-percent"></el-input-number>%
            <span style="font-size:13px;margin-left:15px;">当前修改不高于{{rate.user_divide_into}}%</span>
          </el-col>
        </el-row>
        <el-row class="rate-row">
          <el-col>
            <span class="percent-tip">酒吧商户</span>
            <el-input-number v-model.number="form.ht_separate" controls-position="right" @change="handleChange1" size="small" :min="1" :max="maxBar" class="input-number-percent"></el-input-number>%
            <span class="percent-tip">酒吧管理</span>
            <el-input-number :disabled="disableManagers" v-model.number="form.manage_separate" controls-position="right" @change="handleChange2" size="small" :min="0" :max="maxBar" class="input-number-percent"></el-input-number>%
            <span class="percent-tip">代理</span>
            <el-input-number :disabled="disableAgent" v-model.number="form.yewu_separate" controls-position="right" @change="handleChange3" size="small" :min="0" :max="agentCal" class="input-number-percent"></el-input-number>%
            <span style="font-size:13px;margin-left:15px;">当前修改不高于{{agentCal}}%</span>
            <span class="percent-tip">牛霸平台</span>
            <el-input-number :disabled="true" v-model.number="form.company_separate" controls-position="right" size="small" :min="1" :max="100" class="input-number-percent"></el-input-number>%
            <span style="font-size:13px;margin-left:15px;">当前修改不低于{{rate.platform_divide_into}}%</span>
          </el-col>
        </el-row>
        <div class="explain-tip">
          <div>分成说明：</div>
          <div class="tip-main">
            <p class="tip">酒吧用户参与分成：酒吧用户+商户+酒吧管理+代理 +牛霸平台=100%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;酒吧用户不参与分成：商户+酒吧管理+代理 +牛霸平台=100%</p>
            <p class="tip">若A用户花100元，打赏给B用户，100元收益如何分成？</p>
            <p class="tip">由于礼物打赏为后台设置的用户参与分成产品，假设用户分成设置为50%，则B用户收益为：100X50%=50元，商户、管理、代理、平台等按各自的分成比例分成。</p>
            <p class="tip">若A用户花100元，为B用户主题霸屏，100元收益如何分成？</p>
            <p class="tip">由于主题霸屏为后台设置的用户不参与分成产品，即用户不参与分成，该订单的100元由商户、管理、代理、平台按照各自的比例分成。</p>
          </div>
        </div>
      </el-form>
      <el-row style="text-align: right;">
          <el-button type="primary" @click.native="updateRateAction">确定</el-button>
        </el-row>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>霸屏地址</span>
      </div>
      <div class="url-wrap">
        <div class="url-item">
          <p>&emsp;大屏URL：{{$route.params.id | filterUrl('screen')}}<el-button type="primary" plain v-clipboard:copy='$options.filters.filterUrl($route.params.id, "screen")' v-clipboard:success='clipboardSuccess'>复制</el-button><el-button type="primary" plain @click.native="openNewWindow">打开</el-button></p>
          <p>手机端URL：{{$route.params.id | filterUrl}}<el-button type="primary" plain v-clipboard:copy='$options.filters.filterUrl($route.params.id)' v-clipboard:success='clipboardSuccess'>复制</el-button></p>
        </div>
        <div class="qrcode-img">
          <img :src="form.phone_er_url | uploadPrefixUrl" v-if="form.phone_er_url">
          <canvas id="qrcode-zhuotie" style="display:none;"></canvas>
          <img v-if="zhuotieUrl" :src="zhuotieUrl" @click="showLargeQrcode" id="zhuotie" style="cursor:pointer;"/>
        </div>
      </div>
    </el-card>
    <BaiduMap v-if="visibleMap" @closeDialog="closeDialog"></BaiduMap>
  </div>
</template>

<script>
import BaiduMap from '../components/map'
import clipboard from '@/directive/clipboard/index.js'
import QRious from 'qrious'
import BigPicture from '../../../vendor/BigPicture'
import { getBarInfo, updateBarInfo, updateRateInfo } from '@/api/barManage'
import { uploadImg } from '@/api/resource' 
import { BASE_API } from '../../../../config/prod.env.js'
import Logo from '@/assets/logo.png'
export default {
  name: 'barManageEdit',
  directives: {
    clipboard
  },
  data() {
    return {
      visibleMap: false,
      isEdit: false,
      actionBtns: [{
        text: '确定',
        type: 'primary'
      }],
      form: {},
      rate: {},
      formRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入酒吧名字' }
        ],
        contact_tel: [
          { required: true, trigger: 'blur', message: '请输入联系电话' },
          { min: 11, max: 11, message: '手机号码应该是11位', trigger: 'blur' }
        ]
      },
      agents: [],
      managers: [],
      selectAgent: '',
      selectManager: '',
      disableManagers: true,
      disableAgent: true,
      oldSelectAgent: '',
      zhuotieUrl: ''
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.$nextTick(() => {
      var zhuotieImg = new Image()
      zhuotieImg.src = './static/zhuotie.png'
      zhuotieImg.onload = () => {
        this.qr = new QRious({
          element: document.getElementById('qrcode-zhuotie'),
          value: BASE_API.replace(/"/g, '') + '/dist/#/Main/' + this.$route.params.id,
          size: 400,
          padding: 20
        })
        var dataUrl = this.qr.toDataURL('image/png')
        var qrcodeImg = new Image()
        qrcodeImg.onload = () => {
          var logo = new Image()
          logo.src = Logo
          logo.onload = () => {
            var canvas = document.createElement('canvas')
            canvas.width = zhuotieImg.width
            canvas.height = zhuotieImg.height
            var ctx = canvas.getContext('2d')
            ctx.drawImage(zhuotieImg, 0, 0)
            ctx.save()
            ctx.fillStyle = 'rgba(0,0,0,.2)'
            ctx.fillRect(325, 285, 230, 230)
            ctx.restore()
            ctx.globalCompositeOperation = 'source-over'
            ctx.drawImage(qrcodeImg, 0, 0, 400, 400, 340, 300, 200, 200)
            ctx.drawImage(logo, 0, 0, 300, 300, 420, 380, 40, 40)
            this.zhuotieUrl = canvas.toDataURL('image/png')
          }
        }
        qrcodeImg.src = dataUrl
      }
    })
  },
  watch: {
    selectManager (newVal, oldVal) {
      if (newVal) {
        this.disableManagers = false
        this.form.supervise_id = newVal
      } else {
        this.disableManagers = true
        this.form.supervise_id = ''
      }
    },
    selectAgent (newVal, oldVal) {
      if (newVal) {
        this.disableAgent = false   
        this.form.agent_id = newVal
      } else {
        this.disableAgent = true
        this.form.agent_id = ''
      }
    }
  },
  methods: {
    getData () {
      getBarInfo({ht_id: this.$route.params.id}).then((response) => {
        this.form = response.data.result.hotel
        this.form.status = this.form.status.toString()
        console.log(this.form.status)
        this.rate = response.data.result.rate
        this.managers = response.data.result.superviseList
        this.agents = response.data.result.agentList
        this.selectAgent =  response.data.result.agent ? response.data.result.agent.mc_id : ''
        this.oldSelectAgent = this.selectAgent
        this.selectManager =  response.data.result.supervise ? response.data.result.supervise.id : ''
      })
    },
    updateBarAction() {
      this.form.ht_id = this.$route.params.id
      //this.form.supervise_id = this.selectManager
      updateBarInfo(this.form).then((response) => {
        this.$message.success('修改成功')
        this.getData()
        /*if (this.oldSelectAgent != this.selectAgent) {
          this.isEdit = true
          if (!this.selectAgent) {
            this.form.yewu_separate = 0
          }
        }*/
      })
    },
    updateRateAction () {
      this.form.ht_id = this.$route.params.id
      var isPass = this.calPercent()
      if (isPass) {
        updateRateInfo(this.form).then((response) => {
          this.$message.success('修改成功')
        })
      }  
    },
    calPercent () {
      if (this.form.ht_separate + this.form.manage_separate + this.form.yewu_separate + this.form.company_separate > 100) {
        this.$message.error('商户、代理和酒吧管理比例之和不能超过' + (100 - this.form.company_separate) + '%')
        return false
      } else {
        return true
      }
    },
    handleChangeUser(value) {
    },
    handleChange1(value) {
      this.form.ht_separate = value
      this.calCompany()
    },
    handleChange2(value) {
      this.form.manage_separate = value
      this.calCompany()
    },
    handleChange3(value) {
      this.form.yewu_separate = value
      this.calCompany()
    },
    calCompany () {
      var v = 100 - this.form.ht_separate - this.form.manage_separate - this.form.yewu_separate
      if (v < Number(this.rate.platform_divide_into)) {
        this.form.company_separate = Number(this.rate.platform_divide_into)
      } else {
        this.form.company_separate = v
      }
      
    },
    calBar() {
      var v = 100 - this.form.company_separate - this.form.manage_separate - this.form.yewu_separate
      this.form.ht_separate = v
    },
    calAgent() {
      var v = 100 - this.form.company_separate - this.form.manage_separate - this.form.ht_separate
      if (Number(v) <= this.agentCal) {
        this.form.yewu_separate = v
      }
    },
    handleLogoSuccess(res, file) {
      this.form.logoUrl = URL.createObjectURL(file.raw);
    },
    uploadLogo(item) {
      if (!this.beforeLogoUpload(item.file))
        return
      let formData = new FormData()
      formData.append('file', item.file)
      uploadImg(formData).catch(err => {
        this.$message.error('上传失败，请重新上传')
      }).then(res => {
        this.$message.success('上传成功')
        this.form.logo = res.data.result
      })
    },
    beforeLogoUpload(file) {
      const isLt50K= file.size / 1024 < 50;
      if (!isLt50K) {
        this.$message.error('上传图片大小不能超过 50K!');
      }
      return isLt50K
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
        var o = {
          address: data.addressComponents.street + data.addressComponents.streetNumber,
          locationLng: data.point.lat,
          locationLat: data.point.lng,
          province_name: data.addressComponents.province,
          city_name: data.addressComponents.city,
          area_name: data.addressComponents.district
        }
        this.form = Object.assign({}, this.form, o)
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
      window.open(this.$options.filters.filterUrl(this.$route.params.id, 'screen'))
    },
    showLargeQrcode() {
      var target = event.target
      BigPicture({
        el: target,
        imgSrc: this.zhuotieUrl
      })
    }
  },
  components: {
    BaiduMap
  },
  filters: {
    filterUrl (value, type) {
      if (type === 'screen') {
        return BASE_API.replace(/\"/g, '') + '/screen/?ht_id=' + value
      } else {
        return BASE_API.replace(/\"/g, '') + '/dist/#/Main/' + value
      }
    }
  },
  computed: {
    agentCal () {
      if (this.selectAgent && this.isEdit) {
        var find = this.agents.find((v) => v.mc_id === this.selectAgent)
        if (find) {
          return Number(find.default_divide_into)
        }
      } else {
        if (this.form.agent_o_separate) {
          return Number(this.form.agent_o_separate)
        } else {
          return 0
        }
      }
    },
    maxBar () {
      /*if (this.form.company_separate) {
        if (this.disableAgent && this.disableManagers) {
          var v = 100 - this.form.company_separate - this.form.manage_separate - this.form.yewu_separate
          return Number(v)
        } else {
          var v = 100 - this.form.company_separate
          return Number(v)
        }
      }*/
      if (this.form.company_separate) {
        var v = 100 - this.rate.platform_divide_into
        return v
      }
    },
    minBar () {
      if (this.form.company_separate) {
        if (this.disableAgent && this.disableManagers) {
          var v = 100 - this.form.company_separate - this.form.manage_separate - this.form.yewu_separate
          return Number(v)
        } else {
          return 1
        } 
      }
    }
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
    display: block;
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
.explain-tip {
  display: flex;
  margin-top: 20px;
  font-size: 14px;
}
.tip-main {
  flex: 1;
}
.tip {
  color: $color;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
  margin-bottom: 10px;
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
