<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
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
      fit
      :data="tableData"
      style="width: 100%">
      <el-table-column
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
        label="充值时间"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="order_money"
        label="充值金额">
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
  name: 'rechargeList',
  data() {
    return {
      formInline: {
        nickname: '',
        dateValue: ''
      },
      tableData: [{
        order_no: 123456789,
        order_at: '2017-09-08 14:00:00',
        order_money: 50,
        order_nickname: '鲜花'
      }]
    }
  },
  mounted() {
    console.log('recharge mounted!')
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
