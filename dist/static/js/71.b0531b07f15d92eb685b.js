webpackJsonp([71],{OhQj:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=t("mFSD"),n=t("A9eo"),r={name:"rechargeList",components:{SummaryLine:t("OZTV").a,LinkSearch:n.a},data:function(){return{loading:!0,tableLoading:!1,params:{page:1,pageSize:10,name:"",hotel_name:"",order_no:"",beginT:"",endT:"",id:"",source_type:"0",pay_type:"0",dateValue:""},tableData:[],total:0,zongji:{}}},created:function(){this.getData()},methods:{setDate:function(e,a){if(0==a){var t=(new Date).getTime();switch(e){case"tday":this.params.dateValue=[Acan.time("Y-m-d",t),Acan.time("Y-m-d",t)];break;case"yday":this.params.dateValue=[Acan.time("Y-m-d",t-864e5),Acan.time("Y-m-d",t-864e5)];break;case"lastweek":this.params.dateValue=[Acan.time("Y-m-d",t-5184e5),Acan.time("Y-m-d",t)]}}else if(1==a){var l=new Date(this.params.dateValue[0]).getTime();switch(e){case"prev":this.params.dateValue=[Acan.time("Y-m-d",l-864e5),Acan.time("Y-m-d",l-864e5)];break;case"next":this.params.dateValue=[Acan.time("Y-m-d",l+864e5),Acan.time("Y-m-d",l+864e5)]}}this.onSubmit()},getData:function(){var e=this;this.loading=!0,Object(l.e)(this.params).then(function(a){var t=a.data.result;e.tableData=t.data,e.total=t.total,e.zongji=t.zongji,e.loading=!1}).catch(function(a){e.loading=!1})},resetParams:function(){this.params.page=1},onSubmit:function(){this.resetParams(),Array.isArray(this.params.dateValue)&&this.params.dateValue.length>0&&(this.params.beginT=this.params.dateValue[0],this.params.endT=this.params.dateValue[1]),this.getData(),console.log("submit!")},dateChange:function(e){null==e&&(this.params.beginT="",this.params.endT="")},handleSizeChange:function(e){this.params.pageSize=e,this.getData()},handleCurrentChange:function(e){this.params.page=e,this.getData(),console.log("当前页: "+e)},getSummaries:function(e){var a=this,t=e.columns,l=(e.data,[]);return t.forEach(function(e,t){0!==t?(1===t&&(l[t]=a.zongji.nj_user+"人"),2===t&&(l[t]=a.zongji.nj_amount),6===t&&(l[t]=a.zongji.wx_fee),7===t&&(l[t]=a.zongji.wx_real)):l[t]="总计"}),l},formatDateTime:function(e){var a=new Date(e),t=a.getFullYear(),l=a.getMonth()+1;l=l<10?"0"+l:l;var n=a.getDate();n=n<10?"0"+n:n;var r=a.getHours();r=r<10?"0"+r:r;var s=a.getMinutes(),i=a.getSeconds();return t+"-"+l+"-"+n+" "+r+":"+(s=s<10?"0"+s:s)+":"+(i=i<10?"0"+i:i)}}},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.params}},[t("el-row",[t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:e.params.name,callback:function(a){e.$set(e.params,"name",a)},expression:"params.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"ID"}},[t("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:e.params.id,callback:function(a){e.$set(e.params,"id",a)},expression:"params.id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"酒吧名称"}},[t("el-input",{attrs:{placeholder:"请输入酒吧名称",clearable:""},model:{value:e.params.hotel_name,callback:function(a){e.$set(e.params,"hotel_name",a)},expression:"params.hotel_name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"订单号"}},[t("el-input",{attrs:{placeholder:"请输入订单号",clearable:""},model:{value:e.params.order_no,callback:function(a){e.$set(e.params,"order_no",a)},expression:"params.order_no"}})],1)],1),e._v(" "),t("el-row",[t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.dateChange},model:{value:e.params.dateValue,callback:function(a){e.$set(e.params,"dateValue",a)},expression:"params.dateValue"}}),e._v("\n        快捷入口：\n        "),this.params.dateValue?t("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){e.setDate("prev",1)}}},[e._v("上一天")]):e._e(),e._v(" "),this.params.dateValue?t("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){e.setDate("next",1)}}},[e._v("下一天")]):e._e(),e._v(" "),t("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){e.setDate("tday",0)}}},[e._v("今天")]),e._v(" "),t("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){e.setDate("yday",0)}}},[e._v("昨天")]),e._v(" "),t("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){e.setDate("lastweek",0)}}},[e._v("近7天")])],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1)],1),e._v(" "),t("link-search",{attrs:{"label-width":80,links:{title:"充值类型",links:[{label:"全部",value:"0"},{label:"直接支付",value:"2"},{label:"充值购买",value:"3"},{label:"牛角充值",value:"1"}]}},on:{onClick:e.getData},model:{value:e.params.pay_type,callback:function(a){e.$set(e.params,"pay_type",a)},expression:"params.pay_type"}}),e._v(" "),t("link-search",{attrs:{"label-width":80,links:{title:"充值来源",links:[{label:"全部",value:"0"},{label:"霸屏",value:"1"},{label:"礼物",value:"2"},{label:"红包",value:"3"},{label:"点歌",value:"4"},{label:"其他",value:"5"}]}},on:{onClick:e.getData},model:{value:e.params.source_type,callback:function(a){e.$set(e.params,"source_type",a)},expression:"params.source_type"}}),e._v(" "),t("SummaryLine",[e._v("\n    总计人数"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.zongji.nj_user))]),e._v("人，充值金额"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.zongji.nj_amount))]),e._v("元，微信手续费"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.zongji.wx_fee))]),e._v("元，实际到账金额"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.zongji.wx_real))]),e._v("元\n  ")],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:e.tableData}},[t("el-table-column",{attrs:{prop:"uid",label:"用户ID"}}),e._v(" "),t("el-table-column",{attrs:{width:"120px",prop:"nickname",label:"昵称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"money",label:"充值金额"}}),e._v(" "),t("el-table-column",{attrs:{prop:"",label:"充值类型"},scopedSlots:e._u([{key:"default",fn:function(a){return["3"==a.row.pay_type?[e._v("充值购买")]:e._e(),e._v(" "),"1"==a.row.pay_type?[e._v("牛角充值")]:e._e(),e._v(" "),"2"==a.row.pay_type?[e._v("直接支付")]:e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"",label:"充值来源"},scopedSlots:e._u([{key:"default",fn:function(a){return["5"==a.row.source_type?[e._v("其他")]:e._e(),e._v(" "),"4"==a.row.source_type?[e._v("点歌")]:e._e(),e._v(" "),"3"==a.row.source_type?[e._v("红包")]:e._e(),e._v(" "),"2"==a.row.source_type?[e._v("礼物")]:e._e(),e._v(" "),"1"==a.row.source_type?[e._v("霸屏")]:e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"来源酒吧"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n         "+e._s(a.row.hotel_name||"平台充值")+"\n       ")]}}])}),e._v(" "),t("el-table-column",{attrs:{width:"360px",prop:"recharge_order_no",label:"订单编号"}}),e._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"充值时间",width:"200px"}}),e._v(" "),t("el-table-column",{attrs:{prop:"wx_fee",label:"微信手续费"}}),e._v(" "),t("el-table-column",{attrs:{prop:"wx_real",label:"实际到账金额"}})],1),e._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]},i=t("VU/8")(r,s,!1,null,null,null);a.default=i.exports}});