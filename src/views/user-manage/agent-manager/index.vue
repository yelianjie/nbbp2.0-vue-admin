<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoading"
      fit
      :data="tableData"
      style="width: 100%">
      <el-table-column
        width="160px"
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        width="160px"
        label="头像">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.headimgurl | uploadPrefixUrl"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="注册时间">
      </el-table-column>
      <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
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
    </div>
  </div>
</template>

<script>
import { getAgents, deleteAgent } from '@/api/userManage'
export default {
  name: 'agentManager',
  data() {
    return {
      loading: true,
      tableLoading: false,
      formInline: {
        nickname: ''
      },
      params: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      tableData: [],
      total: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      getAgents(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
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
    onSubmit() {
      this.resetParams()
      this.params.name = this.formInline.nickname
      this.getData()
      console.log('submit!')
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该代理?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAgent({id: row.id}).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        })
      }).catch(() => {   
      })
    },
    resetParams() {
      this.params = {
        page: 1,
        pageSize: 10,
        name: ''
      }
    }
  }
}
</script>
