<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="formInline.id" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          @change="dateChange"
          v-model="formInline.dateValue"
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
    <el-table
      v-loading="tableLoading"
      fit
      :data="tableData"
      show-summary
      style="width: 100%">
      <el-table-column
        prop="mc_id"
        label="ID">
      </el-table-column>
      <el-table-column
        width="160px"
        label="用户头像">
        <template slot-scope="scope">
          <img class="avatar-user-img" :src="scope.row.headimgurl | uploadPrefixUrl"/>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        prop="nickname"
        label="微信昵称">
      </el-table-column>
      <el-table-column
        prop=""
        label="新增牛角数"
        width="">
      </el-table-column>
      <el-table-column
        prop=""
        label="充值牛角数">
      </el-table-column>
      <el-table-column
        prop=""
        label="兑换牛角数">
      </el-table-column>
      <el-table-column
        prop=""
        label="总消费">
      </el-table-column>
      <el-table-column
        prop=""
        label="总收益">
      </el-table-column>
      <el-table-column
        prop=""
        label="提现总额">
      </el-table-column>
      <el-table-column
        prop=""
        label="收益余额">
      </el-table-column>
      <el-table-column
        prop=""
        label="当前收益总额">
      </el-table-column>
      <el-table-column
        prop=""
        label="当前牛角总数">
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
import { getMembers } from '@/api/userManage'
export default {
  name: 'statisticsUser',
  data() {
    return {
      loading: true,
      tableLoading: false,
      formInline: {
        nickname: '',
        dateValue: ''
      },
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        id: '',
        beginT: '',
        endT: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    // this.getData()
  },
  mounted() {
  },
  methods: {
    getData () {
      this.loading = true
      getMembers(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    onSubmit() {
      this.resetParams()
      this.params.name = this.formInline.nickname
      this.params.id = this.formInline.id
      if (Array.isArray(this.formInline.dateValue) && this.formInline.dateValue.length > 0) {
        this.params.beginT = this.formInline.dateValue[0]
        this.params.endT = this.formInline.dateValue[1]
      }
      this.getData()
      console.log('submit')
    },
    dateChange(value) {

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
    resetParams() {
      this.params = {
        page: 1,
        pageSize: 10,
        name: '',
        id: '',
        beginT: '',
        endT: ''
      }
    }
  }
}
</script>
