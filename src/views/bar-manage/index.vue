<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-input v-model="formInline.barName" placeholder="请输入酒吧名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="状态选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核未通过" value="0"></el-option>
          <el-option label="已解约" value="-1"></el-option>
          <!-- <el-option label="已删除" value="-2"></el-option> -->
        </el-select>
      </el-form-item>
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
    <el-table
      v-loading="tableLoading"
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
          {{scope.row.province_name}}{{scope.row.city_name}}{{scope.row.area_name}}{{scope.row.address}}
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
        <el-button type="text" size="small" @click="handleEdit(scope.row, scope.$index)">审核&编辑</el-button>
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
 </div>
</template>

<script>
import CityInfo from '@/vendor/city-data.js'
import { getBars, deleteBar } from '@/api/barManage'
export default {
  name: 'barManage',
  data() {
    return {
      loading: true,
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
        barName: '',
        status: '',
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
        area: ''
      },
      tableData: [],
      total: 0,
      deleteData: {}
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
      this.params.name = this.formInline.barName
      this.params.status = this.formInline.status
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
      this.$router.push({
        path: `/barManageDo/edit/${row.id}`,
        query: {
          edit: Math.random()
        }
      })
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
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
      console.log(`当前页: ${val}`)
    },
    resetParams() {
      this.params = {
        page: 1,
        pageSize: 10,
        name: '',
        status: '',
        area: ''
      }
    }
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

