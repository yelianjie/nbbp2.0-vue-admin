webpackJsonp([53],{bQGG:function(e,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t={name:"rechargeManager",data:function(){return{loading:!0,tableLoading:!1,panelData:[{label:"会员总数",number:5e3},{label:"昨日新增会员数",numer:400},{label:"账户余额",number:3e3}],formInline:{nickname:""},tableData:[{avatar:"",nickname:"我是一个机器人",area:"江苏 南京",count:5e3,rest:500}]}},mounted:function(){var e=this;console.log("rechargemanager mounted!"),setTimeout(function(){e.loading=!1},2e3)},methods:{onSubmit:function(){console.log("submit")},pageChange:function(e){console.log(e)}},components:{panelNumber:n("b/7n").default}},l={render:function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[n("panel-number",{attrs:{paneldata:e.panelData}}),e._v(" "),n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[n("el-form-item",{attrs:{label:"昵称"}},[n("el-input",{attrs:{placeholder:"请输入昵称"},model:{value:e.formInline.nickname,callback:function(a){e.$set(e.formInline,"nickname",a)},expression:"formInline.nickname"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:e.tableData}},[n("el-table-column",{attrs:{width:"160px",prop:"avatar",label:"用户头像"}}),e._v(" "),n("el-table-column",{attrs:{width:"160px",prop:"nickname",label:"微信昵称"}}),e._v(" "),n("el-table-column",{attrs:{prop:"area",label:"地区",width:"120px"}}),e._v(" "),n("el-table-column",{attrs:{prop:"count",label:"充值总金额"}}),e._v(" "),n("el-table-column",{attrs:{prop:"rest",label:"账户余额"}})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"current-change":e.pageChange}})],1)],1)},staticRenderFns:[]},o=n("VU/8")(t,l,!1,null,null,null);a.default=o.exports}});