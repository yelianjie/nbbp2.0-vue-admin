<template>
 <div class="sub-container" v-loading="loading">
   <el-row>
     <el-col :span="24">
       <el-button type="primary" @click.native="showEmptyDiaLog">添加主题</el-button>
     </el-col>
   </el-row>
   <div style="height:24px;"></div>
   <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="主题名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图片"
        width="150">
        <template slot-scope="scope">
          <img :src="scope.row.icon | uploadPrefixUrl" style="width: 80px;height: 80px;"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="default_price"
        label="价格"
        width="160">
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
      :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" @close="clearForm">
      <el-form :model="bpThemeForm" status-icon :rules="bpThemeFormRules" label-width="140px" ref="bpThemeForm">
        <el-form-item label="主题名称" prop="title">
          <el-input v-model="bpThemeForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="icon">
          <el-upload
            class="avatar-uploader"
            accept="image/*"
            action=""
            :http-request="uploadIcon"
            :show-file-list="false"
            :before-upload="beforeIconUpload">
            <img v-if="bpThemeForm.icon" :src="bpThemeForm.icon | uploadPrefixUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="类型" prop="type">
          <el-input v-model="bpThemeForm.type" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="价格" prop="default_price">
          <el-input v-model.number="bpThemeForm.default_price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="主题地址" prop="url">
          <el-input v-model.number="bpThemeForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="文件包" prop="zipurl">
          <el-upload
            ref="zipUpload"
            class="upload-demo"
            :before-upload="beforeZipUpload"
            drag
            :limit="1"
            :before-remove="beforeRemoveZip"
            :on-remove="handleRemoveZip"
            :on-exceed="handleExceedZip"
            action="https://jsonplaceholder.typicode.com/posts/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将ZIP文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>-->
        <!--<el-form-item label="主题资源配置项" prop="url">
          <el-upload
            ref="zipUpload"
            class="upload-demo"
            :before-upload="beforeZipUpload"
            drag
            :limit="1"
            :before-remove="beforeRemoveZip"
            :on-remove="handleRemoveZip"
            :on-exceed="handleExceedZip"
            action="https://jsonplaceholder.typicode.com/posts/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将ZIP文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_beforeAddBpTime">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import  { getBpThemes, addBpTheme, updateBpTheme, uploadImg, deleteBp } from '@/api/resource'
export default {
  name: 'bptheme',
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
      dialogTitle: '添加主题',
      dialogFormVisible: false,
      bpThemeForm: {
        title: '',
        icon: '',
        default_price: '',
        url: ''
      },
      bpThemeFormRules: {
        title: [
          { required: true, trigger: 'blur', message: '请输入主题名称' },
          { max: 5, trigger: 'blur', message: '主题名称不能超过5个字符' }
        ],
        icon: [{ required: true, trigger: 'blur', message: '请上传图片' }],
        /* type: [{ required: true, trigger: 'blur', message: '请输入类型' }], */
        default_price: [{ required: true, validator: isPositive, trigger: 'blur', label: '价格'}],
        url: [{ required: true, trigger: 'blur', message: '请输入主题地址' }]
        /* url: [{ required: true, trigger: 'blur', message: '请上传主题资源配置项'}] */
      },
      tableData: [],
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.bpThemeFormReset = Object.assign({}, this.bpThemeForm)
  },
  methods: {
    getData () {
      this.loading = true
      getBpThemes(this.params).then((response) => {
        let result = response.data.result
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    clearForm() {
      this.$refs.bpThemeForm.clearValidate()
      this.$refs.bpThemeForm.resetFields()
      this.bpThemeForm = Object.assign({}, this.bpThemeFormReset)
    },
    pageChange(currentPage) {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加主题'
      this.dialogFormVisible = true
    },
    handleEdit(row, index) {
      this.bpThemeForm = Object.assign({}, row)
      this.dialogTitle = '编辑主题'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该主题?', '提示', {
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        })      
      })
    },
    _beforeAddBpTime() {
      this.$refs.bpThemeForm.validate(valid => {
        if (valid) {
          let request = () => {}
          let msg = ''
          if (this.dialogTitle == '添加主题') {
            request = addBpTheme
            msg = '添加成功'
          } else {
            request = updateBpTheme
            msg = '更新成功'
          }
          request(this.bpThemeForm).then((response) => {
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
    },
    uploadIcon(item) {
      if (!this.beforeIconUpload(item.file))
        return
      let formData = new FormData()
      formData.append('file', item.file)
      uploadImg(formData).catch(err => {
        this.$message.error('上传失败，请重新上传')
      }).then(res => {
        this.$message.success('上传成功')
        this.bpThemeForm.icon = res.data.result
      })
    },
    beforeIconUpload(file) {
      const isLt50K= file.size / 1024 < 50;
      if (!isLt50K) {
        this.$message.error('上传图片大小不能超过 50K!');
      }
      return isLt50K
    },
    beforeZipUpload(file) {
      const isZip = file.type === 'application/x-zip-compressed'
      if (!isZip) {
        this.$message.error('文件包只能是Zip格式！')
        return false
      }
      return isZip
    },
    handleExceedZip(files, fileList) {
      console.log('exceed')
      this.$message.error('请先删除原有的文件包再上传！')
    },
    beforeRemoveZip(file, fileList) {
      return this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    handleRemoveZip(file, fileList) {
      console.log(file)
    }
  }
}
</script>


