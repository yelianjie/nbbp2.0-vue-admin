webpackJsonp([67],{OhQj:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("mFSD"),l={name:"rechargeList",data:function(){return{loading:!0,tableLoading:!1,formInline:{nickname:"",dateValue:"",id:""},params:{page:1,pageSize:10,name:"",beginT:"",endT:"",id:""},tableData:[],total:0}},created:function(){this.getData()},methods:{getData:function(){var e=this;this.loading=!0,Object(n.d)(this.params).then(function(a){var t=a.data.result;e.tableData=t.data,e.total=t.total,e.loading=!1}).catch(function(a){e.loading=!1})},resetParams:function(){this.params={page:1,pageSize:10,name:"",beginT:"",endT:"",id:""}},onSubmit:function(){this.resetParams(),this.params.name=this.formInline.nickname,this.params.id=this.formInline.id,Array.isArray(this.formInline.dateValue)&&this.formInline.dateValue.length>0&&(this.params.beginT=this.formInline.dateValue[0],this.params.endT=this.formInline.dateValue[1]),this.getData(),console.log("submit!")},dateChange:function(e){},handleSizeChange:function(e){this.params.pageSize=e,this.getData()},handleCurrentChange:function(e){this.params.page=e,this.getData(),console.log("当前页: "+e)}}},i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:e.formInline.nickname,callback:function(a){e.$set(e.formInline,"nickname",a)},expression:"formInline.nickname"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"ID"}},[t("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:e.formInline.id,callback:function(a){e.$set(e.formInline,"id",a)},expression:"formInline.id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.dateChange},model:{value:e.formInline.dateValue,callback:function(a){e.$set(e.formInline,"dateValue",a)},expression:"formInline.dateValue"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:e.tableData}},[t("el-table-column",{attrs:{width:"360px",prop:"recharge_order_no",label:"订单编号"}}),e._v(" "),t("el-table-column",{attrs:{width:"120px",prop:"nickname",label:"消费者昵称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"uid",label:"消费者ID"}}),e._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"充值时间",width:"200px"}}),e._v(" "),t("el-table-column",{attrs:{prop:"money",label:"充值金额"}})],1),e._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]},r=t("/Xao")(l,i,!1,null,null,null);a.default=r.exports}});