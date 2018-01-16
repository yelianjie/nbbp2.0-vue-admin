<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="showEmptyDiaLog">添加酒吧管理</el-button>
      </el-col>
    </el-row>
    <div style="height:24px;"></div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="nickname"
        label="微信昵称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="img"
        label="头像"
        width="150">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="创建时间"
        width="160">
      </el-table-column>
      <el-table-column
      label="操作">
      <template slot-scope="scope">
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
      <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible">
        <el-tabs v-model="activeName">
          <el-tab-pane label="扫码绑定" name="s1">
            <img src="http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png" class="scanQrcode">
            <p class="scanTip">扫一扫二维码，直接绑定</p>
          </el-tab-pane>
          <el-tab-pane label="完善信息" name="s2" :disabled="!isScan">
            <el-form :model="barManagerForm" :rules="barManagerFormRules" label-width="80px" ref="barManagerFormRules">
              <el-form-item label="微信昵称" prop="nickname">
                <el-input v-model="barManagerForm.nickname" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="头像" prop="img">
                <el-input v-model="barManagerForm.img" auto-complete="off" type="hidden" class="hidden-input" :disabled="true"></el-input>
                <img src="http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png" class="wx_avatar" />
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="barManagerForm.mobile" auto-complete="off" type="number"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBarManager">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogDeleteVisible"
        width="30%">
      <span>是否确定删除该酒吧管理员</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="DeleteBarManager">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'barManager',
  data() {
    return {
      activeName: 's1',
      isScan: false,
      dialogTitle: '添加酒吧管理员',
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      barManagerForm: {
        nickname: '',
        img: '',
        mobile: ''
      },
      barManagerFormRules: {
        nickname: [{ required: true, trigger: 'blur', message: '请输入微信昵称' }],
        img: [{ required: true, trigger: 'blur', message: '头像不能为空' }],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入联系电话' },
          { min: 11, max: 11, trigger: 'blur', message: '请输入正确的电话号码' },
        ]
      },
      tableData: [{
        nickname: '鲜花',
        img: '',
        mobile: 15869598745,
        create_at: '2017-05-05 14:00:00'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit')
    },
    pageChange(currentPage) {
      console.log(currentPage)
    },
    addBarManager() {

    },
    DeleteBarManager() {

    },
    showEmptyDiaLog() {
      this.dialogTitle = '添加酒吧管理员'
      this.dialogFormVisible = true
    },
    handleEdit() {
      this.dialogTitle = '编辑酒吧管理员'
      this.dialogFormVisible = true
    },
    handleDelete() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  /deep/ .el-form {
    margin-top: 30px;
  }
}
.wx_avatar {
  width: 100px;
  height: 100px;
}
.hidden-input {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
}
.scanQrcode {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: block;
}
.scanTip {
  text-align: center;
  font-size: 14px;
}
</style>
