<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="params.id" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="params.name" clearable></el-input>
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
    <link-search v-model="params.type" :links="{ title: '红包类型', links: [{label: '全部', value: 1}, {label: '男士', value: 2}, {label: '女士', value: 3}, {label: '自定义', value: 4}]}" @onClick="onClick"></link-search>
    <link-search v-model="params.backMoney" :links="{ title: '退回金额', links: [{label: '全部', value: 0}, {label: '有', value: 1}, {label: '无', value: 2}]}" @onClick="onClick"></link-search>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop=""
        label="ID">
      </el-table-column>
      <el-table-column
        width="140px"
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop=""
        width="100px"
        label="红包金额">
      </el-table-column>
      <el-table-column
        width="100px"
        label="红包类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_type == 1">现金红包</el-tag>
          <el-tag type="success" v-if="scope.row.pay_type == 2">牛角红包</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        width="100px"
        label="退回金额">
      </el-table-column>
      <el-table-column
        prop=""
        width="180px"
        label="实际发红包金额">
      </el-table-column>
      <el-table-column
        prop=""
        label="订单号"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="订单时间"
        width="160px">
      </el-table-column>
      <el-table-column
        label="发放对象">
        <template slot-scope="scope">
          <template v-if="scope.row.pay_type == 1">
            全场
          </template>
          <template v-if="scope.row.pay_type == 2">
            男士
          </template>
          <template v-if="scope.row.pay_type == 3">
            女士
          </template>
          <template v-if="scope.row.pay_type == 4">
            自定义
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary">查看详情</el-button>
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
import { getOrderList } from '@/api/finance'
import LinkSearch from '@/components/LinkSearch/index'
export default {
  name: 'orderList',
  data() {
    return {
      loading: false,
      tableLoading: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        type: '1',
        beginT: '',
        endT: '',
        id: '',
        dateValue: '',
        backMoney: 0
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    onClick () {
      console.log(this.params)
    },
    getData () {
      this.loading = true
      getOrderList(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
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
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
      console.log(`当前页: ${val}`)
    },
    dateChange(value) {
      if (value == null) {
        this.params.beginT = ''
        this.params.endT = ''
      } else {
        
      }
    }
  },
  components: {
    LinkSearch
  }
}
</script>

<style lang="scss">
.tag {
  margin-bottom: 4px;
}
</style>