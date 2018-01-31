<template>
  <div class="sub-container" v-loading="loading">
   <el-row>
     <el-col :span="24">
       <el-button type="primary" @click.native="showEmptyDiaLog">添加时间</el-button>
     </el-col>
   </el-row>
   <div style="height:24px;"></div>
   <el-table
    v-loading="tableLoading"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="time"
      label="时间"
      width="220">
    </el-table-column>
    <el-table-column
      prop="default_price"
      label="价格"
      width="350">
    </el-table-column>
    <el-table-column
    label="操作">
    <template slot-scope="scope">
      <el-button type="text" size="small" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
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
  <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" @close="clearForm">
    <el-form :model="bpTimeForm" status-icon :rules="bpTimeFormRules" label-width="140px" ref="bpTimeForm">
      <el-form-item label="霸屏时间" prop="time">
        <el-input v-model.number="bpTimeForm.time" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="default_price">
        <el-input v-model.number="bpTimeForm.default_price" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="_beforeAddBpTime">确 定</el-button>
    </div>
  </el-dialog>
 </div>
</template>

<script>
import  { getBpTimes, addBpTime, updateBpTime, deleteBp } from '@/api/resource'
export default {
  name: 'bptime',
  data() {
    var reg = /^\d+(?=\.{0,1}\d+$|$)/
    var isPositive = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入' + rule.label));
      }
      if (!reg.test(value)) {
        callback(new Error('请输入正数'))
      } else {
        callback()
      }
    }
    return {
      loading: true,
      tableLoading: false,
      dialogTitle: '添加时间',
      dialogFormVisible: false,
      bpTimeForm: {
        time: '',
        default_price: ''
      },
      bpTimeFormRules: {
        time: [
          {  required: true, validator: isPositive, trigger: 'blur', label: '霸屏时间' }
        ],
        default_price: [
          {  required: true, validator: isPositive, trigger: 'blur', label: '价格' }
        ]
      },
      params: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.bpTimeFormReset = Object.assign({}, this.bpTimeForm)
  },
  methods: {
    getData () {
      this.loading = true
      getBpTimes(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      })
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
    showEmptyDiaLog() {
      this.dialogTitle = '添加时间'
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.bpTimeForm = Object.assign({}, row)
      this.dialogTitle = '编辑时间'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该时间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBp({id: row.id}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error.msg
          })
        })
        
      }).catch(() => {     
      })
    },
    clearForm() {
      this.$refs.bpTimeForm.clearValidate()
      this.$refs.bpTimeForm.resetFields()
      this.bpTimeForm = this.bpTimeFormReset
    },
    _beforeAddBpTime() {
      this.$refs.bpTimeForm.validate(valid => {
        if (valid) {
          let request = () => {}
          let msg = ''
          if (this.dialogTitle == '添加时间') {
            request = addBpTime
            msg = '添加成功'
          } else {
            request = updateBpTime
            msg = '更新成功'
          }
          request(this.bpTimeForm).then((response) => {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.clearForm()
            this.dialogFormVisible = false
            this.getData()
          }).catch((error) => {
            this.$message({
              message: error.msg,
              type: 'error'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
