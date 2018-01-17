<template>
 <div class="container" v-loading="loading">
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
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
        width="160px"
        prop="nickname"
        label="提现人昵称">
      </el-table-column>
      <el-table-column
        width="200px"
        prop="deposit_at"
        label="提现时间">
      </el-table-column>
      <el-table-column
        prop="deposit_money"
        label="提现金额"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="identity"
        label="身份">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
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
  name: 'depositList',
  data() {
    return {
      loading: true,
      tableLoading: false,
      formInline: {
        nickname: '',
        identity: ''
      },
      identitys: [{
        label: '代理',
        value: 1
      }, {
        label: '商户',
        value: 2
      }, {
        label: '用户',
        value: 3
      }, {
        label: '酒吧管理',
        value: 4
      }],
      tableData: [{
        nickname: '鲜花',
        deposit_at: '2017-08-12 14:00',
        deposit_money: 50,
        identity: 1,
        status: 0
      }]
    }
  },
  mounted() {
    console.log('deposit mounted!')
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
    clearIdentity() {

    }
  }
}
</script>
