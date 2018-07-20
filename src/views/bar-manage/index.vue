<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-input v-model="params.name" placeholder="请输入酒吧名称" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="状态选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核未通过" value="0"></el-option>
          <el-option label="已解约" value="-1"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item  label="地区">
        <el-cascader
          :options="CityInfo"
          v-model="formInline.selectedOptions"
          :change-on-select="false"
          :clearable="true"
          :filterable="true"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <link-search v-model="params.status" :links="{ title: '审核状态', links: [{label: '全部', value: ''}, {label: '审核通过', value:'1'}, {label: '审核未通过', value: '0'}, {label: '已解约', value: '-1'}]}" @onClick="getData"></link-search>
      <!-- <link-search v-model="params.screenStatus" :links="{ title: '大屏幕开启状态', links: [{label: '全部', value: ''}, {label: '开启中', value:'1'}, {label: '未开启', value: '0'}]}" @onClick="getData"></link-search> -->
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="酒吧logo"
        width="120">
        <template slot-scope="scope">
          <img class="avatar-user-img" :src="scope.row.logo | uploadPrefixUrl"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="酒吧名称"
        width="220">
      </el-table-column>
      <el-table-column
        label="地区">
        <template slot-scope="scope">
          {{scope.row.province_name}}{{scope.row.city_name}}
        </template>
      </el-table-column>
      <el-table-column
        label="大屏幕开启状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.is_open_client == 1">开启中</el-tag>
          <el-tag type="info" v-if="scope.row.is_open_client == 0">未开启</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="大屏幕昨日开启时长"
        :render-header="renderScreenTimeTitle">
        <template slot-scope="scope">
          <span v-if="scope.row.time != 0" style="color: #409EFF;cursor: pointer;" @click="showTimeTable(scope.row.id, scope.row.name)">{{scope.row.time}}</span>
          <span v-else>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="入驻时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="agent_name"
        label="代理"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.agent_name">{{scope.row.agent_name}}</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">{{status[scope.row.status]}}</el-tag>
          <el-tag type="warning" v-if="scope.row.status == 0">{{status[scope.row.status]}}</el-tag>
          <el-tag type="danger" v-if="scope.row.status == -1">{{status[scope.row.status]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({path: '/barManageDo/edit', query: {id: scope.row.id}})" >审核&编辑</el-button>
        <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small" v-if="scope.row.status == -1">删除</el-button>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>是否确定删除该酒吧</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeleteBar">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="curTitle" :visible.sync="timeVisible" @close="resetTimeParams">
      <el-form :inline="true" :model="timeParams" class="demo-form-inline">
        <el-form-item label="时间">
          <el-date-picker
            @change="dateChange"
            v-model="timeParams.dateValue"
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
      <SummaryLine>
      总计时长：{{time_duration_total}}
    </SummaryLine>
      <el-table :data="timeTableData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="duration" label="时长" width="200"></el-table-column>
        <el-table-column property="detail" label="详情"></el-table-column>
      </el-table>
      <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleTimeTableSizeChange"
        @current-change="handleTimeTableCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="timeTotal">
        </el-pagination>
      </div>
    </el-dialog>

 </div>
</template>

<script>
import CityInfo from '@/vendor/city-data.js'
import { getBars, deleteBar, getScreenDetailTime } from '@/api/barManage'
import LinkSearch from '@/components/LinkSearch/index'
import SummaryLine from '@/components/Summary/index'
export default {
  name: 'barManage',
  data() {
    return {
      loading: true,
      timeVisible: false,
      tableLoading: false,
      CityInfo: CityInfo,
      status: {
        '1': '审核通过',
        '-1': '已解约',
        '0': '审核未通过',
        '-2': '已删除'
      },
      bars: [{
        label: 'CMK酒吧',
        value: 10
      }, {
        label: '牛霸酒吧',
        value: 9
      }],
      formInline: {
        city: '',
        erae: '',
        minerae: '',
        selectedOptions: []
      },
      dialogVisible: false,
      params: {
        page: 1,
        pageSize: 10,
        name: '',
        status: '',
        area: '',
        screenStatus: ''
      },
      tableData: [],
      total: 0,
      deleteData: {},
      timeParams: {
        page: 1,
        pageSize: 10,
        beginT: '',
        endT: '',
        dateValue: ''
      },
      timeTableData: [],
      timeTotal: 0,
      curTitle: '',
      time_duration_total: 0
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
      getBars(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    showTimeTable (ht_id, ht_name) {
      this.timeVisible = true
      this.timeParams.ht_id = ht_id
      this.curTitle = ht_name + '--大屏幕开启时间'
      this.getTimeData()
    },
    getTimeData () {
      getScreenDetailTime(this.timeParams).then((response) => {
        this.timeTableData = response.data.result.data
        this.timeTotal = response.data.result.total
        this.time_duration_total = response.data.result.total_time
      })
    },
    onSubmit() {
      console.log('submit!')
      /*var city, erae, minerae
       for (var y in this.CityInfo) {
        if (this.CityInfo[y].value === this.form.city) {
          city = this.CityInfo[y].label
        }
      }
      for (var y in this.CityInfo) {
				for (var z in this.CityInfo[y].children){
					if (this.CityInfo[y].children[z].value === this.form.erae && this.form.erae !== undefined) {
						erae = this.CityInfo[y].children[z].label
					}
				}
      }
      for (var y in this.CityInfo) {
				for (var z in this.CityInfo[y].children) {
					for (var i in this.CityInfo[y].children[z].children){
						if (this.CityInfo[y].children[z].children[i].value === this.form.minerae && this.form.minerae !== undefined) {
							minerae = this.CityInfo[y].children[z].children[i].label
						}
					}
				}
      } */
      this.params.area = this.formInline.minerae
      console.log(this.params)
      this.getData()
    },
    handleDelete(row, index) {
      console.log(row)
      this.dialogVisible = true
      this.deleteData = row
    },
    DeleteBar() {
      deleteBar({id: this.deleteData.id}).then((response) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getData()
      })
      this.dialogVisible = false  
    },
    handleEdit(row, index) {
      // this.$router.push({
      //   path: `/barManageDo/edit`,
      //   query: {
      //     id: row.id
      //   }
      // })
    },
    handleChange(value) {
      this.formInline.city = this.formInline.selectedOptions[0]
      this.formInline.erae = this.formInline.selectedOptions[1]
      this.formInline.minerae = this.formInline.selectedOptions[2]
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getData()
    },
    handleTimeTableSizeChange () {
      this.timeParams.pageSize = val
      this.getTimeData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
      console.log(`当前页: ${val}`)
    },
    handleTimeTableCurrentChange (val) {
      this.timeParams.page = val
      this.getTimeData()
    },
    resetParams() {
      this.params = {
        page: 1,
        pageSize: 10,
        name: '',
        status: '',
        area: ''
      }
    },
    resetTimeParams () {
      this.timeParams = {
        page: 1,
        pageSize: 10,
        beginT: '',
        endT: '',
        dateValue: ''
      }
    },
    renderScreenTimeTitle(h,{column}){
      return(
          <div class="cell">{column.label}<el-tooltip
        class="item"
        effect="dark"
        content="昨日中午12点到今日中午12点"
        placement="top"
        ><i class="el-icon-question"></i></el-tooltip></div> 
      )
    },
    dateChange(value) {
      if (value == null) {
        this.timeParams.beginT = ''
        this.timeParams.endT = ''
      } else {
        
      }
    },
    onSubmit() {
      if (Array.isArray(this.timeParams.dateValue) && this.timeParams.dateValue.length > 0) {
        this.timeParams.beginT = this.timeParams.dateValue[0]
        this.timeParams.endT = this.timeParams.dateValue[1]
      }
      this.getTimeData()
      console.log('submit!')
    },
  },
  components: {
    LinkSearch,
    SummaryLine
  }
}
</script>

<style lang="scss" scoped>
.container {
  /deep/ .el-loading-mask {
    z-index: 2000;
  }
}

</style>

