<template>
 <div class="sub-container">
   <el-row>
     <el-col :span="24">
       <el-button type="primary" @click.native="showEmptyDiaLog">添加时间</el-button>
     </el-col>
   </el-row>
   <div style="height:24px;"></div>
   <el-table
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
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible">
      <el-form :model="bpTimeForm" :rules="bpTimeFormRules" label-width="140px" ref="bpTimeForm">
        <el-form-item label="霸屏时间" prop="time">
          <el-input v-model="bpTimeForm.time" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="bpTimeForm.price" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_beforeAddBpTime">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogDeleteVisible"
      width="30%">
      <span>是否确定删除该时间</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeleteTime">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
export default {
  name: 'bptime',
  data() {
    return {
      dialogTitle: '添加时间',
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      bpTimeForm: {
        time: '',
        price: ''
      },
      bpTimeFormRules: {
        time: [
          { required: true, trigger: 'blur', message: '请输入霸屏时间' },
          { type: 'number', trigger: 'blur', message: '霸屏时间必须是数字' },
        ],
        price: [{ required: true, trigger: 'blur', message: '请输入价格' }]
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
      console.log(row)
      this.dialogDeleteVisible = true
    },
    DeleteTime() {

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
