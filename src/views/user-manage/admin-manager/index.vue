<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="showEmptyDiaLog">添加</el-button>
      </el-col>
    </el-row>
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
        label="ID"
        width=120>
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
      <el-table-column
        prop="supervise_income"
        label="总收益">
      </el-table-column>
      <el-table-column
        prop="supervise_balance"
        label="当前收益">
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
        <el-row :gutter="24">
          <el-col :span="18">
            <el-input v-model="adminParam" placeholder="请输入关注牛霸霸屏的微信昵称" clearable></el-input>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="4">
            <el-button @click="handleAdd()" type="primary" size="medium">搜索</el-button>
          </el-col>
        </el-row>
        <el-button @click="handleAdd()" type="primary" size="medium">添加</el-button>
        <!-- <el-tabs v-model="activeName">
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
        </el-tabs> -->
        
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div> -->
        </div>

        <div v-if="dialogType === '2'">
          <el-row :gutter="24">
          <el-col :span="4">
            <span>1111</span>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="18">
            <p>说明：<br>1、可无限限制免费购买主题霸屏、礼物霸屏、点歌霸屏。<br>2、点歌霸屏在已点列表显示免费标签。<br>3、可拉黑用户。<br>4、可删除上墙消息。</p>
          </el-col>
        </el-row>
        <el-form :model="adminManagerForm" :rules="adminManagerFormRules" label-width="80px" ref="adminManagerForm">
          <el-form-item label="真实姓名" prop="nickname">
            <el-input v-model="adminManagerForm.nickname" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="nickname">
            <el-input type="textarea" v-model="adminManagerForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="生效酒吧" prop="nickname">
            <el-radio v-model="transferVisible" :label="false" >全部</el-radio>
            <el-radio v-model="transferVisible" :label="true" >自定义</el-radio>
          </el-form-item>
          <el-form-item label="" prop="nickname">
            <el-transfer v-if="transferVisible" v-model="value1" :data="data"></el-transfer>
          </el-form-item>
        </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getBarManager, deleteBarManager } from '@/api/userManage'
export default {
  name: 'adminManager',
  data() {
    const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          })
        }
        return data;
      }
    return {
      loading: true,
      tableLoading: false,
      activeName: 's1',
      isScan: false,
      dialogTitle: '添加用户端超管',
      dialogFormVisible: false,
      transferVisible: false,
      dialogType: '1',
      adminParam : '',
      adminManagerForm: {
        nickname: '',
        img: '',
        phone: ''
      },
      adminManagerFormRules: {
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
      total: 0,
      data: generateData(),
      value1: [1, 4]
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
      this.dialogTitle = '添加用户端超管'
      this.dialogType = '1'
      this.dialogFormVisible = true
    },
    handleAdd() {
      this.dialogTitle = '添加超级管理员'
      this.dialogType = '2'
      this.dialogFormVisible = true
    },
    handleEdit() {
      this.dialogTitle = '编辑超级管理员'
      this.dialogType = '2'
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
      // this.$refs.barManagerForm.clearValidate()
      // this.$refs.barManagerForm.resetFields()
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
