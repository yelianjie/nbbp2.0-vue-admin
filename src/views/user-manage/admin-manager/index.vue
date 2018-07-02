<template>
  <div class="container">
    
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="params.search" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="params.searchId" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24" style='text-align: right'>
        <el-button type="primary" @click.native="showEmptyDiaLog">添加</el-button>
      </el-col>
    </el-row>
    <div style="height:24px;"></div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="mc_id"
        label="ID"
        width=120>
      </el-table-column>
      <el-table-column
        label="微信头像"
        width="150">
        <template slot-scope="scope">
          <img class="avatar-user-img" :src="scope.row.headimgurl | uploadPrefixUrl"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="微信昵称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="real_name"
        label="真实姓名"
        width=120>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="identity"
        label="身份">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="clearForm">
        <div v-if="dialogType === '1'" >
        <el-row :gutter="24" type="flex">
          <el-col :span="18">
            <el-input v-model="adminParam" placeholder="请输入关注牛霸霸屏的微信昵称" clearable></el-input>
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
            <p class='fs13' style='margin: 8px 0'>{{v.nickname}}</p>
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
            <p style='margin-top:0'>说明：<br>1、可无限限制免费购买主题霸屏、礼物霸屏、点歌霸屏。<br>2、点歌霸屏在已点列表显示免费标签。<br>3、可拉黑用户。<br>4、可删除上墙消息。</p>
          </el-col>
        </el-row>
        <el-form :model="adminManagerForm"  label-width="80px" ref="adminManagerForm">
          <el-form-item label="真实姓名" prop="real_name">
            <el-input v-model="adminManagerForm.real_name" ></el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="remark">
            <el-input type="textarea" v-model="adminManagerForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="生效酒吧" prop="is_all_auth">
            <el-radio v-model="adminManagerForm.is_all_auth" :label="1" @change = 'adminManagerForm.hts = []'>全部</el-radio>
            <el-radio v-model="adminManagerForm.is_all_auth" :label="0" >自定义</el-radio>
          </el-form-item>
          <el-form-item >
            <el-transfer v-if="transferVisible" v-model="adminManagerForm.hts" filterable  :data="barData"></el-transfer>
          </el-form-item>
          <el-form-item style='text-align:right'>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSuperManageData, getWXMemberBySearch, getSuperManageModel, updateSuperManage, addSuperManage, deleteSuperManage, getAllHotel} from '@/api/userManage'
export default {
  name: 'adminManager',
  data() {
    return {
      loading: true,
      dialogTitle: '添加用户端超管',
      dialogFormVisible: false,
      transferVisible: false,
      dialogType: '1',
      adminParam : '',
      adminManagerForm: {
        id: '',
        mc_id: '',
        real_name:'',
        remark:'',
        is_all_auth: 1,
        hts:[]
      },
      params: {
        pageindex: 1,
        pagesize: 10,
        searchId: '',
        search: ''
      },
      tableData: [],
      wxData:'',
      barData:[],
      total: 0,
      activeUser: ''
    }
  },
  created() {
    this.getData()
    this.getbarData()
  },
  mounted() {
  },
  watch: {
    'adminManagerForm.is_all_auth' (newVal, oldVal) {
      if (newVal) {
        this.transferVisible = false
      } else {
        this.transferVisible = true
      }
    },
  },
  methods: {
    getWXData () {
      if (!this.adminParam) {
        this.$message.error('请输入微信昵称')
        return false
      }
      getWXMemberBySearch({ search : this.adminParam }).then((res) => {
        let result = res.data.result
        this.wxData = result
      })
    },
    getbarData () {
      getAllHotel().then((res) => {
        let result = res.data.result
        result.forEach((v,i) => {
          this.barData.push({
            key: v.id,
            label: v.name
          })
        })
        console.log(this.barData)
      })
    },
    getData () {
      this.loading = true
      getSuperManageData(this.params).then((response) => {
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
      this.params.pagesize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.params.pageindex = val
      this.getData()
      console.log(`当前页: ${val}`)
    },
    addBarManager() {

    },
    DeleteBarManager() {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加用户端超管'
      this.dialogType = '1'
      this.dialogFormVisible = true
    },
    handleAdd(val) {
      this.dialogTitle = '添加超级管理员'
      this.dialogType = '2'
      this.dialogFormVisible = true
      this.activeUser = val
      this.adminManagerForm.mc_id = this.activeUser.id
    },
    handleEdit(val) {
      this.dialogTitle = '编辑超级管理员'
      this.dialogType = '2'
      this.dialogFormVisible = true
      this.activeUser = val
      getSuperManageModel({id : val.id}).then((res) => {
        let result = res.data.result
        let htData = []
        result.smrh.forEach((v,i) => {
           htData.push(v.ht_id)
        })
        console.log(htData)
        this.adminManagerForm = {
          id : val.id,
          mc_id: result.sm.mc_id,
          real_name: result.sm.real_name,
          remark: result.sm.remark,
          is_all_auth: parseInt(result.sm.is_all_auth),
          hts: htData
        }
        console.log(result)
        console.log(this.adminManagerForm)
      })
    },
    handleSave() {
      let _action,msg
      if (this.adminManagerForm.id) {
        _action = updateSuperManage
        msg = '编辑成功'
      } else {
        _action = addSuperManage
        msg = '添加成功'
      }
      _action(this.adminManagerForm).then((res) => {
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
        this.resetParams()
        this.getData()
      })
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该超级管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSuperManage({id: row.id}).then((res) => {
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
        }).catch((error) => {
          // this.$message({
          //   type: 'error',
          //   message: error.msg
          // })
        })
      }).catch(() => {    
      })
    },
    clearForm() {
      this.adminParam = ''
      this.wxData = ''
      this.activeUser = ''
      this.adminManagerForm = {
        id: '',
        mc_id: '',
        real_name:'',
        remark:'',
        is_all_auth: 1,
        hts:[]
      }
    },
    resetParams() {
      this.params.pageindex = 1
      this.params.searchId = ''
      this.params.search = ''
    }
  }
}
</script>

<style lang="scss" scoped>

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
