webpackJsonp([38],{"6vAC":function(a,t,e){(a.exports=e("FZ+f")(!1)).push([a.i,"\n.wx-user[data-v-d89cc620] {\n  padding: 20px 10px 0;\n  max-height: 500px;\n  overflow: auto;\n}\n.wx-user .wx-user-item[data-v-d89cc620] {\n    margin-bottom: 10px;\n}\n.wx_avatar[data-v-d89cc620] {\n  height: 0;\n  padding-bottom: 80%;\n}\n.wx_avatar img[data-v-d89cc620] {\n    width: 80%;\n}\n",""])},eDab:function(a,t,e){var r=e("6vAC");"string"==typeof r&&(r=[[a.i,r,""]]),r.locals&&(a.exports=r.locals);e("rjj0")("32c2433c",r,!0)},nJAr:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("ms7A"),i={name:"adminManager",data:function(){return{loading:!0,dialogTitle:"添加用户端超管",dialogFormVisible:!1,transferVisible:!1,dialogType:"1",adminParam:"",adminManagerForm:{id:"",mc_id:"",real_name:"",remark:"",is_all_auth:1,hts:[]},params:{pageindex:1,pagesize:10,searchId:"",search:""},tableData:[],wxData:"",barData:[],total:0,activeUser:""}},created:function(){this.getData(),this.getbarData()},mounted:function(){},watch:{"adminManagerForm.is_all_auth":function(a,t){this.transferVisible=!a}},methods:{getWXData:function(){var a=this;if(!this.adminParam)return this.$message.error("请输入微信昵称"),!1;Object(r.m)({search:this.adminParam}).then(function(t){var e=t.data.result;a.wxData=e})},getbarData:function(){var a=this;Object(r.f)().then(function(t){t.data.result.forEach(function(t,e){a.barData.push({key:t.id,label:t.name})}),console.log(a.barData)})},getData:function(){var a=this;this.loading=!0,Object(r.k)(this.params).then(function(t){var e=t.data.result;a.tableData=e.data,a.total=e.total,a.loading=!1}).catch(function(t){a.loading=!1})},onSubmit:function(){this.resetParams(),this.getData(),console.log("submit")},handleSizeChange:function(a){this.params.pagesize=a,this.getData()},handleCurrentChange:function(a){this.params.pageindex=a,this.getData(),console.log("当前页: "+a)},addBarManager:function(){},DeleteBarManager:function(){},showEmptyDiaLog:function(){this.dialogTitle="添加用户端超管",this.dialogType="1",this.dialogFormVisible=!0},handleAdd:function(a){this.dialogTitle="添加超级管理员",this.dialogType="2",this.dialogFormVisible=!0,this.activeUser=a,this.adminManagerForm.mc_id=this.activeUser.id},handleEdit:function(a){var t=this;this.dialogTitle="编辑超级管理员",this.dialogType="2",this.dialogFormVisible=!0,this.activeUser=a,Object(r.l)({id:a.id}).then(function(e){var r=e.data.result,i=[];r.smrh.forEach(function(a,t){i.push(a.ht_id)}),console.log(i),t.adminManagerForm={id:a.id,mc_id:r.sm.mc_id,real_name:r.sm.real_name,remark:r.sm.remark,is_all_auth:parseInt(r.sm.is_all_auth),hts:i},console.log(r),console.log(t.adminManagerForm)})},handleSave:function(){var a=this,t=void 0,e=void 0;this.adminManagerForm.id?(t=r.n,e="编辑成功"):(t=r.a,e="添加成功"),t(this.adminManagerForm).then(function(t){if(console.log(t),"301000"!=t.data.code)return a.$message.error({type:"error",message:t.data.result});a.$message({type:"success",message:e}),a.dialogFormVisible=!1,a.clearForm(),a.resetParams(),a.getData()})},handleDelete:function(a,t){var e=this;this.$confirm("是否确定删除该超级管理员?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r.d)({id:a.id}).then(function(a){if("301000"!=a.data.code)return e.$message.error({type:"error",message:a.data.result});e.$message({type:"success",message:"删除成功!"}),e.getData()}).catch(function(a){})}).catch(function(){})},clearForm:function(){this.adminParam="",this.wxData="",this.activeUser="",this.adminManagerForm={id:"",mc_id:"",real_name:"",remark:"",is_all_auth:1,hts:[]}},resetParams:function(){this.params.pageindex=1,this.params.searchId="",this.params.search=""}}},n={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"container"},[e("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[e("el-form-item",{attrs:{label:"用户名"}},[e("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:a.params.search,callback:function(t){a.$set(a.params,"search",t)},expression:"params.search"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"ID"}},[e("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:a.params.searchId,callback:function(t){a.$set(a.params,"searchId",t)},expression:"params.searchId"}})],1),a._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),e("el-row",[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:24}},[e("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){a.showEmptyDiaLog(t)}}},[a._v("添加")])],1)],1),a._v(" "),e("div",{staticStyle:{height:"24px"}}),a._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:a.tableData}},[e("el-table-column",{attrs:{prop:"mc_id",label:"ID",width:"120"}}),a._v(" "),e("el-table-column",{attrs:{label:"微信头像",width:"150"},scopedSlots:a._u([{key:"default",fn:function(t){return[e("img",{staticClass:"avatar-user-img",attrs:{src:a._f("uploadPrefixUrl")(t.row.headimgurl)}})]}}])}),a._v(" "),e("el-table-column",{attrs:{prop:"nickname",label:"微信昵称",width:"220"}}),a._v(" "),e("el-table-column",{attrs:{prop:"real_name",label:"真实姓名",width:"120"}}),a._v(" "),e("el-table-column",{attrs:{prop:"create_time",label:"添加时间"}}),a._v(" "),e("el-table-column",{attrs:{prop:"identity",label:"身份"}}),a._v(" "),e("el-table-column",{attrs:{prop:"remark",label:"备注"}}),a._v(" "),e("el-table-column",{attrs:{label:"操作"},scopedSlots:a._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){a.handleEdit(t.row,t.$index)}}},[a._v("编辑")]),a._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){a.handleDelete(t.row,t.$index)}}},[a._v("删除")])]}}])})],1),a._v(" "),e("div",{staticClass:"pagination-container"},[e("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}}),a._v(" "),e("el-dialog",{attrs:{title:a.dialogTitle,visible:a.dialogFormVisible},on:{"update:visible":function(t){a.dialogFormVisible=t},close:a.clearForm}},["1"===a.dialogType?e("div",[e("el-row",{attrs:{gutter:24,type:"flex"}},[e("el-col",{attrs:{span:18}},[e("el-input",{attrs:{placeholder:"请输入关注牛霸霸屏的微信昵称",clearable:""},model:{value:a.adminParam,callback:function(t){a.adminParam=t},expression:"adminParam"}})],1),a._v(" "),e("el-col",{attrs:{span:2}}),a._v(" "),e("el-col",{attrs:{span:4}},[e("el-button",{attrs:{type:"primary",size:"medium"},on:{click:a.getWXData}},[a._v("搜索")])],1)],1),a._v(" "),e("el-row",{staticClass:"wx-user",attrs:{gutter:24}},["string"!=typeof a.wxData&&0==a.wxData.length?e("p",{staticClass:"text-center"},[a._v("暂无数据")]):a._e(),a._v(" "),a._l(a.wxData,function(t,r){return e("el-col",{key:r,staticClass:"text-center wx-user-item",attrs:{sm:12,md:6,lg:4}},[e("div",{staticClass:"wx_avatar"},[e("img",{attrs:{src:t.headimgurl}})]),a._v(" "),e("p",{staticClass:"fs13",staticStyle:{margin:"8px 0"}},[a._v(a._s(t.nickname))]),a._v(" "),e("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){a.handleAdd(t)}}},[a._v("添加")])],1)})],2)],1):a._e(),a._v(" "),"2"===a.dialogType?e("div",[e("el-row",{attrs:{gutter:24}},[e("el-col",{staticClass:"text-center",attrs:{span:4}},[e("div",{staticClass:"wx_avatar"},[e("img",{attrs:{src:a.activeUser.headimgurl}})]),a._v(" "),e("p",{staticClass:"fs13",staticStyle:{margin:"8px 0"}},[a._v(a._s(a.activeUser.nickname))])]),a._v(" "),e("el-col",{attrs:{span:2}}),a._v(" "),e("el-col",{attrs:{span:18}},[e("p",{staticStyle:{"margin-top":"0"}},[a._v("说明："),e("br"),a._v("1、可无限限制免费购买主题霸屏、礼物霸屏、点歌霸屏。"),e("br"),a._v("2、点歌霸屏在已点列表显示免费标签。"),e("br"),a._v("3、可拉黑用户。"),e("br"),a._v("4、可删除上墙消息。")])])],1),a._v(" "),e("el-form",{ref:"adminManagerForm",attrs:{model:a.adminManagerForm,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"真实姓名",prop:"real_name"}},[e("el-input",{model:{value:a.adminManagerForm.real_name,callback:function(t){a.$set(a.adminManagerForm,"real_name",t)},expression:"adminManagerForm.real_name"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"备注信息",prop:"remark"}},[e("el-input",{attrs:{type:"textarea"},model:{value:a.adminManagerForm.remark,callback:function(t){a.$set(a.adminManagerForm,"remark",t)},expression:"adminManagerForm.remark"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"生效酒吧",prop:"is_all_auth"}},[e("el-radio",{attrs:{label:1},on:{change:function(t){a.adminManagerForm.hts=[]}},model:{value:a.adminManagerForm.is_all_auth,callback:function(t){a.$set(a.adminManagerForm,"is_all_auth",t)},expression:"adminManagerForm.is_all_auth"}},[a._v("全部")]),a._v(" "),e("el-radio",{attrs:{label:0},model:{value:a.adminManagerForm.is_all_auth,callback:function(t){a.$set(a.adminManagerForm,"is_all_auth",t)},expression:"adminManagerForm.is_all_auth"}},[a._v("自定义")])],1),a._v(" "),e("el-form-item",[a.transferVisible?e("el-transfer",{attrs:{filterable:"",data:a.barData},model:{value:a.adminManagerForm.hts,callback:function(t){a.$set(a.adminManagerForm,"hts",t)},expression:"adminManagerForm.hts"}}):a._e()],1),a._v(" "),e("el-form-item",{staticStyle:{"text-align":"right"}},[e("el-button",{on:{click:function(t){a.dialogFormVisible=!1}}},[a._v("取 消")]),a._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:a.handleSave}},[a._v("确 定")])],1)],1)],1):a._e()])],1)],1)},staticRenderFns:[]};var l=e("VU/8")(i,n,!1,function(a){e("eDab")},"data-v-d89cc620",null);t.default=l.exports}});