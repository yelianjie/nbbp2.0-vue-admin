webpackJsonp([43],{"+KUP":function(e,t,n){var s=n("IJkF");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n("8bSs")("07bfa8ee",s,!0)},"8/fC":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("MTGp"),i={name:"systemSetting",data:function(){return{loading:!1,sysItems:[],rules:{platform_divide_into:{min:20,max:100,type:"inputNumber"},user_divide_into:{min:0,max:100,type:"inputNumber"},agent_max_into:{min:0,max:100,type:"inputNumber"},send_experience:{type:"inputText"},platform_sxfei:{min:0,max:100,type:"inputNumber"}}}},created:function(){var e=this;Object(s.c)().then(function(t){e.sysItems=t.data.result})},mounted:function(){},methods:{setRate:function(e,t){var n=this;Object(s.d)({code:e,value:t}).then(function(e){n.$message.success("修改成功")})}}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("系统设置")])]),e._v(" "),n("div",{staticClass:"text item"},e._l(e.sysItems,function(t,s){return n("el-row",{key:s,staticClass:"sys-item"},[n("el-col",[n("span",{staticClass:"percent-tip"},[e._v(e._s(t.describe))]),e._v(" "),"inputNumber"==e.rules[t.code].type?n("el-input-number",{staticClass:"input-number-percent",attrs:{"controls-position":"right",size:"small",min:e.rules[t.code].min,max:e.rules[t.code].max},model:{value:t.value,callback:function(n){e.$set(t,"value",n)},expression:"v.value"}}):e._e(),e._v(" "),"inputText"==e.rules[t.code].type?n("el-input",{staticClass:"el-input-text",attrs:{placeholder:"请输入"+t.describe},model:{value:t.value,callback:function(n){e.$set(t,"value",n)},expression:"v.value"}}):e._e(),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:function(n){e.setRate(t.code,t.value)}}},[e._v("设置")])],1)],1)}))])],1)},staticRenderFns:[]};var l=n("/Xao")(i,a,!1,function(e){n("+KUP")},null,null);t.default=l.exports},IJkF:function(e,t,n){(e.exports=n("BkJT")(!1)).push([e.i,"\n.sys-item {\n  margin-bottom: 20px;\n}\n.sys-item /deep/ .el-input-text {\n    width: 140px;\n}\n.percent-tip {\n  margin-right: 10px;\n}\n",""])}});