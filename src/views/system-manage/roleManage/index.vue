<template>
  <div class="container" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="$router.push('/systemManage/roleManageEdit')" >添加角色</el-button>
      </el-col>
    </el-row>
    <div style="height:24px;"></div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="160">
      </el-table-column>
      <el-table-column
        prop="title"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="">
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="$router.push({path: '/systemManage/roleManageEdit', query: {id: scope.row.id}})" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
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
import { getRoleList, delRole} from '@/api/systemManage'
export default {
  name: 'systemUser',
  data() {
    return {
      loading: true,
      tableLoading: false,
      params: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      total:0
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
      getRoleList(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
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
    handleDelete(row, index) {
      this.$confirm('是否确定删除该系统用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole({role_id: row.id}).then((res) =>{
          if (res.data.code != '301000') {
          return this.$message.error({
            type: 'error',
            message: res.data.result
          })
        }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        })
      })
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader  {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.wx-user {
  padding:20px 10px 0;
  max-height:500px;
  overflow:auto;
  .wx-user-item {
    margin-bottom:10px
  }
}
.wx_avatar {
  height:0;
  padding-bottom:80%;
  img{
    width:80%;
  }
}
</style>
