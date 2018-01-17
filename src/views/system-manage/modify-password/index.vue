<template>
  <el-form :model="modifyForm" status-icon :rules="rules" ref="modifyForm" class="modifyForm" label-width="140px">
    <el-form-item label="旧密码" prop="oldPass">
      <el-input v-model="modifyForm.oldPass" type="password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input v-model="modifyForm.newPass" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="confirmNewPass">
      <el-input v-model="modifyForm.confirmNewPass" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('modifyForm')">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'modifyPassword',
  data() {
    var checkConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('确认密码不能为空'));
      }
      if (value != this.modifyForm.newPass) {
        return callback(new Error('两次密码输入不一致'));
      }
      callback()
    }

    return {
      modifyForm: {
        oldPass: '',
        newPass: '',
        confirmNewPass: ''
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmNewPass: [
          { required: true, validator: checkConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
  margin: 120px auto;
}
</style>
