<template>
  <div class="container">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="params.id" placeholder="请输入ID" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="params.nickname" clearable></el-input>
      </el-form-item>
      <el-form-item label="酒吧名称">
        <el-input v-model="params.hotel_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          @change="dateChange"
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
    <link-search v-model="params.type" :links="{ title: '红包类型', links: [{label: '全部', value: ''}, {label: '牛角红包', value: 1}, {label: '现金红包', value: 2}]}" @onClick="onClick"></link-search>
    <link-search v-model="params.is_refund" :links="{ title: '退回金额', links: [{label: '全部', value: 0}, {label: '有', value: 1}, {label: '无', value: 2}]}" @onClick="onClick"></link-search>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop="mc_id"
        label="ID">
      </el-table-column>
      <el-table-column
        width="140px"
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="money"
        width="100px"
        label="红包金额">
      </el-table-column>
      <el-table-column
        width="100px"
        label="红包类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_type == 2">现金红包</el-tag>
          <el-tag type="success" v-if="scope.row.pay_type == 1">牛角红包</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="refund_money"
        width="100px"
        label="退回金额">
      </el-table-column>
      <el-table-column
        prop="real_money"
        width="180px"
        label="实际发红包金额">
      </el-table-column>
      <el-table-column
        prop="order_no"
        label="订单号"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="订单时间"
        width="160px">
      </el-table-column>
      <el-table-column
        label="发放对象">
        <template slot-scope="scope">
          <template v-if="scope.row.type == 0">
            全场
          </template>
          <template v-if="scope.row.type == 2">
            男士
          </template>
          <template v-if="scope.row.type == 1">
            女士
          </template>
          <template v-if="scope.row.type == 3">
            自定义
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="所属酒吧">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click.native="viewPacketDetail(scope.row.id)">查看详情</el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogVisible" @close="paramsDetail.page = 1">
      <el-table :data="detailData" v-loading="tableDetailLoading">
        <el-table-column prop="mc_id" label="ID" width="60"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="160"></el-table-column>
        <el-table-column label="红包类型">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_type == 2">现金红包</el-tag>
            <el-tag type="success" v-if="scope.row.pay_type == 1">牛角红包</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="抢到金额">
          <!-- <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_type == 0">现金红包</el-tag>
            <el-tag type="success" v-if="scope.row.pay_type == 1">牛角红包</el-tag>
          </template> -->
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
        background
        @size-change="handleSizeChangeDetail"
        @current-change="handleCurrentChangeDetail"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDetail">
        </el-pagination>
      </div>
    </el-dialog>
  </div> 
</template>

<script>
import { getRedOrderList, getRedOrderDetail } from '@/api/finance'
import LinkSearch from '@/components/LinkSearch/index'
export default {
  name: 'orderList',
  data() {
    return {
      loading: false,
      tableLoading: false,
      tableDetailLoading: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        type: '',
        beginT: '',
        endT: '',
        id: '',
        dateValue: '',
        hotel_name: '',
        is_refund: 0
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      detailData: [],
      totalDetail: 0,
      paramsDetail: {
        page: 1,
        pageSize: 10
      },
      curDetailId: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    onClick () {
      this.getData()
    },
    viewPacketDetail (id) {
      this.tableDetailLoading = true
      if (id) {
        this.curDetailId = id
      }
      this.dialogVisible = true
      var params = Object.assign(this.paramsDetail, {hb_id: this.curDetailId})
      getRedOrderDetail(params).then((response) => {
        let result = response.data.result
        this.detailData = result.data
        this.totalDetail = result.total
        this.tableDetailLoading = false
      })
    },
    getData () {
      this.loading = true
      getRedOrderList(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    resetParams() {
      this.params.page = 1
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
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
      console.log(`当前页: ${val}`)
    },
    handleSizeChangeDetail(val) {
      this.paramsDetail.pageSize = val
      this.viewPacketDetail()
    },
    handleCurrentChangeDetail(val) {
      this.paramsDetail.page = val
      this.viewPacketDetail()
      console.log(`当前页: ${val}`)
    },
    dateChange(value) {
      if (value == null) {
        this.params.beginT = ''
        this.params.endT = ''
      } else {
        
      }
    }
  },
  components: {
    LinkSearch
  }
}
</script>

<style lang="scss">
.tag {
  margin-bottom: 4px;
}
</style>