<template>
 <div class="container" v-loading="loading">
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="formInline.id" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="formInline.identity" placeholder="请选择" clearable @close="clearIdentity">
          <el-option
            v-for="item in identitys"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        prop="uid"
        label="提现人ID">
      </el-table-column>
      <el-table-column
        width="160px"
        prop="nickname"
        label="提现人昵称">
      </el-table-column>
      <el-table-column
        width="200px"
        prop="create_time"
        label="提现时间">
      </el-table-column>
      <el-table-column
        prop="money"
        label="提现金额"
        width="200px">
      </el-table-column>
      <el-table-column
        label="身份">
        <template slot-scope="scope">
          {{scope.row.type | filterText(identitys)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status == 2">{{scope.row.status | filterText(states)}}</el-tag>
          <el-tag type="info" v-if="scope.row.status == 0">{{scope.row.status | filterText(states)}}</el-tag>
          <el-tag type="success" v-if="scope.row.status == 1">{{scope.row.status | filterText(states)}}</el-tag>
        </template>
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
import { getWithdrawList } from '@/api/finance'
export default {
  name: 'depositList',
  data() {
    return {
      loading: true,
      tableLoading: false,
      formInline: {
        nickname: '',
        identity: '',
        id: ''
      },
      identitys: [
        {
        label: '全部',
        value: ''
      }, {
        label: '用户',
        value: '1'
      }, {
        label: '代理',
        value: '3'
      }, {
        label: '商户',
        value: '2'
      }, {
        label: '酒吧管理',
        value: '4'
      }],
      states: [{
        label: '提现中',
        value: '0'
      }, {
        label: '提现成功',
        value: '1'
      }, {
        label: '提现失败',
        value: '2'
      }],
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        type: '',
        beginT: '',
        endT: '',
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      getWithdrawList(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    resetParams() {
      this.params = {
        page: 1,
        pageSize: 10,
        name: '',
        beginT: '',
        endT: '',
        type: '',
        id: ''
      }
    },
    onSubmit() {
      this.resetParams()
      this.params.name = this.formInline.nickname
      this.params.type = this.formInline.identity
      this.params.id = this.formInline.id
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
    clearIdentity() {

    }
  },
  filters: {
    filterText (value, arr) {
      var find = arr.find((v) => v.value == value)
      if (find)
       return find.label
      else
        return ''
    }
  }
}
</script>
