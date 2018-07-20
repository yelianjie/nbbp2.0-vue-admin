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
        prop="sign_in_name"
        label="用户名"
        width="160">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="img"
        label="头像"
        width="">
        <template slot-scope="scope">
          <img width='100' height='100' class="avatar" :src="scope.row.headimgurl"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
        width="">
      </el-table-column>
      <el-table-column
        prop="real_name"
        label="真实姓名"
        width="">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="">
      </el-table-column>
      <el-table-column
        label="状态"
        width="">
        <template slot-scope="scope">
          <el-tag type="success" v-if='scope.row.status == 0'>使用中</el-tag>
          <el-tag type="danger" v-if='scope.row.status == -1'>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
        <el-button @click="handleDisable(scope.row, scope.$index)" type="text" size="small"><template v-if="scope.row.status == 0">禁用</template><template v-else >取消禁用</template></el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
          <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="clearForm">
        <div v-if="dialogType === '1'" >
        <el-row :gutter="24" type="flex">
          <el-col :span="18">
            <el-input v-model="systemUserParam" placeholder="请输入关注牛霸霸屏的微信昵称" clearable></el-input>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="4">
            <el-button @click="getWXData" type="primary" size="medium">搜索</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24" class='wx-user'>
          <p v-if= 'typeof(wxData) != "string" && wxData.length == 0' class='text-center'>暂无数据</p>
          <el-col  :sm="12" :md="6" :lg="4"  v-for='(v,i) in wxData' :key = "i" class='text-center wx-user-item'>
            <div class='wx_avatar'><img :src='v.headimgurl'></div>
            <p class='fs13 single-hide' style='margin: 8px 0'>{{v.nickname}}</p>
            <el-button @click="handleAdd(v)" type="primary" size="small">添加</el-button>
          </el-col>
        </el-row>
        </div>

        <div v-if="dialogType === '2'">
          <el-row :gutter="24">
          <el-col :span="4" class='text-center'>
            <div class='wx_avatar'><img :src='activeUser.headimgurl'></div>
            <p class='fs13' style='margin: 8px 0'>{{activeUser.nickname}}</p>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="18">
            <p style='margin-top:0'>说明：<br>1、可微信扫码登录平台端。<br>2、用户名作为账号密码登录的用户名</p>
          </el-col>
        </el-row>
        <el-form :model="systemUserForm"  :rules="systemUserFormRules" label-width="80px" ref="systemUserForm">
          <el-form-item label="用户名" prop="sign_in_name">
            <el-input v-model="systemUserForm.sign_in_name" maxlength=6 style='width:195px' placeholder="请输入用户名" :disabled="this.systemUserForm.id != '' "></el-input>
            <span style='margin-left: 20px;font-size: 14px'>不可修改，初始登录密码为"12345678"。(建议输入中文,不超过4个字)</span>
          </el-form-item>
          <el-form-item label="真实姓名" prop="real_name">
            <el-input v-model="systemUserForm.real_name" maxlength=6 style='width:195px' placeholder="请输入真实姓名"></el-input>
            <span></span>
          </el-form-item>
          <el-form-item label="角色" prop="role_id">
            <el-select v-model="systemUserForm.role_id" placeholder="请选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style='text-align:right'>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-dialog>
</div>
</template>

<script>
import { getSysUsers, getSubscribeMember, setSysUserStatus, addWxSysUser, getWxSysUser, updateWxSysUser, getRoleList} from '@/api/systemManage'
export default {
  name: 'systemUser',
  data() {
    return {
      loading: true,
      tableLoading: false,
      dialogTitle: '添加系统用户',
      dialogType: '1',
      dialogFormVisible: false,
      systemUserParam: '',
      systemUserForm: {
        sign_in_name: '',
        role_id: '',
        real_name: '',
        mc_id: '',
        id:''
      },
      systemUserFormRules: {
        sign_in_name: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        role_id: [{ required: true, trigger: 'blur', message: '请选择角色' }]
      },
      params: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      wxData: '',
      roleList: '',
      activeUser: '',
      total:0
    }
  },
  created() {
    this.getData()
    this.getRoleList()
  },
  mounted() {
  },
  methods: {
    getWXData() {
      if (!this.systemUserParam) {
        this.$message.error('请输入微信昵称')
        return false
      }
      getSubscribeMember({ nickname : this.systemUserParam }).then((res) => {
        let result = res.data.result
        this.wxData = result
      })
    },
    getRoleList () {
      getRoleList({page: '1',pageSize:'1000'}).then((res) => {
        console.log(res)
        this.roleList = res.data.result.data
      })
    },
    getData () {
      this.loading = true
      getSysUsers(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    handleSave() {
      let _action,msg
      let pid = this.systemUserForm.id
      let self = this
      if (this.systemUserForm.id) {
        _action = updateWxSysUser
        msg = '编辑成功'
      } else {
        _action = addWxSysUser
        msg = '添加成功'
      }
       this.$refs.systemUserForm.validate(valid => {
        if (valid) {
          _action(this.systemUserForm).then((res) => {
            console.log(res)
            if (res.data.code != '301000') {
              return this.$message.error({
                type: 'error',
                message: res.data.result
              })
            }
            this.$message({
              type: 'success',
              message: msg
            })
            this.dialogFormVisible = false
            this.clearForm()
            this.params.page = 1
            this.getData()
            if (pid == self.$store.state.user.roles.id.toString()) {
              location.reload()
            }
          })
        }
       })
    },
    clearForm() {
      this.systemUserParam = ''
      this.wxData = ''
      this.activeUser = ''
      this.systemUserForm = {
        role_id: '',
        real_name: '',
        mc_id: '',
        id: ''
      }
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
    showEmptyDiaLog() {
      this.dialogTitle = '添加系统用户'
      this.dialogType = '1'
      this.dialogFormVisible = true
    },
    handleAdd(val) {
      this.dialogTitle = '添加系统用户'
      this.dialogType = '2'
      this.dialogFormVisible = true
      this.activeUser = val
      this.systemUserForm.mc_id = this.activeUser.id
    },
    handleEdit(val) {
      this.dialogTitle = '编辑系统用户'
      this.dialogType = '2'
      this.dialogFormVisible = true
      this.activeUser = val
      getWxSysUser({sys_user_id : val.id}).then((res) => {
        let result = res.data.result
        this.systemUserForm = {
          id : val.id,
          mc_id: result.info.bind_mc_id,
          real_name: result.info.real_name,
          sign_in_name: result.info.sign_in_name,
          role_id: result.info.role_id,
        }
        console.log(result)
        console.log(this.adminManagerForm)
      })
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该系统用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setSysUserStatus({id: row.id, status: -2}).then((res) =>{
          if (res.data.code != '301000') {
          return this.$message.error({
            type: 'error',
            message: res.data.result
          })
        }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })      
      })
    },
    handleDisable(row, index) {
      let status
      if (row.status == 0) {
        status = -1
      } else {
        status = 0
      }
      setSysUserStatus({id: row.id, status: status}).then((res) =>{
          if (res.data.code != '301000') {
            return this.$message.error({
              type: 'error',
              message: res.data.result
            })
          }
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getData()
        })
    },
    DeleteTime() {

    },
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
.wx-user {
  padding:20px 10px 0;
  max-height:500px;
  overflow:auto;
  .wx-user-item {
    margin-bottom:10px
  }
}
.wx_avatar {
  height:0;
  padding-bottom:80%;
  img{
    width:80%;
  }
}
</style>
