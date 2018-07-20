<template>
  <div class="container">
    <el-tooltip placement="left-end">
      <div slot="content" class="tooltip-custom"> 
        <p v-for="(v, i) in toolTipsData"  >
          {{v.title}} : {{v.tooltip}}
        </p>
      </div>
      <i class="el-icon-question icon-custom"  ></i>
    </el-tooltip>
    <panel-number :paneldata="panelData"></panel-number>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="params.name" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="params.id" placeholder="请输入ID" clearable></el-input>
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
    <el-table
      v-loading="loading"
      fit
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="mc_id"
        label="ID">
      </el-table-column>
      <el-table-column
        label="用户头像">
        <template slot-scope="scope">
          <img class="avatar-user-img" :src="scope.row.headimgurl | uploadPrefixUrl"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="微信昵称">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="牛角余额">
      </el-table-column>
      <el-table-column
        prop="profit_balance"
        label="收益余额">
      </el-table-column>
      <el-table-column
        label="贵族等级">
        <template slot-scope="scope">
          <el-tag>{{scope.row.grade_title}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="total_consume_balance"
        label="总消费">
      </el-table-column>
      <el-table-column
        prop="total_profit_balance"
        label="总收益">
      </el-table-column>
      <el-table-column
        label="地区">
        <template slot-scope="scope">
          {{scope.row.province}}-{{scope.row.city}}
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="上次活跃时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="状态"
        width="">
        <template slot-scope="scope">
          <el-tag type="success" v-if='scope.row.status == 0'>使用中</el-tag>
          <el-tag type="danger" v-if='scope.row.status == -1'>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleDisable(scope.row, scope.$index)" type="text" size="small"><template v-if="scope.row.status == 0">禁用</template><template v-else >取消禁用</template></el-button>
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
import panelNumber from '../components/panelNumber'
import { getMembers, getMemberNum, disableWxUser } from '@/api/userManage'
export default {
  name: 'wxManager',
  data() {
    return {
      loading: true,
      tableLoading: false,
      panelData: [[{
        label: '用户总数',
        number: 0,
      }, {
        label: '关注用户',
        number: 0,
      }, {
        label: '会员用户',
        number: 0,
      }], [{
        label: '昨日新增用户数',
        number: 0,
      }, {
        label: '昨日新增会员用户',
        number: 0,
      }, {
        label: '昨日活跃用户',
        number: 0,
      }], [{
        label: '牛角余额',
        number: 0,
        decimals: 2
      }, {
        label: '收益余额',
        number: 0,
        decimals: 2
      }]],
      toolTipsData : [{
        title: '用户总数',
        tooltip: '所有访问牛霸用户系统的用户总数'
      }, {
        title: '关注用户',
        tooltip: '指关注牛霸霸屏公众号的用户总数'
      }, {
        title: '会员用户',
        tooltip: '有充值牛角和兑换牛角行为的用户总数(包括充值购买)'
      }, {
        title: '昨日新增用户数',
        tooltip: '指既访问过我们牛霸系统也关注了牛霸霸屏公众号的总人数'
      }, {
        title: '昨日新增会员用户',
        tooltip: '指昨日新增的有充值牛角和兑换牛角行为的用户数量'
      }, {
        title: '昨日活跃用户',
        tooltip: '指昨日访问牛霸系统的用户数量'
      }, {
        title: '牛角余额',
        tooltip: '所有微信用户当前账户的牛角总数'
      }, {
        title: '收益余额',
        tooltip: '所有微信用户当前账户的收益总额'
      }, {
        title: '总消费',
        tooltip: '指该用户订单消费总额 —— 即主题霸屏+打赏礼物+发红包金额（不含红包退款）+点歌霸屏订单金额'
      },{
        title: '总收益',
        tooltip: '指该用户获得的所有收益总额 （目前有抢现金红包收益、收到打赏礼物的分成收益）'
      }],
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        id: '',
        beginT: '',
        endT: '',
        dateValue: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getData()
    getMemberNum().then((response) => {
      let result = response.data.result
      console.log(result)
      this.panelData[0][0].number = ~~(result.tNum)
      this.panelData[0][1].number = result.sNum
      this.panelData[0][2].number = result.tMember
      this.panelData[1][0].number = result.yIncNum
      this.panelData[1][1].number = result.yIncMNum
      this.panelData[1][2].number = result.acNum
      this.panelData[2][0].number = result.balance
      this.panelData[2][1].number = result.profit_balance
      console.log(this.panelData)
    }).catch((error) => {
    })
  },
  mounted() {
  },
  methods: {
    getData () {
      this.loading = true
      getMembers(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    onSubmit() {
      this.resetParams()
      if (Array.isArray(this.params.dateValue) && this.params.dateValue.length > 0) {
        this.params.beginT = this.params.dateValue[0]
        this.params.endT = this.params.dateValue[1]
      }
      this.getData()
      console.log('submit')
    },
    dateChange(value) {
      if (value == null) {
        this.params.beginT = ''
        this.params.endT = ''
      } else {
        
      }
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
    resetParams() {
      this.params.page = 1
    },
    handleDisable(row, index) {
      let status
      if (row.status == 0) {
        status = -1
      } else {
        status = 0
      }
      disableWxUser({id: row.mc_id, status: status}).then((res) =>{
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
        })
    }
  },
  components: {
    panelNumber
  }
}
</script>

<style lang="scss" scoped>
  .icon-custom {
    font-size: 24px;
    position: absolute;
    top: 2rem;
    right: 1.5rem;
    z-index: 1;
  }
</style>
