webpackJsonp([66],{Z8vu:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mFSD"),l={name:"depositList",data:function(){return{loading:!0,tableLoading:!1,formInline:{nickname:"",identity:""},identitys:[{label:"全部",value:""},{label:"用户",value:"1"},{label:"代理",value:"3"},{label:"商户",value:"2"},{label:"酒吧管理",value:"4"}],states:[{label:"提现中",value:"0"},{label:"提现成功",value:"1"},{label:"提现失败",value:"2"}],params:{page:1,pageSize:10,name:"",type:"",beginT:"",endT:""},tableData:[],total:0}},created:function(){this.getData()},methods:{getData:function(){var e=this;this.loading=!0,Object(n.f)(this.params).then(function(t){var a=t.data.result;e.tableData=a.data,e.total=a.total,e.loading=!1}).catch(function(t){e.loading=!1})},resetParams:function(){this.params={page:1,pageSize:10,name:"",beginT:"",endT:"",type:""}},onSubmit:function(){this.resetParams(),this.params.name=this.formInline.nickname,this.params.type=this.formInline.identity,this.getData(),console.log("submit!")},handleSizeChange:function(e){this.params.pageSize=e,this.getData()},handleCurrentChange:function(e){this.params.page=e,this.getData(),console.log("当前页: "+e)},clearIdentity:function(){}},filters:{filterText:function(e,t){var a=t.find(function(t){return t.value==e});return a?a.label:""}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"昵称"}},[a("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:e.formInline.nickname,callback:function(t){e.$set(e.formInline,"nickname",t)},expression:"formInline.nickname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},on:{close:e.clearIdentity},model:{value:e.formInline.identity,callback:function(t){e.$set(e.formInline,"identity",t)},expression:"formInline.identity"}},e._l(e.identitys,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:e.tableData}},[a("el-table-column",{attrs:{width:"160px",prop:"nickname",label:"提现人昵称"}}),e._v(" "),a("el-table-column",{attrs:{width:"200px",prop:"create_time",label:"提现时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"money",label:"提现金额",width:"200px"}}),e._v(" "),a("el-table-column",{attrs:{label:"身份"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n         "+e._s(e._f("filterText")(t.row.type,e.identitys))+"\n       ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.status?a("el-tag",{attrs:{type:"warning"}},[e._v(e._s(e._f("filterText")(t.row.status,e.states)))]):e._e(),e._v(" "),0==t.row.status?a("el-tag",{attrs:{type:"info"}},[e._v(e._s(e._f("filterText")(t.row.status,e.states)))]):e._e(),e._v(" "),1==t.row.status?a("el-tag",{attrs:{type:"success"}},[e._v(e._s(e._f("filterText")(t.row.status,e.states)))]):e._e()]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]},s=a("VU/8")(l,i,!1,null,null,null);t.default=s.exports}});