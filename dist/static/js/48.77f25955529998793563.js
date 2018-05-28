webpackJsonp([48],{JtQv:function(a,e,t){var n=t("UnKs");"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);t("rjj0")("1fddc94a",n,!0)},TGHs:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("ms7A"),i={name:"barManager",data:function(){return{loading:!0,tableLoading:!1,activeName:"s1",isScan:!1,dialogTitle:"添加酒吧管理员",dialogFormVisible:!1,barManagerForm:{nickname:"",img:"",phone:""},barManagerFormRules:{nickname:[{required:!0,trigger:"blur",message:"请输入微信昵称"}],img:[{required:!0,trigger:"blur",message:"头像不能为空"}],phone:[{required:!0,trigger:"blur",message:"请输入联系电话"},{min:11,max:11,trigger:"blur",message:"请输入正确的电话号码"}]},params:{page:1,pageSize:10,id:"",name:""},tableData:[],total:0}},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var a=this;this.loading=!0,Object(n.d)(this.params).then(function(e){var t=e.data.result;a.tableData=t.data,a.total=t.total,a.loading=!1}).catch(function(e){a.loading=!1})},onSubmit:function(){this.resetParams(),this.getData(),console.log("submit")},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},addBarManager:function(){},DeleteBarManager:function(){},showEmptyDiaLog:function(){this.dialogTitle="添加酒吧管理",this.dialogFormVisible=!0},handleEdit:function(){this.dialogTitle="编辑酒吧管理",this.dialogFormVisible=!0},handleDelete:function(a,e){var t=this;this.$confirm("是否确定删除该酒吧管理?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.b)({id:a.id}).then(function(){t.$message({type:"success",message:"删除成功!"}),t.getData()}).catch(function(a){t.$message({type:"error",message:a.msg})}),t.$message({type:"success",message:"删除成功!"})}).catch(function(){})},clearForm:function(){this.$refs.barManagerForm.clearValidate(),this.$refs.barManagerForm.resetFields()},resetParams:function(){this.params.page=1}}},r={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:a.params.name,callback:function(e){a.$set(a.params,"name",e)},expression:"params.name"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"ID"}},[t("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:a.params.id,callback:function(e){a.$set(a.params,"id",e)},expression:"params.id"}})],1),a._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),t("div",{staticStyle:{height:"24px"}}),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:a.tableData}},[t("el-table-column",{attrs:{prop:"mc_id",label:"ID"}}),a._v(" "),t("el-table-column",{attrs:{prop:"nickname",label:"微信昵称",width:"220"}}),a._v(" "),t("el-table-column",{attrs:{label:"头像",width:"150"},scopedSlots:a._u([{key:"default",fn:function(e){return[t("img",{staticClass:"avatar-user-img",attrs:{src:a._f("uploadPrefixUrl")(e.row.headimgurl)}})]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"phone",label:"联系电话",width:"180"}}),a._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"创建时间"}})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}}),a._v(" "),t("el-dialog",{attrs:{title:a.dialogTitle,visible:a.dialogFormVisible},on:{"update:visible":function(e){a.dialogFormVisible=e},close:a.clearForm}},[t("el-tabs",{model:{value:a.activeName,callback:function(e){a.activeName=e},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"扫码绑定",name:"s1"}},[t("img",{staticClass:"scanQrcode",attrs:{src:"http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png"}}),a._v(" "),t("p",{staticClass:"scanTip"},[a._v("扫一扫二维码，直接绑定")])]),a._v(" "),t("el-tab-pane",{attrs:{label:"完善信息",name:"s2",disabled:!a.isScan}},[t("el-form",{ref:"barManagerForm",attrs:{model:a.barManagerForm,rules:a.barManagerFormRules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"微信昵称",prop:"nickname"}},[t("el-input",{attrs:{"auto-complete":"off",disabled:!0},model:{value:a.barManagerForm.nickname,callback:function(e){a.$set(a.barManagerForm,"nickname",e)},expression:"barManagerForm.nickname"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"头像",prop:"img"}},[t("el-input",{staticClass:"hidden-input",attrs:{"auto-complete":"off",type:"hidden",disabled:!0},model:{value:a.barManagerForm.img,callback:function(e){a.$set(a.barManagerForm,"img",e)},expression:"barManagerForm.img"}}),a._v(" "),t("img",{staticClass:"wx_avatar",attrs:{src:"http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[t("el-input",{attrs:{"auto-complete":"off",type:"number"},model:{value:a.barManagerForm.phone,callback:function(e){a.$set(a.barManagerForm,"phone",e)},expression:"barManagerForm.phone"}})],1)],1)],1)],1),a._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){a.dialogFormVisible=!1}}},[a._v("取 消")]),a._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:a.addBarManager}},[a._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var l=t("VU/8")(i,r,!1,function(a){t("JtQv")},"data-v-3492f1a2",null);e.default=l.exports},UnKs:function(a,e,t){(a.exports=t("FZ+f")(!1)).push([a.i,"\n.wx_avatar[data-v-3492f1a2] {\n  width: 100px;\n  height: 100px;\n}\n.hidden-input[data-v-3492f1a2] {\n  position: absolute;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n.scanQrcode[data-v-3492f1a2] {\n  width: 300px;\n  height: 300px;\n  margin: 0 auto;\n  display: block;\n}\n.scanTip[data-v-3492f1a2] {\n  text-align: center;\n  font-size: 14px;\n}\n",""])}});