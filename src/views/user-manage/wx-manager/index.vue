<template>
  <div class="container" v-loading="loading">
    <panel-number :paneldata="panelData"></panel-number>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          @change="dateChange"
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
      v-loading="tableLoading"
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
        prop="last_time_at"
        label="上次活跃时间">
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
  name: 'wxManager',
  data() {
    return {
      loading: true,
      tableLoading: false,
      panelData: [{
        label: '用户总数',
        number: 5000
      }, {
        label: '昨日新增用户数',
        numer: 400
      }, {
        label: '昨日活跃用户数',
        number: 3000
      }],
      formInline: {
        nickname: '',
        dateValue: ''
      },
      tableData: [{
        avatar: '',
        nickname: '我是一个机器人',
        area: '江苏 南京',
        last_time_at: '2017-12-31 15:00:30'
      }]
    }
  },
  mounted() {
    console.log('wxmanager mounted!')
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    onSubmit() {
      console.log('submit')
    },
    pageChange(currentPage) {
      console.log(currentPage)
    },
    dateChange(value) {

    }
  },
  components: {
    panelNumber
  }
}
</script>
