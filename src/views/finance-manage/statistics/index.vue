<template>
  <div class="container">
    <toolTips :toolTipsData="toolTipsData" ></toolTips>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-input v-model="params.name" placeholder="请输入酒吧名称" clearable></el-input>
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

    </el-form>
    
    <SummaryLine>
    总计：<span>总收益<el-tag size="small">{{totalMoney.total}}</el-tag>元，</span>
    <span>商户收益<el-tag size="small">{{totalMoney.t2}}</el-tag>元，</span>
    <span>代理收益<el-tag size="small">{{totalMoney.t1}}</el-tag>元，</span>
    <span>酒吧管理<el-tag size="small">{{totalMoney.t3}}</el-tag>元，</span>
    <span>用户收益<el-tag size="small">{{totalMoney.t4}}</el-tag>元，</span>
    <span>非平台收益之和<el-tag size="small">{{totalMoney.fProfile}}</el-tag>元，</span>
    <span>平台分成收益<el-tag size="small">{{totalMoney.t5}}</el-tag>元，</span>
    <span>平台管理费<el-tag size="small">{{totalMoney.t6}}</el-tag>元，</span>
    <span>平台总收益<el-tag size="small">{{totalMoney.cProfile}}</el-tag>元</span>
    </SummaryLine>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="酒吧名称"
        width=140>
      </el-table-column>
      <el-table-column
        label="总收益"
        prop="total"
        width=200>
        <!-- <template slot-scope="scope">
          {{scope.row | calTotalIncome}}
        </template> -->
      </el-table-column>
      <el-table-column
        prop="t2"
        label="商户收益"
        width=140>
      </el-table-column>
      <el-table-column
        prop="t1"
        label="代理收益"
        width=140>
      </el-table-column>
      <el-table-column
        prop="t3"
        label="酒吧管理"
        width=140>
      </el-table-column>
      <el-table-column
        prop="t4"
        label="用户收益"
        width=140>
      </el-table-column>
      <el-table-column
        label="非平台收益之和"
        prop="fProfile"
        width=240>
        <!-- <template slot-scope="scope">
          {{scope.row | calNotSysMoney}}
        </template> -->
      </el-table-column>
      <el-table-column
        prop="t5"
        label="平台分成收益"
        width=180>
      </el-table-column>
      <el-table-column
        prop="t6"
        label="平台管理费"
        width=180>
      </el-table-column>
      <el-table-column
        prop="cProfile"
        label="平台总收益"
        >
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
import { getHtFinanceList } from '@/api/finance'
import math from 'mathjs'
import toolTips from '@/components/Tips/index'
import SummaryLine from '@/components/Summary/index'
export default {
  name: 'statistics',
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
      dialogVisible: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        beginT: '',
        endT: '',
        dateValue: ''
      },
      tableData: [],
      totalMoney: '',
      total: 0,
      toolTipsData : [{
        title: '总收益',
        tooltip: '总收益=商户收益+代理收益+酒吧管理收益+用户收益+平台总收益'
      },
      {
        title: '商户收益',
        tooltip: '当前酒吧的商户按其分成比例获得的收益'
      },
      {
        title: '代理收益',
        tooltip: '当前酒吧的代理按其分成比例获得的收益'
      },
      {
        title: '酒吧管理收益',
        tooltip: '当前酒吧的酒吧管理按其分成比例获得的收益'
      },
      {
        title: '非平台收益之和',
        tooltip: '非平台收益之和=商户收益+代理收益+酒吧管理收益+用户收益'
      },
      {
        title: '平台收益',
        tooltip: '平台在当前酒吧按照其分成比例获得的收益'
      },
      {
        title: '平台管理费',
        tooltip: '即平台从每笔消费订单收取的1%手续费（含红包订单收取的10%）'
      },
      {
        title: '平台总收益',
        tooltip: '平台总收益=平台分成收益+平台管理费'
      },
      {
        title: '总计',
        tooltip: '统计当前搜索结果的各数据之和'
      },
      {
        title: '未提现收益',
        tooltip: '指商户、代理、用户、酒吧管理当前未提现的收益总和'
      },
      {
        title: '排序修改',
        tooltip: '该页面列表数据按照 总收益由高到低排列'
      }],
    }
  },
  created() {
    this.getData()
  },
  mounted() {
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
      getHtFinanceList(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.totalMoney = result.total_money
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
    handleDelete(row, index) {
      console.log(row)
      this.dialogVisible = true
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
    DeleteBar() {
      alert('delete')
      this.dialogVisible = false
    },
    handleEdit(row, index) {
      this.$router.push({
        path: '/barManageDo/edit',
        query: {
          edit: Math.random()
        }
      })
    },
    dateChange(value) {
      if (value == null) {
        this.params.beginT = ''
        this.params.endT = ''
      } else {
        
      }
    },
  },
  filters: {
    // calNotSysMoney (value) {
    //   var result = math.chain(0).add(value.t1).add(value.t2).add(value.t3).add(value.t4).done()
    //   return math.format(result, {notation: 'fixed', precision: 2})
    // },
    // calTotalIncome (value) {
    //   var result = math.chain(0).add(value.t1).add(value.t2).add(value.t3).add(value.t4).add(value.platform_sxf_income).add(value.t5).done()
    //   return math.format(result, {notation: 'fixed', precision: 2})
    // }
  },
  components: {
    SummaryLine,
    toolTips
  }
}
</script>

<style lang="scss" scoped>
.summary-tip {
  display:block !important;
  font-size:14px
}

</style>

