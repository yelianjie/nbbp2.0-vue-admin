webpackJsonp([51],{ny60:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"wxManager",data:function(){return{loading:!0,tableLoading:!1,panelData:[{label:"用户总数",number:5e3},{label:"昨日新增用户数",numer:400},{label:"昨日活跃用户数",number:3e3}],formInline:{nickname:"",dateValue:""},tableData:[{avatar:"",nickname:"我是一个机器人",area:"江苏 南京",last_time_at:"2017-12-31 15:00:30"}]}},mounted:function(){var e=this;console.log("wxmanager mounted!"),setTimeout(function(){e.loading=!1},2e3)},methods:{onSubmit:function(){console.log("submit")},pageChange:function(e){console.log(e)},dateChange:function(e){}},components:{panelNumber:t("b/7n").default}},l={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[t("panel-number",{attrs:{paneldata:e.panelData}}),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{placeholder:"请输入昵称"},model:{value:e.formInline.nickname,callback:function(a){e.$set(e.formInline,"nickname",a)},expression:"formInline.nickname"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.dateChange},model:{value:e.formInline.dateValue,callback:function(a){e.$set(e.formInline,"dateValue",a)},expression:"formInline.dateValue"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:e.tableData}},[t("el-table-column",{attrs:{width:"160px",prop:"avatar",label:"用户头像"}}),e._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"nickname",label:"微信昵称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"area",label:"地区",width:"120px"}}),e._v(" "),t("el-table-column",{attrs:{prop:"last_time_at",label:"上次活跃时间"}})],1),e._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"current-change":e.pageChange}})],1)],1)},staticRenderFns:[]},o=t("VU/8")(n,l,!1,null,null,null);a.default=o.exports}});