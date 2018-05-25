<template>
 <div class="container" v-loading="loading">
  <el-row style="margin-bottom: 10px;">
     <div class="time-wrap" v-if="exeForm.create_time"><div>上传时间：{{exeForm.create_time}}</div><div class="time">{{exeForm.filename}}</div></div>
    <el-upload
      class="upload-demo"
      accept="application/zip"
      :headers="headers"
      :action="'/admin/file_upload/uploadClientExe'| uploadPrefixUrl"
      :show-file-list="false"
      :limit="1"
      :on-success="handleZipExeSuccess">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div style="float:right;">牛霸最新安装包：<a :href="exeForm.url" download="niuba.zip" v-if="exeForm.url"><el-button type="primary" plain>下载</el-button></a>
    <el-button type="primary" plain v-else :disabled="true">下载</el-button></div>
  </el-row>
  <el-button type="primary" icon="el-icon-edit" @click.native="showDialog(false, 1)">新增主版本</el-button>
  <el-tooltip placement="right">
    <div slot="content" class="tooltip-custom"> 
      <p v-if="versions && versions.length > 0">V{{versions[0].version_num}}</p>
      <p>第一位：主版本号，标识客户端大版本更新，新增的次版本都基于此</p>
      <p>第二位、第三位：次版本号，第二位标识客户端更新，第三位表示大屏幕端更新</p>
    </div>
    <i class="el-icon-question"></i>
  </el-tooltip>
  <el-collapse accordion style="margin-top:20px;">
  <el-collapse-item v-for="(v, i) in versions" :key="i">
    <template slot="title">
      <div>
        <div class="version-top"><span class="version">V{{v.version_num}}</span><span class="v_time">创建时间：{{$options.filters.formatDateTime(v.create_time)}}</span><i class="el-icon-edit" @click.stop="showEditDialog(true, v.id, 1)"></i></div>
        <p class="desc">{{v.title}}</p>
      </div> 
    </template>
    <div class="subversion-list">
      <el-button type="primary" icon="el-icon-edit" style="margin-bottom: 20px;" @click.native="showDialog(false, 2, v.id)">新增次版本</el-button>
      <div class="subverison-item" v-for="(vv, ii) in v.next_version" :key="ii">
        <div class="version-top"><span class="version">V{{vv.version_num}}</span><span class="v_time">创建时间：{{$options.filters.formatDateTime(vv.create_time)}}</span><i class="el-icon-edit" @click.stop="showEditDialog(true, vv.id, 2)"></i></div>
        <p class="desc">{{vv.title}}</p>
      </div> 
    </div>
    
  </el-collapse-item>
</el-collapse>
<div class="pagination-container">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="resetFormValue">
      <el-form :model="formInline" label-width="120px" status-icon :rules="formRules" ref="updateForm">
        <el-form-item label="版本更新类别" prop="versionIds" v-if="versionType == 2">
          <el-checkbox-group 
            v-model="formInline.versionIds"
            @change="versionChange"
            :disabled="edit">
            <el-checkbox :label="1">客户端</el-checkbox>
            <el-checkbox :label="2">大屏幕端</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="版本号">{{formInline.version_num}}</el-form-item>
        <el-form-item label="更新标题" prop="title">
          <el-input v-model="formInline.title" auto-complete="off" placeholder="有新版本更新啦！"></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="content">
          <el-input type="textarea" v-model="formInline.content" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="升级文件" prop="file" v-if="formInline.versionIds.indexOf(1) != -1 || !formInline.v_id || versionType == 1">
          <el-upload
          accept="application/zip"
          :headers="headers"
          :action="'/admin/file_upload/uploadUpdate'| uploadPrefixUrl"
          :file-list="fileList"
          :on-success="handleZipSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传ZIP文件</div>
        </el-upload>
        </el-form-item>
        <!-- <el-form-item>
          <div class="tinymce-container editor-container">
            <textarea class="tinymce-textarea" id="view"></textarea>
            <div class="editor-custom-btn-container">
              </div>
          </div>
        </el-form-item> -->
        <el-form-item label="是否上线版本" prop="is_online">
          <el-radio v-model="formInline.is_online" label="1">是</el-radio>
          <el-radio v-model="formInline.is_online" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="上线时间" prop="online_time">
          <el-date-picker
            v-model="formInline.online_time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注信息" prop="notes">
          <el-input type="textarea" v-model="formInline.notes" :rows="4" placeholder="请输入备注内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateVersion">确 定</el-button>
      </div>
    </el-dialog>
  </div> 
