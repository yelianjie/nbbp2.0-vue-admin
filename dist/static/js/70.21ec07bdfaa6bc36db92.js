webpackJsonp([70],{OhQj:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("mFSD"),l={name:"rechargeList",data:function(){return{loading:!0,tableLoading:!1,params:{page:1,pageSize:10,name:"",beginT:"",endT:"",id:""},tableData:[],total:0,zongji:{}}},created:function(){this.getData()},methods:{getData:function(){var a=this;this.loading=!0,Object(n.e)(this.params).then(function(e){var t=e.data.result;a.tableData=t.data,a.total=t.total,a.zongji=t.zongji,a.loading=!1}).catch(function(e){a.loading=!1})},resetParams:function(){this.params.page=1},onSubmit:function(){this.resetParams(),Array.isArray(this.params.dateValue)&&this.params.dateValue.length>0&&(this.params.beginT=this.params.dateValue[0],this.params.endT=this.params.dateValue[1]),this.getData(),console.log("submit!")},dateChange:function(a){null==a&&(this.params.beginT="",this.params.endT="")},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},getSummaries:function(a){var e=this,t=a.columns,n=(a.data,[]);return t.forEach(function(a,t){0!==t?(1===t&&(n[t]=e.zongji.nj_user+"人"),2===t&&(n[t]=e.zongji.nj_amount)):n[t]="总计"}),n},formatDateTime:function(a){var e=new Date(a),t=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var l=e.getDate();l=l<10?"0"+l:l;var r=e.getHours();r=r<10?"0"+r:r;var i=e.getMinutes(),s=e.getSeconds();return t+"-"+n+"-"+l+" "+r+":"+(i=i<10?"0"+i:i)+":"+(s=s<10?"0"+s:s)}}},r={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:a.params.name,callback:function(e){a.$set(a.params,"name",e)},expression:"params.name"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"ID"}},[t("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:a.params.id,callback:function(e){a.$set(a.params,"id",e)},expression:"params.id"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:a.dateChange},model:{value:a.params.dateValue,callback:function(e){a.$set(a.params,"dateValue",e)},expression:"params.dateValue"}})],1),a._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:a.tableData,"show-summary":"","summary-method":a.getSummaries}},[t("el-table-column",{attrs:{prop:"uid",label:"用户ID"}}),a._v(" "),t("el-table-column",{attrs:{width:"120px",prop:"nickname",label:"昵称"}}),a._v(" "),t("el-table-column",{attrs:{prop:"money",label:"充值金额"}}),a._v(" "),t("el-table-column",{attrs:{prop:"",label:"充值类型"},scopedSlots:a._u([{key:"default",fn:function(e){return["3"==e.row.pay_type?[a._v("红包")]:a._e(),a._v(" "),"1"==e.row.pay_type?[a._v("牛角充值")]:a._e(),a._v(" "),"2"==e.row.pay_type?[a._v("直接支付")]:a._e()]}}])}),a._v(" "),t("el-table-column",{attrs:{width:"360px",prop:"recharge_order_no",label:"订单编号"}}),a._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"充值时间",width:"200px"}}),a._v(" "),t("el-table-column",{attrs:{prop:"wx_fee",label:"微信手续费"}}),a._v(" "),t("el-table-column",{attrs:{prop:"wx_real",label:"实际到账金额"}})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1)},staticRenderFns:[]},i=t("/Xao")(l,r,!1,null,null,null);e.default=i.exports}});