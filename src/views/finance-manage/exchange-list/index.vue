<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="params.name" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="params.id" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          @change="dateChange"
          v-model="params.dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoading"
      fit
      :data="tableData"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="60px">
      </el-table-column>
      <el-table-column
        width="120px"
        prop="nickname"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="exchange_money"
        label="兑换金额"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="exchange_nj"
        label="兑换牛角数"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="兑换时间">
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
import { getExchangeList } from '@/api/finance'
export default {
  name: 'rechargeList',
  data() {
    return {
      loading: true,
      tableLoading: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        beginT: '',
        endT: '',
        id: '',
        dateValue: ''
      },
      tableData: [],
      total: 0,
      zongji: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      getExchangeList(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.zongji = result.zongji
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    resetParams() {
      this.params.page = 1
    },
    onSubmit() {
      this.resetParams()
      if (Array.isArray(this.params.dateValue) && this.params.dateValue.length > 0) {
        this.params.beginT = this.params.dateValue[0]
        this.params.endT = this.params.dateValue[1]
      }
      this.getData()
      console.log('submit!')
    },
    dateChange(value) {
      if (value == null) {
        this.params.beginT = ''
        this.params.endT = ''
      } else {
        
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        if (index === 1) {
          sums[index] = this.zongji.nj_user + '人'
        }
        if (index === 2) {
          sums[index] = this.zongji.nj_amount
        }
        /*const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }*/
      });

      return sums;
    }
  }
}
</script>
