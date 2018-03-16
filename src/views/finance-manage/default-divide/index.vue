<template>
 <div class="container" v-loading="loading">
   <el-form :inline="true" :model="formInline" class="divide-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.nickname" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="tableLoading"
      :data="tableData" 
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column 
      label="代理用户名"
      prop="name"
      width="360">
      </el-table-column>
      <el-table-column min-width="300px" label="默认分成比例（%）">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" class="edit-input" size="small" v-model.number="scope.row.default_divide_into"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.default_divide_into }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
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
import { getAgents } from '@/api/userManage'
import { setAgentRate } from '@/api/finance'
export default {
  name: 'defaultDivide',
  data() {
    return {
      loading: true,
      tableLoading: false,
      formInline: {
        username: ''
      },
      params: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      tableData: [],
      total: 0,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      getAgents(this.params).then((response) => {
        let result = response.data.result
        result.data.map((v) => {
          v.edit = false
        })
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
        name: ''
      }
    },
    onSubmit() {
      this.resetParams()
      this.params.name = this.formInline.nickname
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
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      setAgentRate({id: row.id, a_rate: row.default_divide_into}).then((response) => {
        row.originalTitle = row.title
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.percent-tip {
  font-size: 14px;
  &:last-of-type {
    margin-left: 40px;
  }
}
.input-number-percent {
  margin: 0 5px;
}
.divide-form-inline {
  margin: 24px 0;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
}
</style>

