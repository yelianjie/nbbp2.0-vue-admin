webpackJsonp([27],{"/eMw":function(n,t,e){var o=e("D8zp");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("07b434cf",o,!0)},D8zp:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"/* reset element-ui css */\n.login-container .el-input {\n  display: inline-block;\n  height: 47px;\n  width: 85%;\n}\n.login-container .el-input input {\n    background: transparent;\n    border: 0px;\n    -webkit-appearance: none;\n    border-radius: 0px;\n    padding: 12px 5px 12px 15px;\n    color: #eee;\n    height: 47px;\n}\n.login-container .el-input input:-webkit-autofill {\n      -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;\n      -webkit-text-fill-color: #fff !important;\n}\n.login-container .el-form-item {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  color: #454545;\n}\n",""])},"T+/8":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("M9A7"),i={name:"login",data:function(){return{message:null,loginType:1,loginForm:{name:"",pwd:""},QRScan:{url:"",id:""},loginRules:{name:[{required:!0,trigger:"blur",message:"请输入用户名"}],pwd:[{required:!0,trigger:"blur",message:"请输入密码"}]},passwordType:"password",loading:!1,showDialog:!1}},methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var n=this;this.$refs.loginForm.validate(function(t){if(n.message&&n.message.close(),!t)return console.log("error submit!!"),!1;n.loading=!0,n.$store.dispatch("LoginByUsername",n.loginForm).then(function(t){n.loading=!1,n.$message({message:"登录成功",type:"success"}),n.$router.push({path:"/"})}).catch(function(t){n.loading=!1,n.$message({message:t.msg,type:"error"})})})},getQRScan:function(){var n=this;Object(o.a)().then(function(t){console.log(t);var e=t.data.result;n.QRScan={url:e.imgurl,id:e.id}})},handleLoginByWx:function(){var n=this;this.$store.dispatch("LoginByWx",{id:this.QRScan.id}).then(function(t){n.$message({message:"登录成功",type:"success"}),n.$router.push({path:"/"}),clearTimeout(n.interval)}).catch(function(n){console.log(n)})},afterQRScan:function(){}},created:function(){this.getQRScan(),this.interval=setInterval(this.handleLoginByWx,3e3)},destroyed:function(){}},a={render:function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:n.loginForm,rules:n.loginRules,"label-position":"left"}},[o("div",{staticClass:"title-container"},[o("img",{staticClass:"logo",attrs:{src:e("7Otq")}}),n._v(" "),o("h3",{staticClass:"title"},[n._v(n._s(n.$t("login.title")))])]),n._v(" "),1==n.loginType?[o("el-form-item",{attrs:{prop:"name"}},[o("span",{staticClass:"svg-container svg-container_login"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),o("el-input",{attrs:{name:"name",type:"text",autoComplete:"on",placeholder:"请输入用户名"},model:{value:n.loginForm.name,callback:function(t){n.$set(n.loginForm,"name",t)},expression:"loginForm.name"}})],1),n._v(" "),o("el-form-item",{attrs:{prop:"pwd"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),o("el-input",{attrs:{name:"pwd",type:n.passwordType,autoComplete:"on",placeholder:"请输入密码"},nativeOn:{keyup:function(t){if(!("button"in t)&&n._k(t.keyCode,"enter",13,t.key))return null;n.handleLogin(t)}},model:{value:n.loginForm.pwd,callback:function(t){n.$set(n.loginForm,"pwd",t)},expression:"loginForm.pwd"}}),n._v(" "),o("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[o("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{type:"primary",loading:n.loading},nativeOn:{click:function(t){t.preventDefault(),n.handleLogin(t)}}},[n._v(n._s(n.$t("login.logIn")))])]:n._e(),n._v(" "),2==n.loginType?[o("div",{staticClass:"text-center"},[o("img",{staticStyle:{width:"250px",height:"250px"},attrs:{src:n.QRScan.url}}),n._v(" "),o("p",{staticStyle:{color:"#fff","margin-bottom":"40px"}},[n._v("请使用微信二维码扫描登录")])])]:n._e(),n._v(" "),o("el-row",[o("el-col",{attrs:{span:8}},[o("hr")]),n._v(" "),o("el-col",{staticClass:"text-center",staticStyle:{color:"#fff"},attrs:{span:8}},[n._v("其他登录方式")]),n._v(" "),o("el-col",{attrs:{span:8}},[o("hr")])],1),n._v(" "),o("div",{staticClass:"text-center",staticStyle:{padding:"20px 0"}},[1==n.loginType?o("el-button",{staticClass:"pointer",nativeOn:{click:function(t){n.loginType=2}}},[n._v("微信扫码登录")]):n._e(),n._v(" "),2==n.loginType?o("el-button",{staticClass:"pointer",nativeOn:{click:function(t){n.loginType=1}}},[n._v("账号密码登录")]):n._e()],1)],2)],1)},staticRenderFns:[]};var s=e("VU/8")(i,a,!1,function(n){e("/eMw"),e("eWuj")},"data-v-25d4c8e0",null);t.default=s.exports},eWuj:function(n,t,e){var o=e("m+Ox");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("28f7fd69",o,!0)},"m+Ox":function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.login-container[data-v-25d4c8e0] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  height: 100vh;\n  background-color: #2d3a4b;\n}\n.login-container .logo[data-v-25d4c8e0] {\n    display: block;\n    margin: 0 auto 20px;\n    width: 120px;\n    height: 120px;\n}\n.login-container .login-form[data-v-25d4c8e0] {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 520px;\n    padding: 35px 35px 15px 35px;\n    margin: 120px auto;\n}\n.login-container .tips[data-v-25d4c8e0] {\n    font-size: 14px;\n    color: #fff;\n    margin-bottom: 10px;\n}\n.login-container .tips span[data-v-25d4c8e0]:first-of-type {\n      margin-right: 16px;\n}\n.login-container .svg-container[data-v-25d4c8e0] {\n    padding: 6px 5px 6px 15px;\n    color: #889aa4;\n    vertical-align: middle;\n    width: 30px;\n    display: inline-block;\n}\n.login-container .svg-container_login[data-v-25d4c8e0] {\n      font-size: 20px;\n}\n.login-container .title-container[data-v-25d4c8e0] {\n    position: relative;\n}\n.login-container .title-container .title[data-v-25d4c8e0] {\n      font-size: 26px;\n      font-weight: 400;\n      color: #eee;\n      margin: 0px auto 40px auto;\n      text-align: center;\n      font-weight: bold;\n}\n.login-container .title-container .set-language[data-v-25d4c8e0] {\n      color: #fff;\n      position: absolute;\n      top: 5px;\n      right: 0px;\n}\n.login-container .show-pwd[data-v-25d4c8e0] {\n    position: absolute;\n    right: 10px;\n    top: 7px;\n    font-size: 16px;\n    color: #889aa4;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.login-container .thirdparty-button[data-v-25d4c8e0] {\n    position: absolute;\n    right: 35px;\n    bottom: 28px;\n}\n",""])}});