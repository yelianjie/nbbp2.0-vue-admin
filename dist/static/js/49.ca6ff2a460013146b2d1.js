webpackJsonp([49],{ClUe:function(t,e,n){var r=n("VeFr");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("8bSs")("33042396",r,!0)},"G/2s":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("wmTB"),a={name:"countTo-demo",components:{countTo:n.n(r).a},data:function(){return{setStartVal:0,setEndVal:2017,setDuration:4e3,setDecimals:0,setSeparator:",",setSuffix:" rmb",setPrefix:"¥ "}},computed:{_startVal:function(){return this.setStartVal?this.setStartVal:0},_endVal:function(){return this.setEndVal?this.setEndVal:0},_duration:function(){return this.setDuration?this.setDuration:100},_decimals:function(){return this.setDecimals?this.setDecimals<0||this.setDecimals>20?(alert("digits argument must be between 0 and 20"),0):this.setDecimals:0},_separator:function(){return this.setSeparator},_suffix:function(){return this.setSuffix},_prefix:function(){return this.setPrefix}},methods:{start:function(){this.$refs.example.start()},pauseResume:function(){this.$refs.example.pauseResume()}}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"components-container"},[t._m(0),t._v(" "),n("count-to",{ref:"example",staticClass:"example",attrs:{"start-val":t._startVal,"end-val":t._endVal,duration:t._duration,decimals:t._decimals,separator:t._separator,prefix:t._prefix,suffix:t._suffix,autoplay:!1}}),t._v(" "),n("div",{staticStyle:{"margin-left":"25%","margin-top":"40px"}},[n("label",{staticClass:"label",attrs:{for:"startValInput"}},[t._v("startVal:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setStartVal,expression:"setStartVal",modifiers:{number:!0}}],attrs:{type:"number",name:"startValInput"},domProps:{value:t.setStartVal},on:{input:function(e){e.target.composing||(t.setStartVal=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"endValInput"}},[t._v("endVal:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setEndVal,expression:"setEndVal",modifiers:{number:!0}}],attrs:{type:"number",name:"endVaInput"},domProps:{value:t.setEndVal},on:{input:function(e){e.target.composing||(t.setEndVal=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"durationInput"}},[t._v("duration:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setDuration,expression:"setDuration",modifiers:{number:!0}}],attrs:{type:"number",name:"durationInput"},domProps:{value:t.setDuration},on:{input:function(e){e.target.composing||(t.setDuration=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),n("div",{staticClass:"startBtn example-btn",on:{click:t.start}},[t._v("开始")]),t._v(" "),n("div",{staticClass:"pause-resume-btn example-btn",on:{click:t.pauseResume}},[t._v("暂停/恢复")]),t._v(" "),n("br"),t._v(" "),n("label",{staticClass:"label",attrs:{for:"decimalsInput"}},[t._v("decimals:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setDecimals,expression:"setDecimals",modifiers:{number:!0}}],attrs:{type:"number",name:"decimalsInput"},domProps:{value:t.setDecimals},on:{input:function(e){e.target.composing||(t.setDecimals=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"separatorInput"}},[t._v("separator:\n      "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setSeparator,expression:"setSeparator"}],attrs:{name:"separatorInput"},domProps:{value:t.setSeparator},on:{input:function(e){e.target.composing||(t.setSeparator=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"prefixInput"}},[t._v("prefix:\n      "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setPrefix,expression:"setPrefix"}],attrs:{name:"prefixInput"},domProps:{value:t.setPrefix},on:{input:function(e){e.target.composing||(t.setPrefix=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"suffixInput"}},[t._v("suffix:\n      "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setSuffix,expression:"setSuffix"}],attrs:{name:"suffixInput"},domProps:{value:t.setSuffix},on:{input:function(e){e.target.composing||(t.setSuffix=e.target.value)}}})])]),t._v(" "),n("code",[t._v("<count-to :start-val='"+t._s(t._startVal)+"' :end-val='"+t._s(t._endVal)+"' :duration='"+t._s(t._duration)+"'\n    :decimals='"+t._s(t._decimals)+"' :separator='"+t._s(t._separator)+"' :prefix='"+t._s(t._prefix)+"' :suffix='"+t._s(t._suffix)+"'\n    :autoplay=false>")])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"warn-content"},[e("a",{attrs:{href:"https://github.com/PanJiaChen/vue-countTo",target:"_blank"}},[this._v("countTo-component")])])}]};var o=n("/Xao")(a,s,!1,function(t){n("ClUe")},"data-v-3858d4a1",null);e.default=o.exports},VeFr:function(t,e,n){(t.exports=n("BkJT")(!1)).push([t.i,"\n.example-btn[data-v-3858d4a1] {\r\n  display: inline-block;\r\n  margin-bottom: 0;\r\n  font-weight: 500;\r\n  text-align: center;\r\n  -ms-touch-action: manipulation;\r\n  touch-action: manipulation;\r\n  cursor: pointer;\r\n  background-image: none;\r\n  border: 1px solid transparent;\r\n  white-space: nowrap;\r\n  line-height: 1.5;\r\n  padding: 4px 15px;\r\n  font-size: 12px;\r\n  border-radius: 4px;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);\r\n  transition: all .3s cubic-bezier(.645, .045, .355, 1);\r\n  position: relative;\r\n  color: rgba(0, 0, 0, .65);\r\n  background-color: #fff;\r\n  border-color: #d9d9d9;\n}\n.example-btn[data-v-3858d4a1]:hover {\r\n  color: #4AB7BD;\r\n  background-color: #fff;\r\n  border-color: #4AB7BD;\n}\n.example[data-v-3858d4a1] {\r\n  font-size: 50px;\r\n  color: #F6416C;\r\n  display: block;\r\n  margin: 10px 0;\r\n  text-align: center;\r\n  font-size: 80px;\r\n  font-weight: 500;\n}\n.label[data-v-3858d4a1] {\r\n  color: #2f4f4f;\r\n  font-size: 16px;\r\n  display: inline-block;\r\n  margin: 15px 30px 15px 0;\n}\ninput[data-v-3858d4a1] {\r\n  position: relative;\r\n  display: inline-block;\r\n  padding: 4px 7px;\r\n  width: 70px;\r\n  height: 28px;\r\n  cursor: text;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  color: rgba(0, 0, 0, .65);\r\n  background-color: #fff;\r\n  background-image: none;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 4px;\r\n  -webkit-transition: all .3s;\r\n  transition: all .3s;\n}\n.startBtn[data-v-3858d4a1] {\r\n  margin-left: 20px;\r\n  font-size: 20px;\r\n  color: #30B08F;\r\n  background-color: #fff;\n}\n.startBtn[data-v-3858d4a1]:hover {\r\n  background-color: #30B08F;\r\n  color: #fff;\r\n  border-color: #30B08F;\n}\n.pause-resume-btn[data-v-3858d4a1] {\r\n  font-size: 20px;\r\n  color: #E65D6E;\r\n  background-color: #fff;\n}\n.pause-resume-btn[data-v-3858d4a1]:hover {\r\n  background-color: #E65D6E;\r\n  color: #fff;\r\n  border-color: #E65D6E;\n}\r\n",""])}});