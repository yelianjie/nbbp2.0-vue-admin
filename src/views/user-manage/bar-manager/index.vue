<template>
  <div class="container">
    <!-- <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="showEmptyDiaLog">添加酒吧管理</el-button>
      </el-col>
    </el-row> -->
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="params.name" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="params.id" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div style="height:24px;"></div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="mc_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="微信昵称"
        width="220">
      </el-table-column>
      <el-table-column
        label="头像"
        width="150">
        <template slot-scope="scope">
          <img class="avatar-user-img" :src="scope.row.headimgurl | uploadPrefixUrl"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <!-- <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column> -->
    </el-table>
    <div class="pagination-container">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="clearForm">
        <el-tabs v-model="activeName">
          <el-tab-pane label="扫码绑定" name="s1">
            <img src="http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png" class="scanQrcode">
            <p class="scanTip">扫一扫二维码，直接绑定</p>
          </el-tab-pane>
          <el-tab-pane label="完善信息" name="s2" :disabled="!isScan">
            <el-form :model="barManagerForm" :rules="barManagerFormRules" label-width="80px" ref="barManagerForm">
              <el-form-item label="微信昵称" prop="nickname">
                <el-input v-model="barManagerForm.nickname" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="头像" prop="img">
                <el-input v-model="barManagerForm.img" auto-complete="off" type="hidden" class="hidden-input" :disabled="true"></el-input>
                <img src="http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png" class="wx_avatar" />
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="barManagerForm.phone" auto-complete="off" type="number"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBarManager">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getBarManager, deleteBarManager } from '@/api/userManage'
export default {
  name: 'barManager',
  data() {
    return {
      loading: true,
      tableLoading: false,
      activeName: 's1',
      isScan: false,
      dialogTitle: '添加酒吧管理员',
      dialogFormVisible: false,
      barManagerForm: {
        nickname: '',
        img: '',
        phone: ''
      },
      barManagerFormRules: {
        nickname: [{ required: true, trigger: 'blur', message: '请输入微信昵称' }],
        img: [{ required: true, trigger: 'blur', message: '头像不能为空' }],
        phone: [
          { required: true, trigger: 'blur', message: '请输入联系电话' },
          { min: 11, max: 11, trigger: 'blur', message: '请输入正确的电话号码' },
        ]
      },
      params: {
        page: 1,
        pageSize: 10,
        id: '',
        name: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  methods: {
    getData () {
      this.loading = true
      getBarManager(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    onSubmit() {
      this.resetParams()
      this.getData()
      console.log('submit')
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
      console.log(`当前页: ${val}`)
    },
    addBarManager() {

    },
    DeleteBarManager() {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加酒吧管理'
      this.dialogFormVisible = true
    },
    handleEdit() {
      this.dialogTitle = '编辑酒吧管理'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该酒吧管理?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBarManager({id: row.id}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error.msg
          })
        })

        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {    
      })
    },
    clearForm() {
      this.$refs.barManagerForm.clearValidate()
      this.$refs.barManagerForm.resetFields()
    },
    resetParams() {
      this.params.page = 1
    }
  }
}
</script>

<style lang="scss" scoped>

.wx_avatar {
  width: 100px;
  height: 100px;
}
.hidden-input {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
}
.scanQrcode {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: block;
}
.scanTip {
  text-align: center;
  font-size: 14px;
}
</style>
