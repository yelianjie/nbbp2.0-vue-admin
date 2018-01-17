<template>
 <div class="sub-container" v-loading="loading">
   <el-row>
     <el-col :span="24">
       <el-button type="primary" @click.native="showEmptyDiaLog">添加礼物</el-button>
     </el-col>
   </el-row>
   <div style="height:24px;"></div>
   <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="礼物名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="img"
        label="图片"
        width="150">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="price"
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
      :total="100">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" @close="clearForm">
      <el-form :model="bpGiftForm" status-icon :rules="bpGiftFormRules" label-width="140px" ref="bpGiftForm">
        <el-form-item label="礼物名称" prop="title">
          <el-input v-model="bpGiftForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            class="avatar-uploader"
            accept="image/*"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleIconSuccess"
            :before-upload="beforeIconUpload">
            <img v-if="bpGiftForm.img" :src="bpGiftForm.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="类型" prop="type">
          <el-input v-model="bpGiftForm.type" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="bpGiftForm.price" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="文件包" prop="zipurl">
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
  name: 'bpgift',
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
      dialogTitle: '添加礼物',
      dialogFormVisible: false,
      bpGiftForm: {
        title: '',
        img: '',
        type: '',
        price: '',
        zipurl: ''
      },
      bpGiftFormRules: {
        title: [
          { required: true, trigger: 'blur', message: '请输入主题名称' },
          { max: 5, trigger: 'blur', message: '主题名称不能超过5个字符' }
        ],
        img: [{ required: true, trigger: 'blur', message: '请上传图片' }],
        /* type: [{ required: true, trigger: 'blur', message: '请输入类型' }], */
        price: [{ required: true, validator: isInteger, trigger: 'blur', label: '价格'}],
        zipurl: [{ required: true, trigger: 'blur', message: '请上传文件包'}]
      },
      tableData: [{
        title: '玫瑰花',
        img: '',
        type: 1,
        price: 100
      }, {
        title: '戒指',
        img: '',
        type: 1,
        price: 200
      }]
    }
  },
  mounted() {
    console.log('init bpgift')
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    clearForm() {
      this.$refs.bpGiftForm.clearValidate()
      this.$refs.bpGiftForm.resetFields()
    },
    pageChange(currentPage) {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加礼物'
      this.dialogFormVisible = true
    },
    handleEdit() {
      this.dialogTitle = '编辑礼物'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除该礼物?', '提示', {
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
    _beforeAddBpTime() {
      this.$refs.bpGiftFormRules.validate(valid => {
        if (valid) {
          console.log('valid')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleIconSuccess(res, file) {
      this.bpGiftForm.img = URL.createObjectURL(file.raw);
    },
    beforeIconUpload(file) {
      const isLt50K= file.size / 1024 < 100;
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
