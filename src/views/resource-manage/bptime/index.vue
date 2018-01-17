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
      prop="price"
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
    @current-change="pageChange"
    layout="total, sizes, prev, pager, next, jumper"
    :total="100">
    </el-pagination>
  </div>
  <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" @close="clearForm">
    <el-form :model="bpTimeForm" status-icon :rules="bpTimeFormRules" label-width="140px" ref="bpTimeForm">
      <el-form-item label="霸屏时间" prop="time">
        <el-input v-model.number="bpTimeForm.time" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="bpTimeForm.price" auto-complete="off"></el-input>
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
export default {
  name: 'bptime',
  data() {
    var isInteger = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入' + rule.label));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入整数'))
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
        price: ''
      },
      bpTimeFormRules: {
        time: [
          {  required: true, validator: isInteger, trigger: 'blur', label: '霸屏时间' }
        ],
        price: [
          {  required: true, validator: isInteger, trigger: 'blur', label: '价格' }
        ]
      },
      tableData: [{
        time: 60,
        price: 100
      }, {
        time: 10,
        price: 20
      }]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    pageChange(currentPage) {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加时间'
      this.dialogFormVisible = true
    },
    handleEdit() {
      this.dialogTitle = '编辑时间'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该时间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })      
      })
    },
    DeleteTime() {

    },
    clearForm() {
      this.$refs.bpTimeForm.clearValidate()
      this.$refs.bpTimeForm.resetFields()
    },
    _beforeAddBpTime() {
      this.$refs.bpTimeForm.validate(valid => {
        if (valid) {
          console.log('valid')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
