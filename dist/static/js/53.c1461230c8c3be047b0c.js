webpackJsonp([53],{xkhY:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"agentManager",data:function(){return{loading:!0,tableLoading:!1,formInline:{nickname:""},tableData:[{nickname:"鲜花",imgurl:"",mobile:"15869598979",create_at:"2017-05-06 14:00:00"}]}},mounted:function(){var e=this;setTimeout(function(){e.loading=!1},2e3)},methods:{onSubmit:function(){console.log("submit!")},pageChange:function(e){console.log(e)},handleDelete:function(e,t){var n=this;this.$confirm("是否确定删除该代理?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.$message({type:"success",message:"删除成功!"})}).catch(function(){n.$message({type:"info",message:"已取消删除"})})}}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[n("el-form-item",{attrs:{label:"用户名"}},[n("el-input",{attrs:{placeholder:"请输入昵称"},model:{value:e.formInline.nickname,callback:function(t){e.$set(e.formInline,"nickname",t)},expression:"formInline.nickname"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:e.tableData}},[n("el-table-column",{attrs:{width:"160px",prop:"nickname",label:"用户名"}}),e._v(" "),n("el-table-column",{attrs:{width:"160px",prop:"imgurl",label:"头像"}}),e._v(" "),n("el-table-column",{attrs:{prop:"mobile",label:"联系电话",width:"200px"}}),e._v(" "),n("el-table-column",{attrs:{prop:"create_at",label:"注册时间"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){e.handleDelete(t.row,t.$index)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"current-change":e.pageChange}})],1)],1)},staticRenderFns:[]},i=n("VU/8")(a,l,!1,null,null,null);t.default=i.exports}});