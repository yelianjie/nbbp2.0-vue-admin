webpackJsonp([49],{"/Ffi":function(a,e,t){var l=t("9oiM");"string"==typeof l&&(l=[[a.i,l,""]]),l.locals&&(a.exports=l.locals);t("rjj0")("534c5137",l,!0)},"9oiM":function(a,e,t){(a.exports=t("FZ+f")(!1)).push([a.i,"\n.tag {\n  margin-bottom: 4px;\n}\n",""])},ZVlN:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t("woOf"),n=t.n(l),i=t("mFSD"),r={name:"orderList",data:function(){return{loading:!1,tableLoading:!1,tableDetailLoading:!1,params:{page:1,pageSize:10,name:"",type:"",beginT:"",endT:"",id:"",dateValue:"",hotel_name:"",is_refund:0},tableData:[],total:0,dialogVisible:!1,detailData:[],totalDetail:0,paramsDetail:{page:1,pageSize:10},curDetailId:0}},created:function(){this.getData()},methods:{onClick:function(){this.getData()},viewPacketDetail:function(a){var e=this;this.tableDetailLoading=!0,a&&(this.curDetailId=a),this.dialogVisible=!0;var t=n()(this.paramsDetail,{hb_id:this.curDetailId});Object(i.f)(t).then(function(a){var t=a.data.result;e.detailData=t.data,e.totalDetail=t.total,e.tableDetailLoading=!1})},getData:function(){var a=this;this.loading=!0,Object(i.g)(this.params).then(function(e){var t=e.data.result;a.tableData=t.data,a.total=t.total,a.loading=!1}).catch(function(e){a.loading=!1})},resetParams:function(){this.params.page=1},onSubmit:function(){this.resetParams(),Array.isArray(this.params.dateValue)&&this.params.dateValue.length>0&&(this.params.beginT=this.params.dateValue[0],this.params.endT=this.params.dateValue[1]),this.getData(),console.log("submit!")},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},handleSizeChangeDetail:function(a){this.paramsDetail.pageSize=a,this.viewPacketDetail()},handleCurrentChangeDetail:function(a){this.paramsDetail.page=a,this.viewPacketDetail(),console.log("当前页: "+a)},dateChange:function(a){null==a&&(this.params.beginT="",this.params.endT="")}},components:{LinkSearch:t("A9eo").a}},s={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[t("el-form-item",{attrs:{label:"ID"}},[t("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:a.params.id,callback:function(e){a.$set(a.params,"id",e)},expression:"params.id"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{clearable:""},model:{value:a.params.nickname,callback:function(e){a.$set(a.params,"nickname",e)},expression:"params.nickname"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"酒吧名称"}},[t("el-input",{attrs:{clearable:""},model:{value:a.params.hotel_name,callback:function(e){a.$set(a.params,"hotel_name",e)},expression:"params.hotel_name"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:a.dateChange},model:{value:a.params.dateValue,callback:function(e){a.$set(a.params,"dateValue",e)},expression:"params.dateValue"}})],1),a._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),t("link-search",{attrs:{links:{title:"红包类型",links:[{label:"全部",value:""},{label:"牛角红包",value:1},{label:"现金红包",value:2}]}},on:{onClick:a.onClick},model:{value:a.params.type,callback:function(e){a.$set(a.params,"type",e)},expression:"params.type"}}),a._v(" "),t("link-search",{attrs:{links:{title:"退回金额",links:[{label:"全部",value:0},{label:"有",value:1},{label:"无",value:2}]}},on:{onClick:a.onClick},model:{value:a.params.is_refund,callback:function(e){a.$set(a.params,"is_refund",e)},expression:"params.is_refund"}}),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:a.tableData}},[t("el-table-column",{attrs:{fixed:"",prop:"mc_id",label:"ID"}}),a._v(" "),t("el-table-column",{attrs:{width:"140px",prop:"nickname",label:"昵称"}}),a._v(" "),t("el-table-column",{attrs:{prop:"money",width:"100px",label:"红包金额"}}),a._v(" "),t("el-table-column",{attrs:{width:"100px",label:"红包类型"},scopedSlots:a._u([{key:"default",fn:function(e){return[2==e.row.pay_type?t("el-tag",{attrs:{type:"danger"}},[a._v("现金红包")]):a._e(),a._v(" "),1==e.row.pay_type?t("el-tag",{attrs:{type:"success"}},[a._v("牛角红包")]):a._e()]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"refund_money",width:"100px",label:"退回金额"}}),a._v(" "),t("el-table-column",{attrs:{prop:"real_money",width:"180px",label:"实际发红包金额"}}),a._v(" "),t("el-table-column",{attrs:{prop:"order_no",label:"订单号",width:"140px"}}),a._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"订单时间",width:"160px"}}),a._v(" "),t("el-table-column",{attrs:{label:"发放对象"},scopedSlots:a._u([{key:"default",fn:function(e){return[0==e.row.type?[a._v("\n          全场\n        ")]:a._e(),a._v(" "),2==e.row.type?[a._v("\n          男士\n        ")]:a._e(),a._v(" "),1==e.row.type?[a._v("\n          女士\n        ")]:a._e(),a._v(" "),3==e.row.type?[a._v("\n          自定义\n        ")]:a._e()]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"name",label:"所属酒吧"}}),a._v(" "),t("el-table-column",{attrs:{label:"操作"},scopedSlots:a._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){a.viewPacketDetail(e.row.id)}}},[a._v("查看详情")])]}}])})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),t("el-dialog",{attrs:{title:"收货地址",visible:a.dialogVisible},on:{"update:visible":function(e){a.dialogVisible=e},close:function(e){a.paramsDetail.page=1}}},[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.tableDetailLoading,expression:"tableDetailLoading"}],attrs:{data:a.detailData}},[t("el-table-column",{attrs:{prop:"mc_id",label:"ID",width:"60"}}),a._v(" "),t("el-table-column",{attrs:{prop:"nickname",label:"昵称",width:"160"}}),a._v(" "),t("el-table-column",{attrs:{label:"红包类型"},scopedSlots:a._u([{key:"default",fn:function(e){return[2==e.row.pay_type?t("el-tag",{attrs:{type:"danger"}},[a._v("现金红包")]):a._e(),a._v(" "),1==e.row.pay_type?t("el-tag",{attrs:{type:"success"}},[a._v("牛角红包")]):a._e()]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"money",label:"抢到金额"}})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.totalDetail},on:{"size-change":a.handleSizeChangeDetail,"current-change":a.handleCurrentChangeDetail}})],1)],1)],1)},staticRenderFns:[]};var o=t("VU/8")(r,s,!1,function(a){t("/Ffi")},null,null);e.default=o.exports}});