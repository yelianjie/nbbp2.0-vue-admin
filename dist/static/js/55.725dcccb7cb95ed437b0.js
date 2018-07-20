webpackJsonp([55],{Rf88:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t("vLgD");var n={name:"messageManager",data:function(){return{loading:!0,params:{page:1,pageSize:10,nickname:"",mc_id:"",del_name:"",del_id:"",hotel_name:"",dateValue:"",beginT:"",endT:""},tableData:[],total:0}},created:function(){this.getData()},methods:{getData:function(){var a,e=this;this.loading=!0,(a=this.params,Object(l.a)({url:"/admin/hotel/getDeleteMessageList",method:"post",data:a})).then(function(a){var t=a.data.result;e.tableData=t.data,e.total=t.total,e.loading=!1}).catch(function(a){e.loading=!1})},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},onSubmit:function(){this.resetParams(),Array.isArray(this.params.dateValue)&&this.params.dateValue.length>0&&(this.params.beginT=this.params.dateValue[0],this.params.endT=this.params.dateValue[1]),this.getData(),console.log("submit!")},resetParams:function(){this.params.page=1},handleCancelDeleteMessage:function(a){var e=this;this.$confirm("是否还原该条消息吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t;(t={id:a.id},Object(l.a)({url:"/admin/hotel/CancelDeleteMessage",method:"post",data:t})).then(function(a){if("301000"!=a.data.code)return e.$message.error({type:"error",message:a.data.result});e.$message({type:"success",message:"操作成功!"}),e.getData()}).catch(function(a){})}).catch(function(a){console.log(a)})}}},s={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[t("el-form-item",{attrs:{label:"用户名ID"}},[t("el-input",{attrs:{placeholder:"请输入用户名ID",clearable:""},model:{value:a.params.mc_id,callback:function(e){a.$set(a.params,"mc_id",e)},expression:"params.mc_id"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:a.params.nickname,callback:function(e){a.$set(a.params,"nickname",e)},expression:"params.nickname"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"操作者ID"}},[t("el-input",{attrs:{placeholder:"请输入操作者ID",clearable:""},model:{value:a.params.del_id,callback:function(e){a.$set(a.params,"del_id",e)},expression:"params.del_id"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"操作者昵称"}},[t("el-input",{attrs:{placeholder:"请输入操作者昵称",clearable:""},model:{value:a.params.del_name,callback:function(e){a.$set(a.params,"del_name",e)},expression:"params.del_name"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"酒吧名称"}},[t("el-input",{attrs:{placeholder:"请输入酒吧名称",clearable:""},model:{value:a.params.hotel_name,callback:function(e){a.$set(a.params,"hotel_name",e)},expression:"params.hotel_name"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:a.params.dateValue,callback:function(e){a.$set(a.params,"dateValue",e)},expression:"params.dateValue"}})],1),a._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),t("div",{staticStyle:{height:"24px"}}),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:a.tableData}},[t("el-table-column",{attrs:{prop:"initiator_mc_id",label:"用户名ID",width:"120"}}),a._v(" "),t("el-table-column",{attrs:{prop:"nickname",label:"昵称"}}),a._v(" "),t("el-table-column",{attrs:{label:"消息类型"},scopedSlots:a._u([{key:"default",fn:function(e){return[0==e.row.msg_type?t("span",[a._v("普通消费")]):a._e(),a._v(" "),1==e.row.msg_type?t("span",[a._v(a._s(e.row.title))]):a._e(),a._v(" "),2==e.row.msg_type?t("span",[a._v(a._s(e.row.title))]):a._e(),a._v(" "),3==e.row.msg_type?t("span",[a._v("红包消费")]):a._e(),a._v(" "),4==e.row.msg_type?t("span",[a._v("点歌消费")]):a._e()]}}])}),a._v(" "),t("el-table-column",{attrs:{label:"图片"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.img?t("img",{staticClass:"avatar-user-img",attrs:{height:"50",width:"50",src:e.row.img}}):t("span",[a._v("无")])]}}])}),a._v(" "),t("el-table-column",{attrs:{label:"消息详情"},scopedSlots:a._u([{key:"default",fn:function(e){return[e.row.content?t("span",{staticClass:"single-hide"},[a._v(a._s(e.row.content))]):t("span",[a._v("无")])]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"发送时间"}}),a._v(" "),t("el-table-column",{attrs:{prop:"name",label:"所属酒吧"}}),a._v(" "),t("el-table-column",{attrs:{prop:"del_id",label:"操作者ID"}}),a._v(" "),t("el-table-column",{attrs:{prop:"del_name",label:"操作者昵称"}}),a._v(" "),t("el-table-column",{attrs:{label:"操作"},scopedSlots:a._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){a.handleCancelDeleteMessage(e.row,e.$index)}}},[a._v("取消删除")])]}}])})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"","current-page":a.params.page,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var r=t("VU/8")(n,s,!1,function(a){t("Y9xz")},"data-v-2ab28eaf",null);e.default=r.exports},Y9xz:function(a,e,t){var l=t("fKBk");"string"==typeof l&&(l=[[a.i,l,""]]),l.locals&&(a.exports=l.locals);t("rjj0")("088b2aec",l,!0)},fKBk:function(a,e,t){(a.exports=t("FZ+f")(!1)).push([a.i,"\n.wx-user[data-v-2ab28eaf] {\n  padding: 20px 10px 0;\n  max-height: 500px;\n  overflow: auto;\n}\n.wx-user .wx-user-item[data-v-2ab28eaf] {\n    margin-bottom: 10px;\n}\n.wx_avatar[data-v-2ab28eaf] {\n  height: 0;\n  padding-bottom: 80%;\n}\n.wx_avatar img[data-v-2ab28eaf] {\n    width: 80%;\n}\n",""])}});