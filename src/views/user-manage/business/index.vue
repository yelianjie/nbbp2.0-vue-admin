<template>
  <div class="container">
    <toolTips :toolTipsData="toolTipsData" ></toolTips>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="昵称">
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
      总计: 总收益<el-tag size="small">{{summaryMoney.merchant_income}}</el-tag>元&nbsp;当前收益<el-tag size="small">{{summaryMoney.merchant_balance}}</el-tag>元
    </SummaryLine>
    <el-table
      v-loading="loading"
      fit
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="mc_id"
        label="ID"
        width=120px>
      </el-table-column>
      <el-table-column
        width="160px"
        label="用户头像">
        <template slot-scope="scope">
          <img class="avatar-user-img" :src="scope.row.headimgurl | uploadPrefixUrl"/>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        prop="name"
        label="微信昵称">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="merchant_income"
        label="总收益">
      </el-table-column>
      <el-table-column
        prop="merchant_balance"
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
import { getGridData } from '@/api/userManage'
import toolTips from '@/components/Tips/index'
import SummaryLine from '@/components/Summary/index'
export default {
  name: 'rechargeManager',
  components: {
    SummaryLine,
    toolTips
  },
  data() {
    return {
      loading: true,
      tableLoading: false,
      panelData: [{
        label: '会员总数',
        number: 0,
      }, {
        label: '昨日新增会员数',
        numer: 0,
      }, {
        label: '账户余额',
        number: 0,
        decimals: 2
      }],
      params: {
        name: '',
        id: '',
        page: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      toolTipsData : [{
        title: '总收益',
        tooltip: '该商户获得的所有分成收益总额'
      },{
        title: '当前收益',
        tooltip: '该商户当前账户未提现的分成收益总额'
      }],
      summaryMoney: {}
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
      getGridData(this.params).then((response) => {
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
    resetParams() {
      this.params.page = 1
    }
  }
}
</script>

