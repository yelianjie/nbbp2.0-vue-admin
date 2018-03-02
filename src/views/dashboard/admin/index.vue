<template>
  <div class="dashboard-editor-container">
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group> -->
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
/* import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard' */
import { getWeeklyFinance } from '@/api/finance'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart
    /* RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard */
  },
  data() {
    return {
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
          data: lineChartData.newVisitis.actualData,
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
          data: lineChartData.newVisitis.actualData,
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
          data: lineChartData.newVisitis.actualData,
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
          data: lineChartData.newVisitis.actualData,
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
.dashboard-editor-container {
  padding: 116px 32px 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
