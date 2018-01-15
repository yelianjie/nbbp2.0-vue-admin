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
      <el-form-item label="时间">
        <el-date-picker
          v-model="dateValue"
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
        prop="name"
        label="酒吧名称">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总收益">
      </el-table-column>
      <el-table-column
        prop="agent_count"
        label="代理收益">
      </el-table-column>
      <el-table-column
        prop="business_count"
        label="商户收益">
      </el-table-column>
      <el-table-column
        prop="bar_count"
        label="酒吧管理">
      </el-table-column>
      <el-table-column
        prop="user_count"
        label="用户收益">
      </el-table-column>
      <el-table-column
        prop="all_deposit_count"
        label="需提现金额">
      </el-table-column>
      <el-table-column
        prop="can_deposit_count"
        label="待提现金额">
      </el-table-column>
      <el-table-column
        prop="platform_count"
        label="平台收益">
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
  name: 'statistics',
  data() {
    return {
      dateValue: '',
      bars: [{
        label: 'CMK酒吧',
        value: 10
      }, {
        label: '牛霸酒吧',
        value: 9
      }],
      formInline: {
        barName: '',
        status: ''
      },
      dialogVisible: false,
      tableData: [{
        name: 'CMK酒吧',
        total: 100,
        agent_count: 50,
        business_count: 50,
        bar_count: 50,
        user_count: 50,
        all_deposit_count: 10,
        can_deposit_count: 5,
        platform_count: 10
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleDelete(row, index) {
      console.log(row)
      this.dialogVisible = true
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
    pageChange(currentPage) {
      console.log(currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

