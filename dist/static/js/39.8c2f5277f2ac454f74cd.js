webpackJsonp([39],{"2dRV":function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"\n.tag {\n  margin-bottom: 4px;\n}\n",""])},CreO:function(e,t,a){var l=a("2dRV");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("8bSs")("4dc4f2ec",l,!0)},UjZn:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mFSD"),n={name:"orderList",data:function(){return{loading:!0,tableLoading:!1,bars:[{label:"CMK酒吧",value:10},{label:"牛霸酒吧",value:9}],types:[{label:"主题霸屏",value:"2"},{label:"礼物打赏",value:"1"}],formInline:{barName:"",dateValue:"",type:"",id:""},params:{page:1,pageSize:10,name:"",type:"",beginT:"",endT:"",id:""},tableData:[],total:0}},created:function(){this.getData()},methods:{getData:function(){var e=this;this.loading=!0,Object(l.d)(this.params).then(function(t){var a=t.data.result;e.tableData=a.data,e.total=a.total,e.loading=!1}).catch(function(t){e.loading=!1})},resetParams:function(){this.params={page:1,pageSize:10,name:"",beginT:"",endT:"",type:"",id:""}},onSubmit:function(){this.resetParams(),this.params.name=this.formInline.barName,this.params.type=this.formInline.type,this.params.id=this.formInline.id,Array.isArray(this.formInline.dateValue)&&this.formInline.dateValue.length>0&&(this.params.beginT=this.formInline.dateValue[0],this.params.endT=this.formInline.dateValue[1]),this.getData(),console.log("submit!")},handleSizeChange:function(e){this.params.pageSize=e,this.getData()},handleCurrentChange:function(e){this.params.page=e,this.getData(),console.log("当前页: "+e)},clearBar:function(){},dateChange:function(e){},clearType:function(){}},filters:{filterText:function(e,t){return t.find(function(t){return t.value===e}).label},filtetMoney:function(e){return e||"0.00"}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"ID"}},[a("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:e.formInline.id,callback:function(t){e.$set(e.formInline,"id",t)},expression:"formInline.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"酒吧名称"}},[a("el-input",{attrs:{clearable:""},model:{value:e.formInline.barName,callback:function(t){e.$set(e.formInline,"barName",t)},expression:"formInline.barName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类型"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},on:{clear:e.clearType},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},e._l(e.types,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"时间"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.dateChange},model:{value:e.formInline.dateValue,callback:function(t){e.$set(e.formInline,"dateValue",t)},expression:"formInline.dateValue"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{fixed:"",width:"160px",prop:"order_no",label:"订单编号"}}),e._v(" "),a("el-table-column",{attrs:{width:"220px",prop:"nickname",label:"消费者昵称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"buy_uid",label:"消费者ID"}}),e._v(" "),a("el-table-column",{attrs:{label:"支付类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.pay_type?a("el-tag",{attrs:{type:"danger"}},[e._v("牛角消费")]):e._e(),e._v(" "),2==t.row.pay_type?a("el-tag",{attrs:{type:"success"}},[e._v("直接支付")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"订单时间",width:"200px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"show_time",label:"霸屏时长"}}),e._v(" "),a("el-table-column",{attrs:{prop:"order_type",label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.odr_type?a("el-tag",{attrs:{type:"danger"}},[e._v(e._s(t.row.title))]):e._e(),e._v(" "),2==t.row.odr_type?a("el-tag",[e._v(e._s(t.row.title))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"order_money",label:"订单金额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"platform_sxfei",label:"手续费"}}),e._v(" "),a("el-table-column",{attrs:{prop:"u_money",label:"分成金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{staticClass:"tag"},[e._v("平台："+e._s(e._f("filtetMoney")(t.row.company_money)))]),e._v(" "),a("el-tag",{staticClass:"tag",attrs:{type:"success"}},[e._v("代理："+e._s(e._f("filtetMoney")(t.row.agent_money)))]),e._v(" "),a("el-tag",{staticClass:"tag",attrs:{type:"info"}},[e._v("商户："+e._s(e._f("filtetMoney")(t.row.merchant_money)))]),e._v(" "),a("el-tag",{staticClass:"tag",attrs:{type:"warning"}},[e._v("管理："+e._s(e._f("filtetMoney")(t.row.supervise_money)))]),e._v(" "),a("el-tag",{staticClass:"tag",attrs:{type:"danger"}},[e._v("用户："+e._s(e._f("filtetMoney")(t.row.user_money)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"酒吧名称"}})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var o=a("/Xao")(n,r,!1,function(e){a("CreO")},null,null);t.default=o.exports}});