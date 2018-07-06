<template>
  <div class="container">
    <h2 class='title'>微信头像/昵称</h2>
    <div class='wx_wrap'> 
      <img :src="avatar" width=120 height="120" style="border-radius: 15px">
      <p  style="font-size:16px">{{name}}</p>
    </div>
    <h2 class='title'>密码修改</h2>
    <el-form :model="modifyForm" status-icon :rules="rules" ref="modifyForm" class="modifyForm" label-width="140px">
      <el-form-item label="旧密码" prop="sign_in_pwd">
        <el-input v-model="modifyForm.sign_in_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="modifyForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPass">
        <el-input v-model="modifyForm.confirmNewPass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('modifyForm')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { modifyPassword } from '@/api/systemManage'
export default {
  name: 'modifyPassword',
  data() {
    var checkConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('确认密码不能为空'));
      }
      if (value != this.modifyForm.new_pwd) {
        return callback(new Error('两次密码输入不一致'));
      }
      callback()
    }

    return {
      modifyForm: {
        sign_in_pwd: '',
        new_pwd: '',
        confirmNewPass: ''
      },
      rules: {
        sign_in_pwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmNewPass: [
          { required: true, validator: checkConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var form = Object.assign({}, this.modifyForm)
          delete form.confirmNewPass
          modifyPassword(form).then((response) => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.modifyForm {
  width: 460px;
  margin: 20px 0;
}
h2.title {
  margin-left:30px
}
.wx_wrap {
  width: 250px;
  text-align: center;
  margin: 30px 0;
}
</style>
