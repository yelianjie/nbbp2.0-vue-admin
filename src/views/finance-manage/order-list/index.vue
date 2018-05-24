<template>
  <div class="container">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="params.id" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="酒吧名称">
        <el-input v-model="params.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="params.nickname" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型">
        <el-select v-model="params.type" placeholder="请选择" clearable @clear="clearType">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
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
    <link-search :label-width="80" v-model="params.type" :links="{ title: '类型', links: [{label: '全部', value: ''}, {label: '主题霸屏', value:'2'}, {label: '礼物打赏', value: '1'}, {label: '红包', value: '3'}, {label: '点歌', value: '4'}]}" @onClick="getData"></link-search>
    <link-search :label-width="80" v-model="params.fee" :links="{ title: '订单属性', links: [{label: '全部', value: '0'}, {label: '付费', value:'1'}, {label: '免费', value: '2'}]}" @onClick="getData"></link-search>
    <SummaryLine>
      总计金额<el-tag size="small">{{summaryMoney.totle_money}}</el-tag>元，霸屏<el-tag size="small">{{summaryMoney.bp_money}}</el-tag>元，打赏<el-tag size="small">{{summaryMoney.ds_money}}</el-tag>元，红包<el-tag size="small">{{summaryMoney.hb_money}}</el-tag>元
    </SummaryLine>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
      fixed
        prop="name"
        label="酒吧名称">
      </el-table-column>
      <el-table-column
        prop="buy_uid"
        label="消费者ID">
      </el-table-column>
      <el-table-column
        width="220px"
        prop="nickname"
        label="消费者昵称">
      </el-table-column>
      <el-table-column
        prop="order_type"
        label="消费类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.odr_type == 1">{{scope.row.title}}</el-tag>
          <el-tag v-if="scope.row.odr_type == 2">{{scope.row.title}}</el-tag>
          <el-tag type="warning" v-if="scope.row.odr_type == 3">红包</el-tag>
          <el-tag type="success" v-if="scope.row.odr_type == 4">点歌</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="show_time"
        label="霸屏时长">
      </el-table-column>
      <el-table-column
        label="支付类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_type == 1">牛角消费</el-tag>
          <el-tag type="success" v-if="scope.row.pay_type == 2">直接支付</el-tag>
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
          <el-tag class="tag" v-if="Number(scope.row.company_money) != 0">平台：{{scope.row.company_money | filtetMoney}}</el-tag>
          <el-tag class="tag" v-if="Number(scope.row.agent_money) != 0" type="success">代理：{{scope.row.agent_money | filtetMoney}}</el-tag>
          <el-tag class="tag" v-if="Number(scope.row.merchant_money) != 0" type="info">商户：{{scope.row.merchant_money | filtetMoney}}</el-tag>
          <el-tag class="tag" v-if="Number(scope.row.supervise_money) != 0" type="warning">管理：{{scope.row.supervise_money | filtetMoney}}</el-tag>
          <el-tag class="tag" v-if="Number(scope.row.user_money) != 0" type="danger">用户：{{scope.row.user_money | filtetMoney}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="订单时间"
        width="200px">
      </el-table-column>
      <el-table-column
        width="160px"
        prop="order_no"
        label="订单号">
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
import SummaryLine from '@/components/Summary/index'
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
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        type: '',
        beginT: '',
        endT: '',
        id: '',
        dateValue: '',
        fee: '1',
        nickname: ''
      },
      tableData: [],
      total: 0,
      summaryMoney: {}
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
        this.summaryMoney = result.money
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
    clearBar() {

    },
    dateChange(value) {
      if (value == null) {
        this.params.beginT = ''
        this.params.endT = ''
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
  },
  components: {
    LinkSearch,
    SummaryLine
  }
}
</script>

<style lang="scss">
.tag {
  margin-bottom: 4px;
}
</style>