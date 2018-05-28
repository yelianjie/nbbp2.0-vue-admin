webpackJsonp([62],{TRRj:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("woOf"),o=a.n(i),r=a("RRo+"),l=a.n(r),n=a("xJrl"),s={name:"bptheme",data:function(){return{loading:!0,tableLoading:!1,dialogTitle:"添加主题",dialogFormVisible:!1,bpThemeForm:{title:"",icon:"",default_price:"",url:""},bpThemeFormRules:{title:[{required:!0,trigger:"blur",message:"请输入主题名称"},{max:5,trigger:"blur",message:"主题名称不能超过5个字符"}],icon:[{required:!0,trigger:"blur",message:"请上传图片"}],default_price:[{required:!0,validator:function(e,t,a){if(""===t||void 0===t||null===t)return a(new Error("请输入"+e.label));l()(t)?a():a(new Error("请输入整数"))},trigger:"blur",label:"价格"}],url:[{required:!0,trigger:"blur",message:"请输入主题地址"}]},tableData:[],params:{page:1,pageSize:10},total:0}},created:function(){this.getData()},mounted:function(){this.bpThemeFormReset=o()({},this.bpThemeForm)},methods:{getData:function(){var e=this;this.loading=!0,Object(n.f)(this.params).then(function(t){var a=t.data.result;e.tableData=a.data,e.total=a.total,e.loading=!1}).catch(function(t){e.loading=!1})},clearForm:function(){this.$refs.bpThemeForm.clearValidate(),this.$refs.bpThemeForm.resetFields(),this.bpThemeForm=o()({},this.bpThemeFormReset)},handleSizeChange:function(e){this.params.pageSize=e,this.getData()},handleCurrentChange:function(e){this.params.page=e,this.getData(),console.log("当前页: "+e)},showEmptyDiaLog:function(){this.dialogTitle="添加主题",this.dialogFormVisible=!0},handleEdit:function(e,t){this.bpThemeForm=o()({},e),this.dialogTitle="编辑主题",this.dialogFormVisible=!0},handleDelete:function(e,t){var a=this;this.$confirm("是否确定删除该主题?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.d)({id:e.id}).then(function(){a.$message({type:"success",message:"删除成功!"}),a.getData()}).catch(function(e){a.$message({type:"error",message:e.msg})})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},_beforeAddBpTime:function(){var e=this;this.$refs.bpThemeForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;var a=function(){},i="";"添加主题"==e.dialogTitle?(a=n.b,i="添加成功"):(a=n.i,i="更新成功"),a(e.bpThemeForm).then(function(t){e.$message({message:i,type:"success"}),e.clearForm(),e.dialogFormVisible=!1,e.getData()}).catch(function(t){e.$message({message:t.msg,type:"error"})})})},uploadIcon:function(e){var t=this;if(this.beforeIconUpload(e.file)){var a=new FormData;a.append("file",e.file),Object(n.k)(a).catch(function(e){t.$message.error("上传失败，请重新上传")}).then(function(e){t.$message.success("上传成功"),t.bpThemeForm.icon=e.data.result})}},beforeIconUpload:function(e){var t=e.size/1024<50;return t||this.$message.error("上传图片大小不能超过 50K!"),t},beforeZipUpload:function(e){var t="application/x-zip-compressed"===e.type;return t||(this.$message.error("文件包只能是Zip格式！"),!1)},handleExceedZip:function(e,t){console.log("exceed"),this.$message.error("请先删除原有的文件包再上传！")},beforeRemoveZip:function(e,t){return this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"})},handleRemoveZip:function(e,t){console.log(e)}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"sub-container"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.showEmptyDiaLog(t)}}},[e._v("添加主题")])],1)],1),e._v(" "),a("div",{staticStyle:{height:"24px"}}),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{prop:"title",label:"主题名称",width:"220"}}),e._v(" "),a("el-table-column",{attrs:{prop:"icon",label:"图片",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"80px",height:"80px"},attrs:{src:e._f("uploadPrefixUrl")(t.row.icon)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"default_price",label:"价格",width:"160"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.handleEdit(t.row,t.$index)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.handleDelete(t.row,t.$index)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.clearForm}},[a("el-form",{ref:"bpThemeForm",attrs:{model:e.bpThemeForm,"status-icon":"",rules:e.bpThemeFormRules,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"主题名称",prop:"title"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.bpThemeForm.title,callback:function(t){e.$set(e.bpThemeForm,"title",t)},expression:"bpThemeForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"图片",prop:"icon"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",action:"","http-request":e.uploadIcon,"show-file-list":!1,"before-upload":e.beforeIconUpload}},[e.bpThemeForm.icon?a("img",{staticClass:"avatar",attrs:{src:e._f("uploadPrefixUrl")(e.bpThemeForm.icon)}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"价格",prop:"default_price"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.bpThemeForm.default_price,callback:function(t){e.$set(e.bpThemeForm,"default_price",e._n(t))},expression:"bpThemeForm.default_price"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"主题地址",prop:"url"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.bpThemeForm.url,callback:function(t){e.$set(e.bpThemeForm,"url",e._n(t))},expression:"bpThemeForm.url"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e._beforeAddBpTime}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]},m=a("VU/8")(s,c,!1,null,null,null);t.default=m.exports}});