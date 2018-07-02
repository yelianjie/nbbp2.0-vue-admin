<template>
  <div class="container">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-row>
        <el-form-item label="昵称">
          <el-input v-model="params.name" placeholder="请输入昵称" clearable></el-input>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="params.id" placeholder="请输入ID" clearable></el-input>
        </el-form-item>
        <el-form-item label="酒吧名称">
          <el-input v-model="params.hotel_name" placeholder="请输入酒吧名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="params.order_no" placeholder="请输入订单号" clearable></el-input>
        </el-form-item>
      </el-row>
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
    <link-search :label-width="80" v-model="params.pay_type" :links="{ title: '充值类型', links: [{label: '全部', value: '0'}, {label: '直接支付', value:'2'}, {label: '充值购买', value: '3'}, {label: '牛角充值', value: '1'}]}" @onClick="getData"></link-search>
    <link-search :label-width="80" v-model="params.source_type" :links="{ title: '充值来源', links: [{label: '全部', value: '0'}, {label: '霸屏', value:'1'}, {label: '礼物', value: '2'}, {label: '红包', value: '3'}, {label: '点歌', value: '4'}, {label: '其他', value: '5'}]}" @onClick="getData"></link-search>
    <SummaryLine>
      总计人数<el-tag size="small">{{zongji.nj_user}}</el-tag>人，充值金额<el-tag size="small">{{zongji.nj_amount}}</el-tag>元，微信手续费<el-tag size="small">{{zongji.wx_fee}}</el-tag>元，实际到账金额<el-tag size="small">{{zongji.wx_real}}</el-tag>元
    </SummaryLine>
    <el-table
      v-loading="loading"
      fit
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="uid"
        label="用户ID">
      </el-table-column>
      <el-table-column
        width="120px"
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="money"
        label="充值金额">
      </el-table-column>
      <el-table-column
        prop=""
        label="充值类型">
        <template slot-scope="scope">
          <template v-if="scope.row.pay_type == '3'">充值购买</template>
          <template v-if="scope.row.pay_type == '1'">牛角充值</template>
          <template v-if="scope.row.pay_type == '2'">直接支付</template>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="充值来源">
        <template slot-scope="scope">
          <template v-if="scope.row.source_type == '5'">其他</template>
          <template v-if="scope.row.source_type == '4'">点歌</template>
          <template v-if="scope.row.source_type == '3'">红包</template>
          <template v-if="scope.row.source_type == '2'">礼物</template>
          <template v-if="scope.row.source_type == '1'">霸屏</template>
        </template>
      </el-table-column>
      <el-table-column 
        label="来源酒吧">
         <template slot-scope="scope">
           {{scope.row.hotel_name || '平台充值'}}
         </template>
      </el-table-column>
      <el-table-column
        width="360px"
        prop="recharge_order_no"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="充值时间"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="wx_fee"
        label="微信手续费">
      </el-table-column>
      <el-table-column
        prop="wx_real"
        label="实际到账金额">
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
import { getRechargeList } from '@/api/finance'
import LinkSearch from '@/components/LinkSearch/index'
import SummaryLine from '@/components/Summary/index'
export default {
  name: 'rechargeList',
  components: {
    SummaryLine,
    LinkSearch
  },
  data() {
    return {
      loading: true,
      tableLoading: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        hotel_name: '',
        order_no: '',
        beginT: '',
        endT: '',
        id: '',
        source_type: '0',
        pay_type : '0',
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
      getRechargeList(this.params).then((response) => {
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
        if (index === 6) {
          sums[index] = this.zongji.wx_fee
        }
        if (index === 7) {
          sums[index] = this.zongji.wx_real
        }
      })

      return sums
    },
    formatDateTime(inputTime) {
      var date = new Date(inputTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second
    }
  }
}
</script>
