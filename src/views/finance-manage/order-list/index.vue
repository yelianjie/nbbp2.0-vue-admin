<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-select v-model="formInline.barName" placeholder="请选择" clearable>
          <el-option
            v-for="item in bars"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.type" placeholder="请选择" clearable>
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
          v-model="formInline.dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        width="160px"
        prop="order_no"
        label="订单编号">
      </el-table-column>
      <el-table-column
        width="120px"
        prop="order_nickname"
        label="消费者昵称">
      </el-table-column>
      <el-table-column
        prop="order_at"
        label="订单时间"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="order_time"
        label="霸屏时长">
      </el-table-column>
      <el-table-column
        prop="order_type"
        label="霸屏类型">
      </el-table-column>
      <el-table-column
        prop="order_money"
        label="订单金额">
      </el-table-column>
      <el-table-column
        prop="order_divide"
        label="分成金额">
      </el-table-column>
      <el-table-column
        prop="order_barname"
        label="酒吧名称">
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
      background
      @current-change="pageChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
      </el-pagination>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'orderList',
  data() {
    return {
      bars: [{
        label: 'CMK酒吧',
        value: 10
      }, {
        label: '牛霸酒吧',
        value: 9
      }],
      types: [{
        label: '主题霸屏',
        value: 1
      }, {
        label: '礼物霸屏',
        value: 2
      }],
      formInline: {
        barName: '',
        dateValue: '',
        type: ''
      },
      tableData: [{
        order_no: 123456789,
        order_at: '2017-09-08 14:00:00',
        order_money: 50,
        order_nickname: '鲜花',
        order_type: 1,
        order_divide: 10,
        order_time: 60,
        order_barname: 'CMK酒吧'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    pageChange(currentPage) {
      console.log(currentPage)
    }
  }
}
</script>
