webpackJsonp([55],{xkhY:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("ms7A"),i={name:"agentManager",data:function(){return{loading:!0,tableLoading:!1,formInline:{nickname:""},params:{page:1,pageSize:10,name:""},tableData:[],total:0}},created:function(){this.getData()},methods:{getData:function(){var a=this;this.loading=!0,Object(n.c)(this.params).then(function(e){var t=e.data.result;a.tableData=t.data,a.total=t.total,a.loading=!1}).catch(function(e){a.loading=!1})},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},onSubmit:function(){this.resetParams(),this.params.name=this.formInline.nickname,this.getData(),console.log("submit!")},handleDelete:function(a,e){var t=this;this.$confirm("是否确定删除该代理?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.a)({id:a.id}).then(function(a){t.$message({type:"success",message:"删除成功!"}),t.getData()})}).catch(function(){})},resetParams:function(){this.params={page:1,pageSize:10,name:""}}}},l={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.formInline}},[t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:a.formInline.nickname,callback:function(e){a.$set(a.formInline,"nickname",e)},expression:"formInline.nickname"}})],1),a._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:a.tableData}},[t("el-table-column",{attrs:{width:"160px",prop:"name",label:"用户名"}}),a._v(" "),t("el-table-column",{attrs:{width:"160px",label:"头像"},scopedSlots:a._u([{key:"default",fn:function(e){return[t("img",{staticClass:"avatar-user-img",attrs:{src:a._f("uploadPrefixUrl")(e.row.headimgurl)}})]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"phone",label:"联系电话",width:"200px"}}),a._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"注册时间"}})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1)},staticRenderFns:[]},o=t("VU/8")(i,l,!1,null,null,null);e.default=o.exports}});