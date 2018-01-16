<template>
  <div class="container">
    <panel-number :paneldata="panelData"></panel-number>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
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
        prop="avatar"
        label="用户头像">
      </el-table-column>
      <el-table-column
        width="160px"
        prop="nickname"
        label="微信昵称">
      </el-table-column>
      <el-table-column
        prop="area"
        label="地区"
        width="120px">
      </el-table-column>
      <el-table-column
        prop="count"
        label="充值总金额">
      </el-table-column>
      <el-table-column
        prop="rest"
        label="账户余额">
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
import panelNumber from '../components/panelNumber'
export default {
  name: 'rechargeManager',
  data() {
    return {
      panelData: [{
        label: '会员总数',
        number: 5000
      }, {
        label: '昨日新增会员数',
        numer: 400
      }, {
        label: '账户余额',
        number: 3000
      }],
      formInline: {
        nickname: ''
      },
      tableData: [{
        avatar: '',
        nickname: '我是一个机器人',
        area: '江苏 南京',
        count: 5000,
        rest: 500
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit')
    },
    pageChange(currentPage) {
      console.log(currentPage)
    }
  },
  components: {
    panelNumber
  }
}
</script>

