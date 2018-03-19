<template>
  <el-row class="panel-group" :gutter="24">
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col" v-for="(v, i) in paneldata" :key="i">
        <div class='card-panel'>
          <el-row class="panel-group" :gutter="24">
          <el-col :span="v.length | getRow" v-for="(vv, ii) in v" :key="ii" class="number-col">
          <div class="card-panel-description">
            <div class="card-panel-text">{{vv.label}}</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="v.number" :duration="2000" :decimals="v.decimals" v-if="v.decimals"></count-to>
            <count-to class="card-panel-num" :startVal="0" :endVal="v.number" :duration="2000" v-else></count-to>
          </div>
          </el-col>
          </el-row>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'panelGroup',
  props: ['paneldata'],
  data() {
    return {

    }
  },
  components: {
    CountTo
  },
  filters: {
    getRow (v) {
      if (v === 2) {
        return 24
      } else {
        return 12
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-panel {
  padding: 24px;
  border: 1px solid #e9e9e9;
}
.card-panel-col {
  margin-bottom: 24px;
}
.card-panel-text {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 12px;
}
.card-panel-num {
  font-size: 20px;
  font-weight: bold;
}
.number-col {
  margin-bottom: 15px;
}
</style>

