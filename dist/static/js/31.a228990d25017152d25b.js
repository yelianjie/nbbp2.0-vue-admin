webpackJsonp([31,54],{HUCu:function(a,e,t){(a.exports=t("FZ+f")(!1)).push([a.i,"\n.card-panel[data-v-14d0e125] {\n  padding: 24px;\n  border: 1px solid #e9e9e9;\n}\n.card-panel-col[data-v-14d0e125] {\n  margin-bottom: 24px;\n}\n.card-panel-text[data-v-14d0e125] {\n  font-size: 16px;\n  color: rgba(0, 0, 0, 0.45);\n  margin-bottom: 12px;\n}\n.card-panel-num[data-v-14d0e125] {\n  font-size: 20px;\n  font-weight: bold;\n}\n.number-col[data-v-14d0e125] {\n  margin-bottom: 15px;\n}\n",""])},TaAy:function(a,e,t){var n=t("HUCu");"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);t("rjj0")("c6f53510",n,!0)},"b/7n":function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("WBHA"),l={name:"panelGroup",props:["paneldata"],data:function(){return{}},components:{CountTo:t.n(n).a},filters:{getRow:function(a){return 2===a?24:12}}},r={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("el-row",{staticClass:"panel-group",attrs:{gutter:24}},a._l(a.paneldata,function(e,n){return t("el-col",{key:n,staticClass:"card-panel-col",attrs:{xs:12,sm:8,lg:8}},[t("div",{staticClass:"card-panel"},[t("el-row",{staticClass:"panel-group",attrs:{gutter:24}},a._l(e,function(n,l){return t("el-col",{key:l,staticClass:"number-col",attrs:{span:a._f("getRow")(e.length)}},[t("div",{staticClass:"card-panel-description"},[t("div",{staticClass:"card-panel-text"},[a._v(a._s(n.label))]),a._v(" "),e.decimals?t("count-to",{staticClass:"card-panel-num",attrs:{startVal:0,endVal:e.number,duration:2e3,decimals:e.decimals}}):t("count-to",{staticClass:"card-panel-num",attrs:{startVal:0,endVal:e.number,duration:2e3}})],1)])}))],1)])}))},staticRenderFns:[]};var s=t("VU/8")(l,r,!1,function(a){t("TaAy")},"data-v-14d0e125",null);e.default=s.exports},ny60:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("b/7n"),l=t("ms7A"),r={name:"wxManager",data:function(){return{loading:!0,tableLoading:!1,panelData:[[{label:"用户总数",number:0},{label:"关注用户",number:0},{label:"会员用户",number:0}],[{label:"昨日新增用户数",number:0},{label:"昨日新增关注",number:0},{label:"昨日新增会员用户",number:0},{label:"昨日活跃用户",number:0}],[{label:"牛角余额",number:0},{label:"收益余额",number:0}]],params:{page:1,pageSize:10,name:"",id:"",beginT:"",endT:"",dateValue:""},tableData:[],total:0}},created:function(){var a=this;this.getData(),Object(l.f)().then(function(e){var t=e.data.result;a.panelData[0].number=t.tNum,a.panelData[1].number=t.yIncNum,a.panelData[2].number=t.acNum}).catch(function(a){})},mounted:function(){},methods:{getData:function(){var a=this;this.loading=!0,Object(l.g)(this.params).then(function(e){var t=e.data.result;a.tableData=t.data,a.total=t.total,a.loading=!1}).catch(function(e){a.loading=!1})},onSubmit:function(){this.resetParams(),Array.isArray(this.params.dateValue)&&this.params.dateValue.length>0&&(this.params.beginT=this.params.dateValue[0],this.params.endT=this.params.dateValue[1]),this.getData(),console.log("submit")},dateChange:function(a){null==a&&(this.params.beginT="",this.params.endT="")},handleSizeChange:function(a){this.params.pageSize=a,this.getData()},handleCurrentChange:function(a){this.params.page=a,this.getData(),console.log("当前页: "+a)},resetParams:function(){this.params.page=1}},components:{panelNumber:n.default}},s={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"container"},[t("panel-number",{attrs:{paneldata:a.panelData}}),a._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:a.params}},[t("el-form-item",{attrs:{label:"昵称"}},[t("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},model:{value:a.params.name,callback:function(e){a.$set(a.params,"name",e)},expression:"params.name"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"ID"}},[t("el-input",{attrs:{placeholder:"请输入ID",clearable:""},model:{value:a.params.id,callback:function(e){a.$set(a.params,"id",e)},expression:"params.id"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"时间"}},[t("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:a.dateChange},model:{value:a.params.dateValue,callback:function(e){a.$set(a.params,"dateValue",e)},expression:"params.dateValue"}})],1),a._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:a.onSubmit}},[a._v("搜索")])],1)],1),a._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{fit:"",data:a.tableData}},[t("el-table-column",{attrs:{prop:"mc_id",label:"ID"}}),a._v(" "),t("el-table-column",{attrs:{width:"160px",label:"用户头像"},scopedSlots:a._u([{key:"default",fn:function(e){return[t("img",{staticClass:"avatar-user-img",attrs:{src:a._f("uploadPrefixUrl")(e.row.headimgurl)}})]}}])}),a._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"nickname",label:"微信昵称"}}),a._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"",label:"牛角余额"}}),a._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"",label:"收益余额"}}),a._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"",label:"贵族等级"}}),a._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"",label:"总消费"}}),a._v(" "),t("el-table-column",{attrs:{width:"160px",prop:"",label:"总收益"}}),a._v(" "),t("el-table-column",{attrs:{label:"地区",width:"200px"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n        "+a._s(e.row.province)+"-"+a._s(e.row.city)+"\n      ")]}}])}),a._v(" "),t("el-table-column",{attrs:{prop:"time",label:"上次活跃时间"}})],1),a._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1)},staticRenderFns:[]},i=t("VU/8")(r,s,!1,null,null,null);e.default=i.exports}});