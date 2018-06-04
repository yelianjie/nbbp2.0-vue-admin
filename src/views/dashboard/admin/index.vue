<template>
  <div class="dashboard-editor-container">
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group> -->
    <toolTips :toolTipsData="toolTipsData" ></toolTips>
    <panel-group></panel-group>
    <el-row :gutter="24" style="margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData1"></line-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData2"></line-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData3"></line-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData4"></line-chart>
        </div>
      </el-col>
    </el-row>

    <!--<el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart></raddar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table></transaction-table>
      </el-col>
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <todo-list></todo-list>
      </el-col>
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <box-card></box-card>
      </el-col>
    </el-row>-->

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import toolTips from '@/components/Tips/index'
/* import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard' */
import { getWeeklyFinance } from '@/api/finance'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart,
    toolTips
    /* RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard */
  },
  data() {
    return {
      toolTipsData : [{
        title: '注',
        tooltip: '所有统计时间以北京时间24小时为准'
      },{
        title: '会员用户',
        tooltip: '有充值牛角和兑换牛角行为的用户总数'
      },
      {
        title: '昨日新增会员用户',
        tooltip: '指昨日新增的有充值牛角和兑换牛角行为的用户数量'
      },
      {
        title: '用户总数',
        tooltip: '所有访问用户端前台页面的微信用户总数'
      },
      {
        title: '昨日新增用户',
        tooltip: '统计昨日新访问牛霸用户系统的用户'
      },
      {
        title: '消费总额',
        tooltip: '所有用户订单消费总额  即主题霸屏+打赏礼物+发红包金额（不含红包退款）+点歌霸屏订单金额'
      },
      {
        title: '昨日新增消费额',
        tooltip: '统计昨日所有消费订单总额  即主题霸屏+打赏礼物+发红包金额（不含红包退款）+ 点歌霸屏订单金额'
      },
      {
        title: '总收益',
        tooltip: '所有酒吧的收益之和（商户收益+代理收益+酒吧管理收益+用户收益+平台分成收益+平台管理费）'
      },
      {
        title: '昨日新增收益',
        tooltip: '所有酒吧的昨日新增收益之和（商户收益+代理收益+酒吧管理收益+用户收益+平台分成收益+平台管理费）'
      },
      {
        title: '平台管理费',
        tooltip: '即平台从每笔消费订单收取的1%手续费（含红包订单收取的10%）'
      },
      {
        title: '平台分成收益',
        tooltip: '指平台按照在各个酒吧的分成比例获得的收益总额 （当前参与分成的商品有主题霸屏、打赏礼物、点歌霸屏）'
      },
      {
        title: '平台收益总计',
        tooltip: '平台管理费（含红包10%）+平台分成收益'
      },
      {
        title: '未提现收益',
        tooltip: '指商户、代理、用户、酒吧管理当前未提现的收益总和'
      },
      {
        title: '昨日平台新增收益总计',
        tooltip: '昨日平台管理费（含红包10%）+ 昨日平台分成收益'
      }],
      lineChartData1: {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        title: {
          text: '每日消费趋势',
          top: '-5px'
        },
        series: [
        {
          name: '消费额',
          label: {
            show: true
          },
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      },
      lineChartData2: {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        title: {
          text: '每日新增用户',
          top: '-5px'
        },
        series: [
        {
          name: '新增用户',
          label: {
            show: true
          },
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      },
      lineChartData3: {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        title: {
          text: '总消费趋势',
          top: '-5px'
        },
        series: [
        {
          name: '累计消费额',
          label: {
            show: true
          },
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      },
      lineChartData4: {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        title: {
          text: '每日活跃用户',
          top: '-5px'
        },
        series: [
        {
          name: '活跃用户',
          label: {
            show: true
          },
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    filterData (data, labelField, valueField) {
      var labels = []
      var values = []
      for(var i in data) {
        if (valueField === 'money') {
          labels.push(data[i][labelField])
          values.push(data[i][valueField])
        } else {
          labels.push(data[i][0][labelField])
          values.push(data[i][0][valueField])
        }
      }
      return {
        labels: labels,
        values: values
      }
    }
  },
  created() {
    getWeeklyFinance().then((response) => {
      console.log(response)
      var result = response.data.result
      var line1Data = this.filterData(result.dMoney, 'day', 'money')
      var line2Data = this.filterData(result.dIncNum, 'day', 'num')
      var line3Data = this.filterData(result.tMoney, 'day', 'money')
      var line4Data = this.filterData(result.dIncAcNum, 'day', 'num')

      this.lineChartData1.xAxis.data = line1Data.labels
      this.lineChartData1.series[0].data = line1Data.values
      this.lineChartData2.xAxis.data = line2Data.labels
      this.lineChartData2.series[0].data = line2Data.values
      this.lineChartData3.xAxis.data = line3Data.labels
      this.lineChartData3.series[0].data = line3Data.values
      this.lineChartData4.xAxis.data = line4Data.labels
      this.lineChartData4.series[0].data = line4Data.values
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-custom {
  top: 7rem;
}
.dashboard-editor-container {
  padding: 116px 32px 32px;
  background-color: rgb(240, 242, 245);
  position:relative;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