</template>

<script>
import { getAgents } from '@/api/userManage'
import { mapGetters } from 'vuex'
import { AddVersion, getVersion, checkVersion, editVersion, getClientMsg } from '@/api/version'
export default {
  name: 'systemVersionUser',
  data() {
    return {
      loading: false,
      fileList: [],
      headers: {},
      params: {
        page: 1,
        pageSize: 10,
        beginT: '',
        endT: '',
        type: 1
      },
      formInline: {
        type: 1,
        v_id: 0,
        version_ids: '',
        versionIds: [],
        is_online: '',
        version_num: '',
        title: '',
        content: '',
        online_time: '',
        notes: '',
        file: '',
        update_file_url: ''
      },
      dialogFormVisible: false,
      value: '',
      toolbar: ['removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright'],
      menubar: '',
      height: 260,
      hasChange: false,
      hasInit: false,
      edit: false,
      editVersion: '',
      versionType: 1, // 1主版本添加 2次版本添加
      formRules: {
        version_ids: [
          { required: true, trigger: 'blur', message: '请选择更新类别' }
        ],
        title: [{ required: true, trigger: 'blur', message: '请填写更新标题' }],
        content: [{ required: true, trigger: 'blur', message: '请填写更新内容'}],
        is_online: [{ required: true, trigger: 'blur', message: '请选择是否上线版本' }],
        online_time: [{ required: true, trigger: 'blur', message: '请填写上线时间'}],
        file: [{ required: true, trigger: 'blur', message: '请上传zip文件'}]
      },
      total: 0,
      versions: [],
      lastVersion: '',
      exeForm:  {
        url: '',
        upload_time: ''
      }
    }
  },
  created() {
    this.getData()
    this.getNewestPackage()
  },
  mounted() {
    this.headers = {
      tId: this.token
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    },
    dialogFormVisible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initTinymce()
        })
      }
    }
  },
  computed: {
    title () {
      return this.edit === true ? '版本编辑' : '版本添加'
    },
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    getNewestPackage () {
      getClientMsg().then((response) => {
        if (Array.isArray(response.data.result)) {
          this.exeForm = response.data.result[0]
        } 
      })
    },
    handleZipExeSuccess (response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.exeForm = response.result
    },
    handleZipSuccess(response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.formInline.file = response.result
      this.formInline.update_file_url = response.result
      this.fileList = [{
        name: this.filterExtension(response.result),
        url: response.result
      }]
    },
    resetFormValue () {
      this.formInline = {
        type: 1,
        v_id: 0,
        version_ids: '',
        versionIds: [],
        is_online: '',
        version_num: '',
        title: '',
        content: '',
        online_time: '',
        notes: '',
        file: '',
        update_file_url: ''
      }
      this.$refs.updateForm.resetFields()
      this.fileList = []
    },
    updateVersion () {
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          this.formInline.version_ids = this.formInline.versionIds.join(',')
          var _actions = AddVersion
          if (this.edit) {
            _actions = editVersion
          }
          _actions(this.formInline).then((res) => {
            this.dialogFormVisible = false
            this.getData()
            this.getNewestPackage()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showDialog (state, vType, parentId) {
      if (parentId) {
        this.formInline.v_id = parentId
      } else {
        this.formInline.v_id = 0
      }
      console.log(this.formInline.v_id)
      this.dialogFormVisible = true
      this.edit = state
      this.versionType = vType
      if (vType === 1) {
        var arr = this.lastVersion.split('.')
        arr[0] = ~~(arr[0]) + 1
        arr[1] = 0
        arr[2] = 0
        this.formInline.version_num = arr.join('.')
      } else {
        this.formInline.version_num = this.lastVersion
      }
    },
    showEditDialog (state, vid, vType) {
      this.formInline.v_id = vid
      this.dialogFormVisible = true
      this.edit = state
      this.versionType = vType
      checkVersion({v_id: vid}).then((res) => {
        res.data.result.data.versionIds = res.data.result.data.version_ids.map(v => ~~(v))
        res.data.result.data.online_time = this.$options.filters.formatDateTime(res.data.result.data.online_time)
        this.formInline = Object.assign({}, this.formInline, res.data.result.data)
        var url = res.data.result.data.update_file_url
        if (url) {
          this.fileList.push({
            name: this.filterExtension(url),
            url: url
          })
        }
      })
    },
    filterExtension (str) {
      return str.substring(str.lastIndexOf('/') + 1)
    },
    versionChange (value) {
      var arr = this.editVersion.split('.')
      if (value.indexOf(1) != - 1) {
        arr[1] = ~~(arr[1]) + 1
      }
      var nextVersions = value.filter((v) => [2].indexOf(v) > -1)
      if (nextVersions.length > 0) {
        arr[2] = ~~(arr[2]) + 1
      }
      this.formInline.version_num = arr.join('.')
    },
    getData () {
      this.loading = true
      getVersion(this.params).then((res) => {
        this.versions = res.data.result.data
        if (this.versions[0]) {
          if (this.versions[0].next_version.length > 0) {
            this.lastVersion =  this.versions[0].next_version[0].version_num
          } else {
            this.lastVersion = this.versions[0].version_num
          }
          this.editVersion = this.lastVersion
        } else {
          this.lastVersion = '0.0.0'
          this.editVersion = this.lastVersion
        }
        this.loading = false
        this.total = res.data.result.total
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
    initTinymce() {
      if (this.hasInit) {
        return false
      }
      const _this = this
      window.tinymce.init({
        selector: `#view`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar,
        menubar: this.menubar,
        plugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
        imagetools_toolbar: 'watermark',
        default_link_target: '_blank',
        link_title: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent({ format: 'raw' }))
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style lang="scss" scoped>
.percent-tip {
  font-size: 14px;
  &:last-of-type {
    margin-left: 40px;
  }
}
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
.tinymce-container {
  position: relative
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 15px;
  /*z-index: 2005;*/
  top: 18px;
}
.editor-upload-btn {
  display: inline-block;
}
.container /deep/ {
  .version-top {
    padding: 8px 0;
  }
  .el-collapse-item__header {
    height: auto;
    line-height: 1;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .el-collapse-item__arrow {
    font-size: 20px;
  }
}
.version-top {
  .el-icon-edit {
    font-size: 20px;
    float: right;
    margin-top: 4px;
    margin-right: 8px;
  }
}
.version {
  line-height: 24px;
  margin: 5px 0;
  font-size: 24px;
  font-weight: normal;
}
.v_time {
  margin-left: 20px;
  color: #a2a1a1;
}
.desc {
  line-height: 20px;
  font-size: 16px;
  margin: 0 0 8px;
}
.subversion-list {
  padding: 10px 0 10px 40px;
}
.subverison-item {
  padding: 0 10px 10px 10px;
  background-color: #fbfbfb;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #f1f1f1;
    content: "";
  }
}
.tooltip-custom {
  max-width: 300px;
  p {
    margin: 0;
    line-height: 1.4;
  }
}
.upload-demo {
  float: right;
  margin-left: 10px;
}
.time-wrap {
  float:right;
  margin-left: 8px;
  color: #939393;
  position:relative;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

