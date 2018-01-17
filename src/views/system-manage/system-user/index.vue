<template>
  <div class="container" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="showEmptyDiaLog">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="height:24px;"></div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="220">
      </el-table-column>
      <el-table-column
        prop="img"
        label="头像"
        width="150">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="真实姓名"
        width="140">
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="创建时间"
        width="160">
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
      background
      @current-change="pageChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" @close="clearForm">
        <el-form :model="systemUserForm" status-icon :rules="systemUserFormRules" label-width="140px" ref="systemUserForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="systemUserForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <el-upload
              class="avatar-uploader"
              accept="image/*"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="systemUserForm.img" :src="systemUserForm.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="systemUserForm.role" placeholder="请选择">
              <el-option value="1" label="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="systemUserForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="_beforeAddBpTime">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'systemUser',
  data() {
    return {
      loading: true,
      tableLoading: false,
      dialogTitle: '添加系统用户',
      dialogFormVisible: false,
      systemUserForm: {
        username: '',
        img: '',
        role: '1',
        name: ''
      },
      systemUserFormRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        img: [{ required: true, trigger: 'blur', message: '请上传图片' }],
        role: [{ required: true, trigger: 'blur', message: '请选择角色' }],
        name: [{ required: true, trigger: 'blur', message: '请填写真实姓名' }]
      },
      tableData: [{
        username: 'pigye009',
        img: '',
        role: 1,
        name: '叶连杰',
        create_at: '2018-01-15 16:00:00'
      }]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    clearForm() {
      this.$refs.systemUserForm.clearValidate()
      this.$refs.systemUserForm.resetFields()
    },
    pageChange(currentPage) {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加系统用户'
      this.dialogFormVisible = true
    },
    handleEdit() {
      this.dialogTitle = '编辑系统用户'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该系统用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })      
      })
    },
    DeleteTime() {

    },
    _beforeAddBpTime() {
      this.$refs.systemUserForm.validate(valid => {
        if (valid) {
          console.log('valid')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.bpThemeForm.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt50K= file.size / 1024 < 100;
      if (!isLt50K) {
        this.$message.error('上传图片大小不能超过 50K!');
      }
      return isLt50K
    }
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
