<template>
  <div class="container">
    <el-form :inline="true" :model="params" class="demo-form-inline">
    	<el-form-item label="用户名ID">
        <el-input v-model="params.mc_id" placeholder="请输入用户名ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="params.nickname" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="操作者ID">
        <el-input v-model="params.del_id" placeholder="请输入操作者ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="操作者昵称">
        <el-input v-model="params.del_name" placeholder="请输入操作者昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="酒吧名称">
        <el-input v-model="params.hotel_name" placeholder="请输入酒吧名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="params.dateValue"
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
    <div style="height:24px;"></div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="initiator_mc_id"
        label="用户名ID"
        width=120>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>

      <el-table-column
        label="消息类型">
        <template slot-scope="scope">
          <span v-if="scope.row.msg_type == 0">普通消费</span>
          <span v-if="scope.row.msg_type == 1">{{scope.row.title}}</span>
          <span v-if="scope.row.msg_type == 2">{{scope.row.title}}</span>
          <span v-if="scope.row.msg_type == 3">红包消费</span>
          <span v-if="scope.row.msg_type == 4">点歌消费</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图片">
        <template slot-scope="scope" >
          <img height='50' width='50' class="avatar-user-img" v-if="scope.row.img" :src="scope.row.img" />
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="消息详情">
         <template slot-scope="scope">
         	<span v-if="scope.row.content" class='single-hide'>{{scope.row.content}}</span>
         	<span v-else>无</span>
         </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="发送时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="所属酒吧">
      </el-table-column>
      <el-table-column
        prop="del_id"
        label="操作者ID">
      </el-table-column>
      <el-table-column
        prop="del_name"
        label="操作者昵称">
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleCancelDeleteMessage(scope.row, scope.$index)" type="text" size="small">取消删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
      background
      :current-page = "params.page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import { getBarDeleteMessageList, cancelDeleteMessage} from '@/api/message'
export default {
  name: 'messageManager',
  data() {
    return {
      loading: true,
      params: {
        page: 1,
        pageSize: 10,
        nickname: '',
        mc_id: '',
        del_name: '',
        del_id: '',
        hotel_name: '',
        dateValue: '',
        beginT: '',
        endT: ''
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
      getBarDeleteMessageList(this.params).then((response) => {
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
    onSubmit() {
      this.resetParams()
      if (Array.isArray(this.params.dateValue) && this.params.dateValue.length > 0) {
        this.params.beginT = this.params.dateValue[0]
        this.params.endT = this.params.dateValue[1]
      }
      this.getData()
      console.log('submit!')
    },
    resetParams() {
      this.params.page = 1
    },
    handleCancelDeleteMessage(row) {
    	this.$confirm('是否还原该条消息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelDeleteMessage({id: row.id}).then((res) => {
        if (res.data.code != '301000') {
          return this.$message.error({
            type: 'error',
            message: res.data.result
          })
        }
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getData()
        }).catch((error) => {
          // this.$message({
          //   type: 'error',
          //   message: error.msg
          // })
        })
      }).catch((err) => { 
      	console.log(err)   
      })
    }
  }
}
</script>

<style lang="scss" scoped>

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
