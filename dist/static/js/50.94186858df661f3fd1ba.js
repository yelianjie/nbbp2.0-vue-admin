webpackJsonp([50],{DSCv:function(n,e,i){(n.exports=i("FZ+f")(!1)).push([n.i,"\n.social-signup-container[data-v-2de1732c] {\n  margin: 20px 0;\n}\n.social-signup-container .sign-btn[data-v-2de1732c] {\n    display: inline-block;\n    cursor: pointer;\n}\n.social-signup-container .icon[data-v-2de1732c] {\n    color: #fff;\n    font-size: 30px;\n    margin-top: 6px;\n}\n.social-signup-container .wx-svg-container[data-v-2de1732c],\n  .social-signup-container .qq-svg-container[data-v-2de1732c] {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    padding-top: 1px;\n    border-radius: 4px;\n    margin-bottom: 20px;\n    margin-right: 5px;\n}\n.social-signup-container .wx-svg-container[data-v-2de1732c] {\n    background-color: #8dc349;\n}\n.social-signup-container .qq-svg-container[data-v-2de1732c] {\n    background-color: #6BA2D6;\n    margin-left: 50px;\n}\n",""])},dZXH:function(n,e,i){"use strict";function t(n,e,i,t){var o=void 0!==window.screenLeft?window.screenLeft:screen.left,c=void 0!==window.screenTop?window.screenTop:screen.top,s=(window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width)/2-i/2+o,a=(window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height)/2-t/2+c,r=window.open(n,e,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width="+i+", height="+t+", top="+a+", left="+s);window.focus&&r.focus()}Object.defineProperty(e,"__esModule",{value:!0});var o={name:"social-signin",methods:{wechatHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);t("https://open.weixin.qq.com/connect/qrconnect?appid=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect")+"&response_type=code&scope=snsapi_login#wechat_redirect",n,540,540)},tencentHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);t("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect"),n,540,540)}}},c={render:function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"social-signup-container"},[i("div",{staticClass:"sign-btn",on:{click:function(e){n.wechatHandleClick("wechat")}}},[i("span",{staticClass:"wx-svg-container"},[i("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),n._v(" 微信\n  ")]),n._v(" "),i("div",{staticClass:"sign-btn",on:{click:function(e){n.tencentHandleClick("tencent")}}},[i("span",{staticClass:"qq-svg-container"},[i("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),n._v(" QQ\n  ")])])},staticRenderFns:[]};var s=i("VU/8")(o,c,!1,function(n){i("isrs")},"data-v-2de1732c",null);e.default=s.exports},isrs:function(n,e,i){var t=i("DSCv");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);i("rjj0")("45634581",t,!0)}});