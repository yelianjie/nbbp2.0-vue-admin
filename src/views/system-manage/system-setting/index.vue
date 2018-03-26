<template>
  <div class="container" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统设置</span>
      </div>
      <div class="text item">
        <el-row v-for="(v, i) in sysItems" :key="i" class="sys-item">
         <el-col>
           <!-- <span class="percent-tip">平台分成：不低于</span>
           <el-input-number v-model="form.platform_divide_into" controls-position="right" size="small" :min="25" :max="100" class="input-number-percent"></el-input-number>%
           <span class="percent-tip">用户分成：不高于</span>
           <el-input-number v-model="form.user_divide_into" controls-position="right" size="small" :min="0" :max="100" class="input-number-percent"></el-input-number>%
           <el-button type="primary" @click="setRate" style="margin-left:10px;">设置</el-button> -->
           <span class="percent-tip">{{v.describe}}</span>
           <el-input-number v-if="rules[v.code].type == 'inputNumber'" v-model="v.value" controls-position="right" size="small" :min="rules[v.code].min" :max="rules[v.code].max" class="input-number-percent"></el-input-number>
           <el-input class="el-input-text" v-model="v.value" v-if="rules[v.code].type == 'inputText'" :placeholder="'请输入' + v.describe"></el-input>
           <el-button type="primary" @click="setRate(v.code, v.value)" style="margin-left:10px;">设置</el-button>
         </el-col>
       </el-row>
       
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSysUsers } from '@/api/systemManage'
import { sysValueSet, sysValueList } from '@/api/systemManage'
export default {
  name: 'systemSetting',
  data() {
    return {
      loading: false,
      sysItems: [],
      rules: {
        platform_divide_into: {
          min: 20,
          max: 100,
          type: 'inputNumber'
        },
        user_divide_into: {
          min: 0,
          max: 100,
          type: 'inputNumber'
        },
        agent_max_into: {
          min: 0,
          max: 100,
          type: 'inputNumber'
        },
        send_experience: {
          type: 'inputText'
        },
        platform_sxfei: {
          min: 0,
          max: 100,
          type: 'inputNumber'
        }
      }
    }
  },
  created() {
    sysValueList().then(response => {
      this.sysItems = response.data.result
    })
  },
  mounted() {
  },
  methods: {
    setRate(code, value) {
      sysValueSet({code, value}).then((response) => {
        this.$message.success('修改成功')
      })
    }
  }
}
</script>

<style lang="scss">
.sys-item {
  margin-bottom: 20px;
  /deep/ .el-input-text {
    width: 140px;
  }
}
.percent-tip {
  margin-right: 10px;
}
</style>
