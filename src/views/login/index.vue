<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <img class="logo" src="../../assets/logo.png" />
        <h3 class="title">{{$t('login.title')}}</h3>
        <!-- <lang-select class="set-language"></lang-select> -->
      </div>
      
      <template v-if="loginType == 1">
      <el-form-item prop="name">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="name" type="text" v-model="loginForm.name" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item prop="pwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="pwd" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.pwd" autoComplete="on" placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      </template>
      
      <template v-if='loginType == 2'>
        <div class='text-center'>
          <img :src="QRScan.url" style='width:250px;height:250px'>
          <p style='color:#fff;margin-bottom: 40px'>请使用微信二维码扫描登录</p>
        </div>

      </template>
      <el-row>
        <el-col :span="8"><hr></el-col>
        <el-col :span="8" class='text-center' style='color:#fff'>其他登录方式</el-col>
        <el-col :span="8"><hr></el-col>
      </el-row>
      <div class="text-center" style='padding:20px 0'>
        <el-button v-if='loginType == 1' @click.native="loginType = 2" class='pointer'>微信扫码登录</el-button>
        <el-button v-if='loginType == 2' @click.native="loginType = 1" class='pointer'>账号密码登录</el-button>
      </div>
      <!--<div class="tips">
        <span>{{$t('login.username')}} : admin</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>

      <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button>-->
    </el-form>

    <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <social-sign />
    </el-dialog> -->

  </div>
</template>

<script>
// import LangSelect from '@/components/LangSelect'
// import SocialSign from './socialsignin'
import  { getLoginQrcode, loginByWx} from '@/api/login'

export default {
  // components: { LangSelect, SocialSign },
  name: 'login',
  data() {
    return {
      message: null,
      loginType: 1,
      loginForm: {
        name: '',
        pwd: ''
      },
      QRScan: {
        url: '',
        id: ''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        pwd: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        this.message && this.message.close()
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((response) => {
            this.loading = false
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push({ path: '/' })
          }).catch((error) => {
            this.loading = false
            this.$message({
              message: error.msg,
              type: 'error'
            });
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getQRScan() {
      getLoginQrcode().then((res) => {
        console.log(res)
        let data = res.data.result
        this.QRScan = {
          url: data.imgurl,
          id: data.id
        }
      })
    },
    handleLoginByWx() {
      this.$store.dispatch('LoginByWx', {id:this.QRScan.id}).then((response) => {
        //this.loading = false
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        this.$router.push({ path: '/' })
        clearTimeout(this.interval)
      }).catch((error) => {
        console.log(error)
        //this.loading = false
        // this.$message({
        //   message: error.msg,
        //   type: 'error'
        // });
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    this.getQRScan()
    this.interval = setInterval(this.handleLoginByWx,3000)
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  .logo {
    display: block;
    margin: 0 auto 20px;
    width: 120px;
    height: 120px;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .other-title {

  }
}
</style>
