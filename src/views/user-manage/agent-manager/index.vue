<template>
  <div class="container">
    <toolTips :toolTipsData="toolTipsData" ></toolTips>
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
    <SummaryLine>
      总计: 总收益<el-tag size="small">{{summaryMoney.agent_income}}</el-tag>元&nbsp;当前收益<el-tag size="small">{{summaryMoney.agent_balance}}</el-tag>元
    </SummaryLine>
    <el-table
      v-loading="loading"
      fit
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="mc_id"
        label="ID"
        width="120px>
      </el-table-column>
      <el-table-column
        width="160px"
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        width="160px"
        label="头像">
        <template slot-scope="scope">
          <img class="avatar-user-img" :src="scope.row.headimgurl | uploadPrefixUrl"/>
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
        prop="invitation_code"
        label="推荐码">
      </el-table-column>
      <el-table-column
        prop="agent_income"
        label="总收益">
      </el-table-column>
      <el-table-column
        prop="agent_balance"
        label="当前收益">
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
import toolTips from '@/components/Tips/index'
import SummaryLine from '@/components/Summary/index'
export default {
  name: 'agentManager',
  components: {
    SummaryLine,
    toolTips
  },
  data() {
    return {
      loading: true,
      tableLoading: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        id: ''
      },
      tableData: [],
      total: 0,
      toolTipsData : [{
        title: '总收益',
        tooltip: '该代理用户获得的所有分成收益总额'
      },{
        title: '当前收益',
        tooltip: '该代理当前账户未提现的分成收益总额'
      }],
      summaryMoney: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      getAgents(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.summaryMoney = result.money
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
      this.params.page = 1
    }
  }
}
</script>
