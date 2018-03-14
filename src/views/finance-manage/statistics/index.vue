<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-input v-model="formInline.barName" placeholder="请输入酒吧名称" clearable></el-input>
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
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="酒吧名称">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总收益">
      </el-table-column>
      <el-table-column
        prop="t1"
        label="代理收益">
      </el-table-column>
      <el-table-column
        prop="t2"
        label="商户收益">
      </el-table-column>
      <el-table-column
        prop="t3"
        label="酒吧管理">
      </el-table-column>
      <el-table-column
        prop="t4"
        label="用户收益">
      </el-table-column>
      <el-table-column
        label="非平台收益之和">
        <template slot-scope="scope">
          {{scope.row | calNotSysMoney}}
        </template>
      </el-table-column>
      <el-table-column
        prop="t5"
        label="平台收益">
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
import { Subtr } from '@/utils/index'
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
      formInline: {
        barName: '',
        dateValue: ''
      },
      dialogVisible: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        beginT: '',
        endT: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  methods: {
    getData () {
      this.loading = true
      getHtFinanceList(this.params).then((response) => {
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
        endT: ''
      }
    },
    onSubmit() {
      this.resetParams()
      this.params.name = this.formInline.barName
      if (Array.isArray(this.formInline.dateValue) && this.formInline.dateValue.length > 0) {
        this.params.beginT = this.formInline.dateValue[0]
        this.params.endT = this.formInline.dateValue[1]
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
    clearBar() {

    },
    dateChange(value) {
      if (value == null) {

      } else {

      }
    }
  },
  filters: {
    calNotSysMoney (value) {
      var sum = value.total == null ? 0 : value.total
      return Subtr(sum, value.t5)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

