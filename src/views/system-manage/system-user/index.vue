<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="showEmptyDiaLog">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="height:24px;"></div>
    <el-table
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
      <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible">
        <el-form :model="systemUserForm" :rules="systemUserFormRules" label-width="140px" ref="systemUserFormRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="systemUserForm.title" auto-complete="off"></el-input>
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
            <el-input v-model="systemUserForm.role" auto-complete="off"></el-input>
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
      <el-dialog
        title="提示"
        :visible.sync="dialogDeleteVisible"
        width="30%">
      <span>是否确定删除该系统用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeleteTime">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'systemUser',
  data() {
    return {
      dialogTitle: '添加系统用户',
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      systemUserForm: {
        title: '',
        img: '',
        type: '',
        price: ''
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
  methods: {
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
      console.log(row)
      this.dialogDeleteVisible = true
    },
    DeleteTime() {

    },
    _beforeAddBpTime() {
      this.$refs.systemUserFormRules.validate(valid => {
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
