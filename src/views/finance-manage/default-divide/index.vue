<template>
 <div class="container">
   <el-row>
     <el-col :span="8">
       平台分成：不低于
       <el-input-number v-model="platform_percent" controls-position="right" @change="handleChange" :min="1" :max="25" class="input-number-percent"></el-input-number>%
     </el-col>
     <el-col :span="8">
       用户分成：不高于
       <el-input-number v-model="user_percent" controls-position="right" @change="handleChange" :min="1" :max="70" class="input-number-percent"></el-input-number>%
     </el-col>
   </el-row>
   <el-form :inline="true" :model="formInline" class="divide-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.nickname" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" fit highlight-current-row style="width: 100%">
      <el-table-column 
      label="代理用户名"
      prop="nickname"
      width="360">
      </el-table-column>
      <el-table-column min-width="300px" label="默认分成比例（%）">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.percent"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.percent }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div> 
</template>

<script>
export default {
  name: 'defaultDivide',
  data() {
    return {
      platform_percent: 25,
      user_percent: 70,
      formInline: {
        username: ''
      },
      tableData: [{
        nickname: '鲜花',
        percent: 25,
        edit: false
      }, {
        nickname: '牛霸',
        percent: 20,
        edit: false
      }]
    }
  },
  mounted() {
    console.log('ggg')
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    onSubmit() {
      console.log('submit!')
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number-percent {
  margin: 0 5px;
}
.divide-form-inline {
  margin: 24px 0;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
}
</style>

