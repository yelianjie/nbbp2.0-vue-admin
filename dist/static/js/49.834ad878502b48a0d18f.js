webpackJsonp([49],{UjZn:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=t("mFSD"),n=t("A9eo"),r=t("OZTV"),s={name:"orderList",data:function(){return{loading:!0,tableLoading:!1,bars:[{label:"CMK酒吧",value:10},{label:"牛霸酒吧",value:9}],types:[{label:"主题霸屏",value:"2"},{label:"礼物打赏",value:"1"}],params:{page:1,pageSize:10,name:"",type:"",beginT:"",endT:"",id:"",dateValue:"",fee:"1",nickname:""},tableData:[],total:0,summaryMoney:{}}},created:function(){this.getData()},methods:{getData:function(){var e=this;this.loading=!0,Object(l.d)(this.params).then(function(a){var t=a.data.result;e.tableData=t.data,e.total=t.total,e.summaryMoney=t.money,e.loading=!1}).catch(function(a){e.loading=!1})},resetParams:function(){this.params.page=1},onSubmit:function(){this.resetParams(),Array.isArray(this.params.dateValue)&&this.params.dateValue.length>0&&(this.params.beginT=this.params.dateValue[0],this.params.endT=this.params.dateValue[1]),this.getData(),console.log("submit!")},handleSizeChange:function(e){this.params.pageSize=e,this.getData()},handleCurrentChange:function(e){this.params.page=e,this.getData(),console.log("当前页: "+e)},clearBar:function(){},dateChange:function(e){null==e&&(this.params.beginT="",this.params.endT="")},clearType:function(){}},filters:{filterText:function(e,a){return a.find(function(a){return a.value===e}).label},filtetMoney:function(e){return e||"0.00"}},components:{LinkSearch:n.a,SummaryLine:r.a}},o={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.params}},[t("el-form-item",{attrs:{label:"ID"}},[t("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:e.params.id,callback:function(a){e.$set(e.params,"id",a)},expression:"params.id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"酒吧名称"}},[t("el-input",{attrs:{clearable:""},model:{value:e.params.name,callback:function(a){e.$set(e.params,"name",a)},expression:"params.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{clearable:""},model:{value:e.params.nickname,callback:function(a){e.$set(e.params,"nickname",a)},expression:"params.nickname"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.dateChange},model:{value:e.params.dateValue,callback:function(a){e.$set(e.params,"dateValue",a)},expression:"params.dateValue"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1),e._v(" "),t("link-search",{attrs:{"label-width":80,links:{title:"类型",links:[{label:"全部",value:""},{label:"主题霸屏",value:"2"},{label:"礼物打赏",value:"1"},{label:"红包",value:"3"},{label:"点歌",value:"4"}]}},on:{onClick:e.getData},model:{value:e.params.type,callback:function(a){e.$set(e.params,"type",a)},expression:"params.type"}}),e._v(" "),t("link-search",{attrs:{"label-width":80,links:{title:"订单属性",links:[{label:"全部",value:"0"},{label:"付费",value:"1"},{label:"免费",value:"2"}]}},on:{onClick:e.getData},model:{value:e.params.fee,callback:function(a){e.$set(e.params,"fee",a)},expression:"params.fee"}}),e._v(" "),t("SummaryLine",[e._v("\n    总计金额"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.summaryMoney.totle_money))]),e._v("元，霸屏"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.summaryMoney.bp_money))]),e._v("元，打赏"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.summaryMoney.ds_money))]),e._v("元，红包"),t("el-tag",{attrs:{size:"small"}},[e._v(e._s(e.summaryMoney.hb_money))]),e._v("元\n  ")],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData}},[t("el-table-column",{attrs:{fixed:"",prop:"name",label:"酒吧名称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"buy_uid",label:"消费者ID"}}),e._v(" "),t("el-table-column",{attrs:{width:"220px",prop:"nickname",label:"消费者昵称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"order_type",label:"消费类型"},scopedSlots:e._u([{key:"default",fn:function(a){return[1==a.row.odr_type?t("el-tag",{attrs:{type:"danger"}},[e._v(e._s(a.row.title))]):e._e(),e._v(" "),2==a.row.odr_type?t("el-tag",[e._v(e._s(a.row.title))]):e._e(),e._v(" "),3==a.row.odr_type?t("el-tag",{attrs:{type:"warning"}},[e._v("红包")]):e._e(),e._v(" "),4==a.row.odr_type?t("el-tag",{attrs:{type:"success"}},[e._v("点歌")]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"show_time",label:"霸屏时长"}}),e._v(" "),t("el-table-column",{attrs:{label:"支付类型"},scopedSlots:e._u([{key:"default",fn:function(a){return[1==a.row.pay_type?t("el-tag",{attrs:{type:"danger"}},[e._v("牛角消费")]):e._e(),e._v(" "),2==a.row.pay_type?t("el-tag",{attrs:{type:"success"}},[e._v("直接支付")]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"order_money",label:"订单金额"}}),e._v(" "),t("el-table-column",{attrs:{prop:"platform_sxfei",label:"手续费"}}),e._v(" "),t("el-table-column",{attrs:{prop:"u_money",label:"分成金额"},scopedSlots:e._u([{key:"default",fn:function(a){return[0!=Number(a.row.company_money)?t("el-tag",{staticClass:"tag"},[e._v("平台："+e._s(e._f("filtetMoney")(a.row.company_money)))]):e._e(),e._v(" "),0!=Number(a.row.agent_money)?t("el-tag",{staticClass:"tag",attrs:{type:"success"}},[e._v("代理："+e._s(e._f("filtetMoney")(a.row.agent_money)))]):e._e(),e._v(" "),0!=Number(a.row.merchant_money)?t("el-tag",{staticClass:"tag",attrs:{type:"info"}},[e._v("商户："+e._s(e._f("filtetMoney")(a.row.merchant_money)))]):e._e(),e._v(" "),0!=Number(a.row.supervise_money)?t("el-tag",{staticClass:"tag",attrs:{type:"warning"}},[e._v("管理："+e._s(e._f("filtetMoney")(a.row.supervise_money)))]):e._e(),e._v(" "),0!=Number(a.row.user_money)?t("el-tag",{staticClass:"tag",attrs:{type:"danger"}},[e._v("用户："+e._s(e._f("filtetMoney")(a.row.user_money)))]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"订单时间",width:"200px"}}),e._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"order_no",label:"订单号"}})],1),e._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var i=t("/Xao")(s,o,!1,function(e){t("VYLr")},null,null);a.default=i.exports},VYLr:function(e,a,t){var l=t("k2oz");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);t("8bSs")("3a501805",l,!0)},k2oz:function(e,a,t){(e.exports=t("BkJT")(!1)).push([e.i,"\n.tag {\n  margin-bottom: 4px;\n}\n",""])}});