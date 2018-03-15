<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-input v-model="formInline.barName" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.type" placeholder="请选择" clearable @clear="clearType">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          @change="dateChange"
          v-model="formInline.dateValue"
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
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        width="160px"
        prop="order_no"
        label="订单编号">
      </el-table-column>
      <el-table-column
        width="220px"
        prop="nickname"
        label="消费者昵称">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="订单时间"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="show_time"
        label="霸屏时长">
      </el-table-column>
      <el-table-column
        prop="order_type"
        label="类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.odr_type == 1">{{scope.row.title}}</el-tag>
          <el-tag v-if="scope.row.odr_type == 2">{{scope.row.title}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_money"
        label="订单金额">
      </el-table-column>
      <el-table-column
        prop="platform_sxfei"
        label="手续费">
      </el-table-column>
      <el-table-column
        prop="u_money"
        label="分成金额">
        <template slot-scope="scope">
          <el-tag class="tag">平台：{{scope.row.company_money | filtetMoney}}</el-tag>
          <el-tag class="tag" type="success">代理：{{scope.row.agent_money | filtetMoney}}</el-tag>
          <el-tag class="tag" type="info">商户：{{scope.row.merchant_money | filtetMoney}}</el-tag>
          <el-tag class="tag" type="warning">管理：{{scope.row.supervise_money | filtetMoney}}</el-tag>
          <el-tag class="tag" type="danger">用户：{{scope.row.user_money | filtetMoney}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="酒吧名称">
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
export default {
  name: 'orderList',
  data() {
    return {
      loading: true,
      tableLoading: false,
      bars: [{
        label: 'CMK酒吧',
        value: 10
      }, {
        label: '牛霸酒吧',
        value: 9
      }],
      types: [{
        label: '主题霸屏',
        value: '2'
      }, {
        label: '礼物打赏',
        value: '1'
      }],
      formInline: {
        barName: '',
        dateValue: '',
        type: ''
      },
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        type: '',
        beginT: '',
        endT: '',
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
      this.params = {
        page: 1,
        pageSize: 10,
        name: '',
        beginT: '',
        endT: '',
        type: ''
      }
    },
    onSubmit() {
      this.resetParams()
      this.params.name = this.formInline.barName
      this.params.type = this.formInline.type
      if (Array.isArray(this.formInline.dateValue) && this.formInline.dateValue.length > 0) {
        this.params.beginT = this.formInline.dateValue[0]
        this.params.endT = this.formInline.dateValue[1]
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
    clearBar() {

    },
    dateChange(value) {
      if (value == null) {

      } else {
        
      }
    },
    clearType() {
      
    }
  },
  filters: {
    filterText (value, arr) {
      var find = arr.find((v) => v.value === value)
      return find.label
    },
    filtetMoney (value) {
      if (value) {
        return value
      } else {
        return '0.00'
      }
    }
  }
}
</script>

<style lang="scss">
.tag {
  margin-bottom: 4px;
}
</style>