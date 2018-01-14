<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-input v-model="formInline.barName" placeholder="酒吧名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="状态选择">
          <el-option label="全部" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核未通过" value="2"></el-option>
          <el-option label="已解约" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="logo"
        label="酒吧logo"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="酒吧名称">
      </el-table-column>
      <el-table-column
        prop="area"
        label="地区"
        width="150">
      </el-table-column>
      <el-table-column
        prop="join_at"
        label="入驻时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="agent"
        label="代理"
        width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row, scope.$index)" type="text" size="small">审核</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
      </el-pagination>
    </div>
    
 </div>
</template>

<script>
export default {
  name: 'barManage',
  data() {
    return {
      formInline: {
        barName: '',
        status: ''
      },
      tableData: [{
        logo: '',
        name: 'CMK酒吧',
        area: '浙江省宁波市',
        join_at: '2016-05-02',
        agent: '鲜花',
        status: 1
      }, {
        logo: '',
        name: 'CMK酒吧',
        area: '浙江省宁波市',
        join_at: '2016-05-02',
        agent: '鲜花',
        status: 2
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleClick(row, index) {
      console.log(row)
    },
    handleEdit(row, index) {
      this.$router.push({
        path: '/barManageDo/edit',
        query: {
          edit: Math.random()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 32px;
}
</style>

