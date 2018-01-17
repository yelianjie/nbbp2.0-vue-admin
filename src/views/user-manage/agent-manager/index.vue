<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
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
        prop="nickname"
        label="用户名">
      </el-table-column>
      <el-table-column
        width="160px"
        prop="imgurl"
        label="头像">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系电话"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="注册时间">
      </el-table-column>
      <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
      </template>
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
  name: 'agentManager',
  data() {
    return {
      loading: true,
      tableLoading: false,
      formInline: {
        nickname: ''
      },
      tableData: [{
        nickname: '鲜花',
        imgurl: '',
        mobile: '15869598979',
        create_at: '2017-05-06 14:00:00'
      }]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    pageChange(currentPage) {
      console.log(currentPage)
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该代理?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })      
      })
    }
  }
}
</script>
