<template>
 <div class="sub-container">
   <el-row>
     <el-col :span="24">
       <el-button type="primary" @click.native="showEmptyDiaLog">添加主题</el-button>
     </el-col>
   </el-row>
   <div style="height:24px;"></div>
   <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="主题名称"
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
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible">
      <el-form :model="bpThemeForm" :rules="bpThemeFormRules" label-width="140px" ref="bpThemeFormRules">
        <el-form-item label="主题名称" prop="title">
          <el-input v-model="bpThemeForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            class="avatar-uploader"
            accept="image/*"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="bpThemeForm.img" :src="bpThemeForm.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="bpThemeForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="bpThemeForm.price" auto-complete="off"></el-input>
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
      <span>是否确定删除该主题</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeleteTime">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
export default {
  name: 'bptheme',
  data() {
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入价格'));
      }
      value = Number(value)
      if (!Number.isInteger(value)) {
        callback(new Error('请输入整数'));
      } else {
        callback()
      }
    }
    return {
      dialogTitle: '添加主题',
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      bpThemeForm: {
        title: '',
        img: '',
        type: '',
        price: ''
      },
      bpThemeFormRules: {
        title: [
          { required: true, trigger: 'blur', message: '请输入主题名称' },
          { max: 5, trigger: 'blur', message: '主题名称不能超过5个字符' }
        ],
        img: [{ required: true, trigger: 'blur', message: '请上传图片' }],
        type: [{ required: true, trigger: 'blur', message: '请输入类型' }],
        price: [{ required: true, validator: checkPrice, trigger: 'blur'}]
      },
      tableData: [{
        title: '生日霸屏',
        img: '',
        type: 1,
        price: 100
      }, {
        title: '求约霸屏',
        img: '',
        type: 1,
        price: 200
      }]
    }
  },
  mounted() {
    console.log('init bptheme')
  },
  methods: {
    pageChange(currentPage) {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加主题'
      this.dialogFormVisible = true
    },
    handleEdit() {
      this.dialogTitle = '编辑主题'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      console.log(row)
      this.dialogDeleteVisible = true
    },
    DeleteTime() {

    },
    _beforeAddBpTime() {
      this.$refs.bpThemeFormRules.validate(valid => {
        if (valid) {
          console.log('valid')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.bpThemeForm.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt50K= file.size / 1024 < 100;
      if (!isLt50K) {
        this.$message.error('上传图片大小不能超过 50K!');
      }
      return isLt50K
    }
  }
}
</script>


