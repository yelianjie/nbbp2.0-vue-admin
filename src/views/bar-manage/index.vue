<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="酒吧名称">
        <el-input v-model="formInline.nickname" placeholder="请输入酒吧名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="状态选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核未通过" value="0"></el-option>
          <el-option label="已解约" value="-1"></el-option>
          <el-option label="已删除" value="-2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="地区">
        <el-cascader
          :options="CityInfo"
          v-model="form.selectedOptions"
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
          <img class="avatar" :src="scope.row.logo | uploadPrefixUrl"/>
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
        <template slot-scope="scope">
          {{status[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleEdit(scope.row, scope.$index)">审核&编辑</el-button>
        <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
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
import { getBars } from '@/api/barManage'
export default {
  name: 'barManage',
  data() {
    return {
      loading: true,
      tableLoading: false,
      CityInfo: CityInfo,
      form: {
        city: '',
        erae: '',
        minerae: '',
        selectedOptions: []
      },
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
        status: ''
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
      total: 0
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
      var city, erae, minerae
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
      }
      console.log(city, erae, minerae)
    },
    handleDelete(row, index) {
      console.log(row)
      this.dialogVisible = true
    },
    DeleteBar() {
      alert('delete')
      this.dialogVisible = false
    },
    handleEdit(row, index) {
      this.$router.push({
        path: '/barManageDo/edit',
        query: {
          edit: Math.random()
        }
      })
    },
    handleChange(value) {
      this.form.city = this.form.selectedOptions[0]
      this.form.erae = this.form.selectedOptions[1]
      this.form.minerae = this.form.selectedOptions[2]
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
      console.log(`当前页: ${val}`)
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

