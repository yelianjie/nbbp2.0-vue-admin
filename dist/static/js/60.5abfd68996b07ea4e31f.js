webpackJsonp([60],{xkhY:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("ms7A"),l={name:"agentManager",data:function(){return{loading:!0,tableLoading:!1,params:{page:1,pageSize:10,name:"",id:""},tableData:[],total:0}},created:function(){this.getData()},methods:{getData:function(){var a=this;this.loading=!0,Object(n.c)(this.params).then(function(t){var e=t.data.result;a.tableData=e.data,a.total=e.total,a.loading=!1}).catch(function(t){a.loading=!1})},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},onSubmit:function(){this.resetParams(),this.getData(),console.log("submit!")},handleDelete:function(a,t){var e=this;this.$confirm("是否确定删除该代理?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.a)({id:a.id}).then(function(a){e.$message({type:"success",message:"删除成功!"}),e.getData()})}).catch(function(){})},resetParams:function(){this.params.page=1}}},i={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"container"},[e("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[e("el-form-item",{attrs:{label:"用户名"}},[e("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:a.params.name,callback:function(t){a.$set(a.params,"name",t)},expression:"params.name"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"ID"}},[e("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:a.params.id,callback:function(t){a.$set(a.params,"id",t)},expression:"params.id"}})],1),a._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:a.tableData}},[e("el-table-column",{attrs:{prop:"mc_id",label:"ID"}}),a._v(" "),e("el-table-column",{attrs:{width:"160px",prop:"name",label:"用户名"}}),a._v(" "),e("el-table-column",{attrs:{width:"160px",label:"头像"},scopedSlots:a._u([{key:"default",fn:function(t){return[e("img",{staticClass:"avatar-user-img",attrs:{src:a._f("uploadPrefixUrl")(t.row.headimgurl)}})]}}])}),a._v(" "),e("el-table-column",{attrs:{prop:"phone",label:"联系电话",width:"200px"}}),a._v(" "),e("el-table-column",{attrs:{prop:"create_time",label:"注册时间"}}),a._v(" "),e("el-table-column",{attrs:{prop:"invitation_code",label:"推荐码"}}),a._v(" "),e("el-table-column",{attrs:{prop:"",label:"总收益"}}),a._v(" "),e("el-table-column",{attrs:{prop:"",label:"当前收益"}})],1),a._v(" "),e("div",{staticClass:"pagination-container"},[e("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1)},staticRenderFns:[]},r=e("/Xao")(l,i,!1,null,null,null);t.default=r.exports}});