<template>
  <div class="container">
    <el-form autoComplete="on" ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色名" prop="title"  >
        <el-input v-model="form.title" :maxlength = '10'></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menu_string">
        <el-tree
          :data="powers"
          node-key="code"
          show-checkbox
          default-expand-all
          ref="tree"
          :props="powerVal">
        </el-tree>
      </el-form-item>

      <div style="text-align: center;">
        <el-checkbox v-model="isAll" @change="checkAll" style="padding: 0 20px;">全选</el-checkbox>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addRole, editRole, getRoleInfo} from '@/api/systemManage'
import { powerTree } from '@/utils/auth'

export default {
  data() {
    return {
      form: {
        title: '',
        menu_string: []
      },
      rules: {
        title: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        menu_string: [{ required: true, message: '请选择角色权限' }]
      },
      isAll: false,
      powerVal: {
        children: 'child',
        label: 'title'
      },
      powers: powerTree
    }
  },
  created() {
    if (this.$route.query.id) {
      getRoleInfo({ role_id: this.$route.query.id }).then(info => {
        let data = info.data.result
        this.form = {
          title: data.title,
          menu_string: data.menu_string
        }
        if (this.form.menu_string.length > 0) this.$refs.tree.setCheckedKeys(this.form.menu_string)
      })
    }
  },
  methods: {
    checkAll() {
      if (this.isAll) {
        var arr = []
        powerTree.forEach((v) => {
          arr.push({ code: v.code, label: '' })
        })
        this.$refs.tree.setCheckedNodes(arr)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    onSubmit() {
      let self = this
      let pid = this.$route.query.id
      this.form.menu_string = this.$refs.tree.getCheckedKeys()
      function call(res) {
        console.log(res)
        if (res.data.code != 301000) {
          return self.$message('添加失败!')
        }
        self.$message({
          type: 'success',
          message: '添加成功!'
        })
        self.$router.replace('/systemManage/roleManage')
        if (pid == self.$store.state.user.roles.id.toString()) {
          location.reload()
        }
      }
      this.$refs.form.validate(valid => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        if (this.$route.query.id) editRole(Object.assign({},{ role_id: this.$route.query.id },this.form)).then(call)
        else addRole(this.form).then(call)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

.el-tree-node__expand-icon.is-leaf{display: none;}
.el-tree{
  .expanded{
    display: none;
  }
  .el-tree-node__content{
    height: 36px;
    padding-right: 20px;
  }
  .el-checkbox{padding-left: 10px;}
  >div{
    >.el-tree-node__content{
      background-color: #f5f7fa;
      .expanded{
        display: block;
      }
      &+.el-tree-node__children {
        padding-left:20px
      }
    }
  }
}
</style>
