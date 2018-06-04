<template>
  <div class="container">
    <toolTips :toolTipsData="toolTipsData" ></toolTips>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-row>
        <el-form-item label="用户ID">
          <el-input v-model="params.id" placeholder="请输入ID" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="酒吧名称">
          <el-input v-model="params.name" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="params.nickname" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="params.order_no" size="small" clearable></el-input>
        </el-form-item>
      </el-row>
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
      <el-row>
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
          快捷入口：
          <el-button size="mini" round @click='setDate("prev",1)' v-if="this.params.dateValue">上一天</el-button>
          <el-button size="mini" round @click='setDate("next",1)' v-if="this.params.dateValue">下一天</el-button>
          <el-button size="mini" round @click='setDate("tday",0)' >今天</el-button>
          <el-button size="mini" round @click='setDate("yday",0)'>昨天</el-button>
          <el-button size="mini" round @click='setDate("lastweek",0)'>近7天</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <link-search :label-width="80" v-model="params.type" :links="{ title: '类型', links: [{label: '全部', value: ''}, {label: '主题霸屏', value:'2'}, {label: '礼物打赏', value: '1'}, {label: '红包', value: '3'},{label: '点歌', value: '4'}]}" @onClick="getData"></link-search>
    <link-search :label-width="80" v-model="params.fee" :links="{ title: '订单属性', links: [{label: '全部', value: '0'}, {label: '付费', value:'1'}, {label: '免费', value: '2'}]}" @onClick="getData"></link-search>
    <link-search :label-width="80" v-model="params.pay_type" :links="{ title: '支付类型', links: [{label: '全部', value: '0'}, {label: '牛角支付', value:'1'}, {label: '现金支付', value: '2'}]}" @onClick="getData"></link-search>
    <SummaryLine>
      总计收益：{{summaryMoney.total_amount}}笔/共<el-tag size="small">{{summaryMoney.total_money}}</el-tag>元&nbsp;其中
      <template v-if="!params.type || params.type == 2">
        主题霸屏{{summaryMoney.bp_amount}}笔/共<el-tag size="small">{{summaryMoney.bp_money}}</el-tag>元&nbsp;
      </template>
      <template v-if="!params.type || params.type == 1">
        礼物打赏{{summaryMoney.ds_amount}}笔/共<el-tag size="small">{{summaryMoney.ds_money}}</el-tag>元&nbsp;
      </template>
      <template v-if="!params.type || params.type == 4">
        点歌{{summaryMoney.dg_amount}}笔/共<el-tag size="small">{{summaryMoney.dg_money}}</el-tag>元&nbsp;
      </template>
      <template v-if="!params.type || params.type == 3">
        红包手续费收益{{summaryMoney.hb_amount}}笔/共<el-tag size="small">{{summaryMoney.hb_sxf}}</el-tag>元&nbsp;
      </template>
      <template v-if="!params.type || params.type == 3">
        &nbsp;|&nbsp;实际发红包总金额<el-tag size="small">{{summaryMoney.hb_money}}</el-tag>元（不含退款）
      </template>
    </SummaryLine>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        width="160px"
        prop="order_no"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="buy_uid"
        label="用户ID">
      </el-table-column>
      <el-table-column
        width="220px"
        prop="nickname"
        label="消费者昵称">
      </el-table-column>
      <el-table-column
        label="支付类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_type == 1">牛角支付</el-tag>
          <el-tag type="success" v-if="scope.row.pay_type == 2">现金支付</el-tag>
        </template>
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
          <el-tag type="warning" v-if="scope.row.odr_type == 3">红包</el-tag>
          <el-tag type="warning" v-if="scope.row.odr_type == 4">点歌</el-tag>
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
import LinkSearch from '@/components/LinkSearch/index'
import SummaryLine from '@/components/Summary/index'
import toolTips from '@/components/Tips/index'
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
        order_no: '',
        endT: '',
        id: '',
        dateValue: '',
        fee: '0',
        nickname: '',
        pay_type: '0'
      },
      tableData: [],
      total: 0,
      summaryMoney: {},
      toolTipsData : [{
        title: '',
        tooltip: '实发红包金额（不含退款）不计入总收益，只计入总消费。'
      },{
        title: '',
        tooltip: '当前筛选出的红包手续费红包手续费109.79元红包分成收益。（分成规则由各方分成调整为全部10&手续费归于平台收益。）'
      }],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    setDate(day,type) {
      if (type == 0) {
        let today = new Date().getTime()
        switch(day) {
          case "tday":
            this.params.dateValue = [Acan.time('Y-m-d',today),Acan.time('Y-m-d',today)]
            break
          case "yday":
            this.params.dateValue = [Acan.time('Y-m-d',today-24*60*60*1000),Acan.time('Y-m-d',today-24*60*60*1000)]
            break
          case "lastweek":
            this.params.dateValue = [Acan.time('Y-m-d',today-24*60*60*1000*6),Acan.time('Y-m-d',today)]
            break
        }
      } else if (type == 1) {
        let cuday = new Date(this.params.dateValue[0]).getTime()
        switch(day) {
          case "prev":
            this.params.dateValue = [Acan.time('Y-m-d',cuday-24*60*60*1000),Acan.time('Y-m-d',cuday-24*60*60*1000)]
            break
          case "next":
            this.params.dateValue = [Acan.time('Y-m-d',cuday+24*60*60*1000),Acan.time('Y-m-d',cuday+24*60*60*1000)]
            break
        }
      }
      this.onSubmit()
    },
    getData () {
      this.loading = true
      getOrderList(this.params).then((response) => {
        console.log(response)
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
    SummaryLine,
    toolTips
  }
}
</script>

<style lang="scss">
.tag {
  margin-bottom: 4px;
}
.summary-tip {
  font-size:14px;
  display:block !important
}
</style>