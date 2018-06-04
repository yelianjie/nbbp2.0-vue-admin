<template>
  

  <el-row class="panel-group" :gutter="24">
    <el-col :xs="12" :sm="12" :lg="7" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <!-- <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="user" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <el-row :gutter="24">
            <el-col :xs="12" :sm="12" :lg="12">
              <div class="card-panel-text">会员用户</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="counts.tMember" :duration="200"></count-to>
              <div class="card-panel-text">用户总数</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="counts.tNum" :duration="200"></count-to>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="12">
              <div class="card-panel-text">昨日新增会员用户</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="counts.yIncMNum" :duration="200"></count-to>
              <div class="card-panel-text">昨日新增用户</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="counts.yIncNum" :duration="200"></count-to>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="7" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <!-- <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="divide" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <el-row :gutter="24">
            <el-col :xs="12" :sm="12" :lg="12">
              <div class="card-panel-text">消费总额</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="counts.tMoney" :duration="200"></count-to>
              <div class="card-panel-text">昨日新增消费额</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="counts.yMoney" :duration="200"></count-to>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="12">
              <div class="card-panel-text">总收益</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="counts.tProfile" :duration="200"></count-to>
              <div class="card-panel-text">昨日新增收益</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="counts.yProfile" :duration="200"></count-to>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="10" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <!-- <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="statistics" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <el-row :gutter="24">
            <el-col :xs="8" :sm="8" :lg="8">
              <div class="card-panel-text">平台收益</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="counts.cMoney" :duration="200"></count-to>
              <div class="card-panel-text">未提现金额（除平台收益）</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="Number(counts.nWithdraw)" :duration="200"></count-to>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8">
              <div class="card-panel-text">平台管理费</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="counts.shouxf" :duration="200"></count-to>
              <div class="card-panel-text">昨日平台新增收益统计</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="Number(counts.ycMoney)" :duration="200"></count-to>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8">
              <div class="card-panel-text" style='margin-top:0'>平台收益总计</div>
              <count-to class="card-panel-num" :decimals="2" :startVal="0" :endVal="Number(counts.tcMoney)" :duration="200"></count-to>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getFinance } from '@/api/finance'
export default {
  data() {
    return {
      counts: {}
    }
  },
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  },
  created() {
    getFinance().then((response) => {
      console.log(response.data.result)
      this.counts = response.data.result
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  padding-right:30px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 170px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 45px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      //float: right;
      font-weight: bold;
      margin: 26px;
      //margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        margin-bottom: 12px;
      }
      .card-panel-text:last-of-type {
        margin-top: 12px;
      }
      .card-panel-num {
        font-size: 18px;
      }
    }
  }
}
</style>
