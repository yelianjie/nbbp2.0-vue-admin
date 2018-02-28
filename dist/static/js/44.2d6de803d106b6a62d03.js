webpackJsonp([44],{TGHs:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"barManager",data:function(){return{loading:!0,tableLoading:!1,activeName:"s1",isScan:!1,dialogTitle:"添加酒吧管理员",dialogFormVisible:!1,barManagerForm:{nickname:"",img:"",mobile:""},barManagerFormRules:{nickname:[{required:!0,trigger:"blur",message:"请输入微信昵称"}],img:[{required:!0,trigger:"blur",message:"头像不能为空"}],mobile:[{required:!0,trigger:"blur",message:"请输入联系电话"},{min:11,max:11,trigger:"blur",message:"请输入正确的电话号码"}]},tableData:[{nickname:"鲜花",img:"",mobile:15869598745,create_at:"2017-05-05 14:00:00"}]}},mounted:function(){var a=this;setTimeout(function(){a.loading=!1},2e3)},methods:{onSubmit:function(){console.log("submit")},pageChange:function(a){console.log(a)},addBarManager:function(){},DeleteBarManager:function(){},showEmptyDiaLog:function(){this.dialogTitle="添加酒吧管理员",this.dialogFormVisible=!0},handleEdit:function(){this.dialogTitle="编辑酒吧管理员",this.dialogFormVisible=!0},handleDelete:function(){var a=this;this.$confirm("是否确定删除该酒吧管理员?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$message({type:"success",message:"删除成功!"})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},clearForm:function(){this.$refs.barManagerForm.clearValidate(),this.$refs.barManagerForm.resetFields()}}},i={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"container"},[t("el-row",[t("el-col",{attrs:{span:24}},[t("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){a.showEmptyDiaLog(e)}}},[a._v("添加酒吧管理")])],1)],1),a._v(" "),t("div",{staticStyle:{height:"24px"}}),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{data:a.tableData}},[t("el-table-column",{attrs:{prop:"nickname",label:"微信昵称",width:"220"}}),a._v(" "),t("el-table-column",{attrs:{prop:"img",label:"头像",width:"150"}}),a._v(" "),t("el-table-column",{attrs:{prop:"mobile",label:"联系电话",width:"180"}}),a._v(" "),t("el-table-column",{attrs:{prop:"create_at",label:"创建时间",width:"160"}}),a._v(" "),t("el-table-column",{attrs:{label:"操作"},scopedSlots:a._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){a.handleDelete(e.row,e.$index)}}},[a._v("删除")])]}}])})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"current-change":a.pageChange}}),a._v(" "),t("el-dialog",{attrs:{title:a.dialogTitle,visible:a.dialogFormVisible},on:{"update:visible":function(e){a.dialogFormVisible=e},close:a.clearForm}},[t("el-tabs",{model:{value:a.activeName,callback:function(e){a.activeName=e},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"扫码绑定",name:"s1"}},[t("img",{staticClass:"scanQrcode",attrs:{src:"http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png"}}),a._v(" "),t("p",{staticClass:"scanTip"},[a._v("扫一扫二维码，直接绑定")])]),a._v(" "),t("el-tab-pane",{attrs:{label:"完善信息",name:"s2",disabled:!a.isScan}},[t("el-form",{ref:"barManagerForm",attrs:{model:a.barManagerForm,rules:a.barManagerFormRules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"微信昵称",prop:"nickname"}},[t("el-input",{attrs:{"auto-complete":"off",disabled:!0},model:{value:a.barManagerForm.nickname,callback:function(e){a.$set(a.barManagerForm,"nickname",e)},expression:"barManagerForm.nickname"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"头像",prop:"img"}},[t("el-input",{staticClass:"hidden-input",attrs:{"auto-complete":"off",type:"hidden",disabled:!0},model:{value:a.barManagerForm.img,callback:function(e){a.$set(a.barManagerForm,"img",e)},expression:"barManagerForm.img"}}),a._v(" "),t("img",{staticClass:"wx_avatar",attrs:{src:"http://nb.siweiquanjing.com/attachment/bar/20171227191747_227.png"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"联系电话",prop:"mobile"}},[t("el-input",{attrs:{"auto-complete":"off",type:"number"},model:{value:a.barManagerForm.mobile,callback:function(e){a.$set(a.barManagerForm,"mobile",e)},expression:"barManagerForm.mobile"}})],1)],1)],1)],1),a._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){a.dialogFormVisible=!1}}},[a._v("取 消")]),a._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:a.addBarManager}},[a._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var r=t("VU/8")(n,i,!1,function(a){t("g+k6")},"data-v-37d4a9b1",null);e.default=r.exports},"g+k6":function(a,e,t){var n=t("myBi");"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);t("rjj0")("f2d34b14",n,!0)},myBi:function(a,e,t){(a.exports=t("FZ+f")(!1)).push([a.i,"\n.container[data-v-37d4a9b1] .el-form {\n  margin-top: 30px;\n}\n.wx_avatar[data-v-37d4a9b1] {\n  width: 100px;\n  height: 100px;\n}\n.hidden-input[data-v-37d4a9b1] {\n  position: absolute;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n.scanQrcode[data-v-37d4a9b1] {\n  width: 300px;\n  height: 300px;\n  margin: 0 auto;\n  display: block;\n}\n.scanTip[data-v-37d4a9b1] {\n  text-align: center;\n  font-size: 14px;\n}\n",""])}});