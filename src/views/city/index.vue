<template>
  <div class="container" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="showEmptyDiaLog">添加</el-button>
      </el-col>
    </el-row>
    <div style="height:24px;"></div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="label"
        label="名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="province"
        label="属于省"
        width="250">
        <template slot-scope="scope">
          <span v-if="scope.row.province">{{ scope.row.province }}</span>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="属于市"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.city">{{ scope.row.city }}</span>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
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
      <el-form :model="cityForm" status-icon :rules="cityFormRules" label-width="140px" ref="cityForm">
        <el-form-item label="名称" prop="label">
          <el-input v-model="cityForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code">
          <el-input v-model="cityForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="属于" prop="parent">
          <el-cascader
            placeholder="选择省或城市"
            :options="options"
            filterable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addArea">确 定</el-button>
      </div>
    </el-dialog>
  
  </div> 
</template>

<script>
export default {
  name: 'city',
  data() {
    return {
      loading: true,
      tableLoading: false,
      dialogTitle: '添加',
      dialogFormVisible: false,
      cityForm: {
        label: '',
        code: '',
        parent: ''
      },
      cityFormRules: {
        label: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        code: [{ required: true, trigger: 'blur', message: '请输入code' }]
      },
      options: [],
      tableData: [{
        label: '宁波市',
        province: '浙江省',
        city: ''
      }]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    showEmptyDiaLog() {
      this.dialogTitle = '添加'
      this.dialogFormVisible = true
    },
    clearForm() {
      this.$refs.cityForm.resetFields()
      this.$refs.cityForm.clearValidate()
    },
    addArea() {

    },
    pageChange(currentPage) {

    },
    handleEdit() {
      this.dialogTitle = '编辑'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      console.log(row)
      this.dialogDeleteVisible = true
    }
  }
}
</script>
