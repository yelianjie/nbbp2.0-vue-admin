webpackJsonp([42],{"1wk0":function(a,e,t){(a.exports=t("BkJT")(!1)).push([a.i,"",""])},h1nt:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t("mFSD"),n=t("0xDb"),o={name:"statistics",data:function(){return{loading:!0,tableLoading:!1,bars:[{label:"CMK酒吧",value:10},{label:"牛霸酒吧",value:9}],dialogVisible:!1,params:{page:1,pageSize:10,name:"",beginT:"",endT:"",dateValue:""},tableData:[],total:0}},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var a=this;this.loading=!0,Object(l.c)(this.params).then(function(e){var t=e.data.result;a.tableData=t.data,a.total=t.total,a.loading=!1}).catch(function(e){a.loading=!1})},resetParams:function(){this.params.page=1},onSubmit:function(){this.resetParams(),Array.isArray(this.params.dateValue)&&this.params.dateValue.length>0&&(this.params.beginT=this.params.dateValue[0],this.params.endT=this.params.dateValue[1]),this.getData(),console.log("submit!")},handleDelete:function(a,e){console.log(a),this.dialogVisible=!0},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},DeleteBar:function(){alert("delete"),this.dialogVisible=!1},handleEdit:function(a,e){this.$router.push({path:"/barManageDo/edit",query:{edit:Math.random()}})},dateChange:function(a){null==a&&(this.params.beginT="",this.params.endT="")}},filters:{calNotSysMoney:function(a){var e=null==a.total?0:a.total;return Object(n.a)(e,a.t5)}}},r={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"container"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[t("el-form-item",{attrs:{label:"酒吧名称"}},[t("el-input",{attrs:{placeholder:"请输入酒吧名称",clearable:""},model:{value:a.params.name,callback:function(e){a.$set(a.params,"name",e)},expression:"params.name"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:a.dateChange},model:{value:a.params.dateValue,callback:function(e){a.$set(a.params,"dateValue",e)},expression:"params.dateValue"}})],1),a._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{data:a.tableData}},[t("el-table-column",{attrs:{fixed:"",prop:"name",label:"酒吧名称"}}),a._v(" "),t("el-table-column",{attrs:{prop:"total",label:"总收益"}}),a._v(" "),t("el-table-column",{attrs:{prop:"t1",label:"代理收益"}}),a._v(" "),t("el-table-column",{attrs:{prop:"t2",label:"商户收益"}}),a._v(" "),t("el-table-column",{attrs:{prop:"t3",label:"酒吧管理"}}),a._v(" "),t("el-table-column",{attrs:{prop:"t4",label:"用户收益"}}),a._v(" "),t("el-table-column",{attrs:{label:"非平台收益之和"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n         "+a._s(a._f("calNotSysMoney")(e.row))+"\n       ")]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"t5",label:"平台收益"}}),a._v(" "),t("el-table-column",{attrs:{prop:"platform_sxf_income",label:"手续费"}})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var s=t("/Xao")(o,r,!1,function(a){t("odjC")},"data-v-8a9da816",null);e.default=s.exports},odjC:function(a,e,t){var l=t("1wk0");"string"==typeof l&&(l=[[a.i,l,""]]),l.locals&&(a.exports=l.locals);t("8bSs")("665b9bef",l,!0)}});