<template>
 <div class="container" v-loading="loading">
   <el-button style="float:right;" type="primary" icon="el-icon-edit" @click.native="dialogFormVisible = true">新增版本</el-button>
    <el-table
      v-loading="tableLoading"
      :data="tableData" 
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column 
      label="版本号"
      prop=""
      width="360">
      </el-table-column>
      <el-table-column min-width="300px" label="版本标题">
        
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click='' size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="primary" @click='' size="small" icon="el-icon-document">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
    <el-dialog title="版本添加" :visible.sync="dialogFormVisible">
      <el-form :model="formInline">
        <el-form-item label="版本号">
          <el-input v-model="formInline.version" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本标题" >
          <el-input v-model="formInline.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="tinymce-container editor-container">
            <textarea class="tinymce-textarea" id="view"></textarea>
            <div class="editor-custom-btn-container">
              </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div> 
</template>

<script>
import { getAgents } from '@/api/userManage'
import { setAgentRate } from '@/api/finance'
export default {
  name: 'defaultDivide',
  data() {
    return {
      loading: false,
      tableLoading: false,
      formInline: {
        version: '',
        title: '',
        content: ''
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      value: '',
      toolbar: ['removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright'],
      menubar: '',
      height: 260,
      params: {
        page: 1,
        pageSize: 10
      },
      hasChange: false,
      hasInit: false,
    }
  },
  created() {
    // this.getData()
  },
  mounted() {
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
  methods: {
    getData () {
      this.loading = true
      getAgents(this.params).then((response) => {
        let result = response.data.result
        result.data.map((v) => {
          v.edit = false
        })
        this.tableData = result.data
        this.total = result.total
        this.loading = false
      }).catch((error) => {
        this.loading = false
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
</style>

