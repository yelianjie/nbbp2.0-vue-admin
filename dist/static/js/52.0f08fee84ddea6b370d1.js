webpackJsonp([52],{Fx1r:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"tinymce-demo",components:{Tinymce:n("5aCZ").a},data:function(){return{content:'<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>\n      <ul>\n        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>\n        <li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li>\n        <li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>\n      </ul>\n      '}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"components-container"},[n("code",[t._v("\n    "+t._s(t.$t("components.tinymceTips"))+"\n    "),n("a",{staticClass:"link-type",attrs:{target:"_blank",href:"https://panjiachen.github.io/vue-element-admin-site/#/rich-editor"}},[t._v(" "+t._s(t.$t("components.documentation")))])]),t._v(" "),n("div",[n("tinymce",{attrs:{height:300},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),n("div",{staticClass:"editor-content",domProps:{innerHTML:t._s(t.content)}})])},staticRenderFns:[]};var a=n("VU/8")(i,o,!1,function(t){n("OYHk")},"data-v-2d2e8c3a",null);e.default=a.exports},OYHk:function(t,e,n){var i=n("kCJ5");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("ce105ea6",i,!0)},kCJ5:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.editor-content[data-v-2d2e8c3a]{\n  margin-top: 20px;\n}\n",""])}});