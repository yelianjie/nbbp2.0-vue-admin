webpackJsonp([47],{d2Nk:function(e,l,v){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var d={name:"sticky-demo",components:{Sticky:v("vHhr").a},data:function(){return{time:"",url:"",platforms:["a-platform"],platformsOptions:[{key:"a-platform",name:"platformA"},{key:"b-platform",name:"platformB"},{key:"c-platform",name:"platformC"}],pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}}}}},a={render:function(){var e=this,l=e.$createElement,v=e._self._c||l;return v("div",[v("sticky",{attrs:{className:"sub-navbar"}},[v("el-dropdown",{attrs:{trigger:"click"}},[v("el-button",{attrs:{plain:""}},[e._v("\n        Platform"),v("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e._v(" "),v("el-dropdown-menu",{staticClass:"no-border",attrs:{slot:"dropdown"},slot:"dropdown"},[v("el-checkbox-group",{staticStyle:{padding:"5px 15px"},model:{value:e.platforms,callback:function(l){e.platforms=l},expression:"platforms"}},e._l(e.platformsOptions,function(l){return v("el-checkbox",{key:l.key,attrs:{label:l.key}},[e._v("\n            "+e._s(l.name)+"\n          ")])}))],1)],1),e._v(" "),v("el-dropdown",{attrs:{trigger:"click"}},[v("el-button",{attrs:{plain:""}},[e._v("\n        Link"),v("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e._v(" "),v("el-dropdown-menu",{staticClass:"no-padding no-border",staticStyle:{width:"300px"},attrs:{slot:"dropdown"},slot:"dropdown"},[v("el-input",{attrs:{placeholder:"Please enter the content"},model:{value:e.url,callback:function(l){e.url=l},expression:"url"}},[v("template",{slot:"prepend"},[e._v("Url")])],2)],1)],1),e._v(" "),v("div",{staticClass:"time-container"},[v("el-date-picker",{attrs:{type:"datetime","picker-options":e.pickerOptions,format:"yyyy-MM-dd HH:mm:ss",placeholder:"Release time"},model:{value:e.time,callback:function(l){e.time=l},expression:"time"}})],1),e._v(" "),v("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"success"}},[e._v("publish\n    ")])],1),e._v(" "),v("div",{staticClass:"components-container"},[v("code",[e._v("Sticky header, "+e._s(e.$t("components.stickyTips")))]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")]),e._v(" "),v("div",[e._v("placeholder")])])],1)},staticRenderFns:[]};var o=v("/Xao")(d,a,!1,function(e){v("kBlS")},"data-v-325d4e78",null);l.default=o.exports},kBlS:function(e,l,v){var d=v("szyY");"string"==typeof d&&(d=[[e.i,d,""]]),d.locals&&(e.exports=d.locals);v("8bSs")("6a1930d8",d,!0)},szyY:function(e,l,v){(e.exports=v("BkJT")(!1)).push([e.i,"\n.components-container div[data-v-325d4e78] {\r\n  margin: 10px;\n}\n.time-container[data-v-325d4e78] {\r\n  display: inline-block;\n}\r\n",""])}});