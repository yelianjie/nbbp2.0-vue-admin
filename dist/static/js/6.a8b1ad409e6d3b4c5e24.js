webpackJsonp([6,37],{"666p":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,n=a("bOdI"),s=a.n(n),i=a("woOf"),o=a.n(i),l=a("tiXV"),c=a("KI+6"),p=a("dioa"),u=a("xJrl"),d=a("rBKV"),m={name:"barManageEdit",directives:{clipboard:c.a},data:function(){return{visibleMap:!1,isEdit:!1,actionBtns:[{text:"确定",type:"primary"}],form:{},rate:{},formRules:{name:[{required:!0,trigger:"blur",message:"请输入酒吧名字"}],contact_tel:[{required:!0,trigger:"blur",message:"请输入联系电话"},{min:11,max:11,message:"手机号码应该是11位",trigger:"blur"}]},agents:[],managers:[],selectAgent:"",selectManager:"",disableManagers:!0,disableAgent:!0,oldSelectAgent:""}},created:function(){this.getData()},watch:{selectManager:function(e,t){e?(this.disableManagers=!1,this.form.supervise_id=e):(this.disableManagers=!0,this.form.supervise_id="")},selectAgent:function(e,t){e?(this.disableAgent=!1,this.form.agent_id=e):(this.disableAgent=!0,this.form.agent_id="")}},methods:(r={getData:function(){var e=this;Object(p.b)({ht_id:this.$route.params.id}).then(function(t){e.form=t.data.result.hotel,e.form.status=e.form.status.toString(),console.log(e.form.status),e.rate=t.data.result.rate,e.managers=t.data.result.superviseList,e.agents=t.data.result.agentList,e.selectAgent=t.data.result.agent?t.data.result.agent.mc_id:"",e.oldSelectAgent=e.selectAgent,e.selectManager=t.data.result.supervise?t.data.result.supervise.id:""})},updateBarAction:function(){var e=this;this.form.ht_id=this.$route.params.id,Object(p.d)(this.form).then(function(t){e.$message.success("修改成功"),e.getData()})},updateRateAction:function(){var e=this;this.form.ht_id=this.$route.params.id,this.calPercent()&&Object(p.e)(this.form).then(function(t){e.$message.success("修改成功")})},calPercent:function(){return!(this.form.ht_separate+this.form.manage_separate+this.form.yewu_separate+this.form.company_separate>100)||(this.$message.error("商户、代理和酒吧管理比例之和不能超过"+(100-this.form.company_separate)+"%"),!1)},handleChangeUser:function(e){},handleChange1:function(e){this.form.ht_separate=e,this.calCompany()},handleChange2:function(e){this.form.manage_separate=e,this.calCompany()},handleChange3:function(e){this.form.yewu_separate=e,this.calCompany()},calCompany:function(){var e=100-this.form.ht_separate-this.form.manage_separate-this.form.yewu_separate;e<Number(this.rate.platform_divide_into)?this.form.company_separate=Number(this.rate.platform_divide_into):this.form.company_separate=e},calBar:function(){var e=100-this.form.company_separate-this.form.manage_separate-this.form.yewu_separate;this.form.ht_separate=e},calAgent:function(){var e=100-this.form.company_separate-this.form.manage_separate-this.form.ht_separate;Number(e)<=this.agentCal&&(this.form.yewu_separate=e)},handleLogoSuccess:function(e,t){this.form.logoUrl=URL.createObjectURL(t.raw)},uploadLogo:function(e){var t=this;if(this.beforeLogoUpload(e.file)){var a=new FormData;a.append("file",e.file),Object(u.k)(a).catch(function(e){t.$message.error("上传失败，请重新上传")}).then(function(e){t.$message.success("上传成功"),t.form.logo=e.data.result})}},beforeLogoUpload:function(e){var t=e.size/1024<50;return t||this.$message.error("上传图片大小不能超过 50K!"),t}},s()(r,"beforeLogoUpload",function(e){var t=e.size/1024<100;return t||this.$message.error("上传图片大小不能超过 100K!"),t}),s()(r,"closeDialog",function(e){if(null!=e){var t={address:e.addressComponents.street+e.addressComponents.streetNumber,locationLng:e.point.lat,locationLat:e.point.lng,province_name:e.addressComponents.province,city_name:e.addressComponents.city,area_name:e.addressComponents.district};this.form=o()({},this.form,t)}this.visibleMap=!1}),s()(r,"clipboardSuccess",function(){this.$message({message:"复制成功",type:"success",duration:1500})}),s()(r,"openNewWindow",function(){window.open(this.$options.filters.filterUrl(this.$route.params.id,"screen"))}),r),components:{BaiduMap:l.default},filters:{filterUrl:function(e,t){return"screen"===t?d.BASE_API.replace(/\"/g,"")+"/screen/?ht_id="+e:d.BASE_API.replace(/\"/g,"")+"/dist/#/Main/"+e}},computed:{agentCal:function(){var e=this;if(!this.selectAgent||!this.isEdit)return this.form.agent_o_separate?Number(this.form.agent_o_separate):0;var t=this.agents.find(function(t){return t.mc_id===e.selectAgent});return t?Number(t.default_divide_into):void 0},maxBar:function(){if(this.form.company_separate)return 100-this.rate.platform_divide_into},minBar:function(){if(this.form.company_separate){if(this.disableAgent&&this.disableManagers){var e=100-this.form.company_separate-this.form.manage_separate-this.form.yewu_separate;return Number(e)}return 1}}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"edit-container container"},[a("h3",{staticStyle:{"margin-top":"0"}},[e._v(e._s(e.form.name))]),e._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("基本信息")])]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.form,rules:e.formRules,"label-width":"80px"}},[a("el-row",[a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("el-form-item",{attrs:{label:"酒吧名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请填写酒吧名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系方式",prop:"contact_tel"}},[a("el-input",{attrs:{type:"number",placeholder:"请填写联系方式"},model:{value:e.form.contact_tel,callback:function(t){e.$set(e.form,"contact_tel",e._n(t))},expression:"form.contact_tel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"代理选择"}},[a("el-select",{attrs:{placeholder:"请选择代理选择",clearable:""},model:{value:e.selectAgent,callback:function(t){e.selectAgent=t},expression:"selectAgent"}},e._l(e.agents,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.mc_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"酒吧管理"}},[a("el-select",{attrs:{placeholder:"请选择酒吧管理",clearable:""},model:{value:e.selectManager,callback:function(t){e.selectManager=t},expression:"selectManager"}},e._l(e.managers,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"酒吧地址"}},[a("span",{staticClass:"address"},[a("svg-icon",{attrs:{"icon-class":"position"}}),e._v(e._s(e.form.province_name)+e._s(e.form.city_name)+e._s(e.form.area_name)+e._s(e.form.address)),a("el-button",{nativeOn:{click:function(t){e.visibleMap=!0}}},[e._v("编辑")])],1)])],1),e._v(" "),a("el-col",{attrs:{xs:22,sm:10,md:10,lg:10,xl:10,offset:2}},[a("div",{staticClass:"upload-wrap"},[a("div",{staticClass:"upload-text"},[e._v("酒吧LOGO")]),e._v(" "),a("div",{staticClass:"upload-inner"},[a("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",action:"","http-request":e.uploadLogo,"show-file-list":!1,"before-upload":e.beforeLogoUpload}},[e.form.logo?a("img",{staticClass:"avatar",attrs:{src:e._f("uploadPrefixUrl")(e.form.logo)}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),a("div",{staticClass:"format-tip"},[e._v("支持JPG、PNG等图片格式")])],1)])])],1),e._v(" "),a("div",{staticClass:"line"}),e._v(" "),a("el-form-item",{attrs:{label:"审核状态"}},[a("el-radio-group",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-radio",{attrs:{label:"1"}},[e._v("审核通过")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("审核不通过")]),e._v(" "),a("el-radio",{attrs:{label:"-1"}},[e._v("解约")])],1)],1),e._v(" "),a("el-row",{staticStyle:{"text-align":"right"}},[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.updateBarAction(t)}}},[e._v("确定")])],1)],1)],1),e._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("分成比例设置")])]),e._v(" "),a("el-form",{ref:"rateForm",attrs:{model:e.form,"label-width":"80px"}},[a("el-row",{staticClass:"rate-row"},[a("el-col",[a("span",{staticClass:"percent-tip"},[e._v("酒吧用户")]),e._v(" "),a("el-input-number",{staticClass:"input-number-percent",attrs:{"controls-position":"right",size:"small",min:1,max:100},on:{change:e.handleChangeUser},model:{value:e.form.users_separate,callback:function(t){e.$set(e.form,"users_separate",t)},expression:"form.users_separate"}}),e._v("%\n          "),a("span",{staticStyle:{"font-size":"13px","margin-left":"15px"}},[e._v("当前修改不高于"+e._s(e.rate.user_divide_into)+"%")])],1)],1),e._v(" "),a("el-row",{staticClass:"rate-row"},[a("el-col",[a("span",{staticClass:"percent-tip"},[e._v("酒吧商户")]),e._v(" "),a("el-input-number",{staticClass:"input-number-percent",attrs:{"controls-position":"right",size:"small",min:1,max:e.maxBar},on:{change:e.handleChange1},model:{value:e.form.ht_separate,callback:function(t){e.$set(e.form,"ht_separate",e._n(t))},expression:"form.ht_separate"}}),e._v("%\n          "),a("span",{staticClass:"percent-tip"},[e._v("酒吧管理")]),e._v(" "),a("el-input-number",{staticClass:"input-number-percent",attrs:{disabled:e.disableManagers,"controls-position":"right",size:"small",min:0,max:e.maxBar},on:{change:e.handleChange2},model:{value:e.form.manage_separate,callback:function(t){e.$set(e.form,"manage_separate",e._n(t))},expression:"form.manage_separate"}}),e._v("%\n          "),a("span",{staticClass:"percent-tip"},[e._v("代理")]),e._v(" "),a("el-input-number",{staticClass:"input-number-percent",attrs:{disabled:e.disableAgent,"controls-position":"right",size:"small",min:0,max:e.agentCal},on:{change:e.handleChange3},model:{value:e.form.yewu_separate,callback:function(t){e.$set(e.form,"yewu_separate",e._n(t))},expression:"form.yewu_separate"}}),e._v("%\n          "),a("span",{staticStyle:{"font-size":"13px","margin-left":"15px"}},[e._v("当前修改不高于"+e._s(e.agentCal)+"%")]),e._v(" "),a("span",{staticClass:"percent-tip"},[e._v("牛霸平台")]),e._v(" "),a("el-input-number",{staticClass:"input-number-percent",attrs:{disabled:!0,"controls-position":"right",size:"small",min:1,max:100},model:{value:e.form.company_separate,callback:function(t){e.$set(e.form,"company_separate",e._n(t))},expression:"form.company_separate"}}),e._v("%\n          "),a("span",{staticStyle:{"font-size":"13px","margin-left":"15px"}},[e._v("当前修改不低于"+e._s(e.rate.platform_divide_into)+"%")])],1)],1),e._v(" "),a("p",{staticClass:"tip"},[e._v("酒吧用户参与分成：酒吧用户+商户+酒吧管理+代理 +牛霸平台=100%")]),e._v(" "),a("p",{staticClass:"tip"},[e._v("酒吧用户不参与分成：商户+酒吧管理+代理 +牛霸平台=100%")])],1),e._v(" "),a("el-row",{staticStyle:{"text-align":"right"}},[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.updateRateAction(t)}}},[e._v("确定")])],1)],1),e._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("霸屏地址")])]),e._v(" "),a("div",{staticClass:"url-wrap"},[a("div",{staticClass:"url-item"},[a("p",[e._v(" 大屏URL："+e._s(e._f("filterUrl")(e.$route.params.id,"screen"))),a("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.$options.filters.filterUrl(e.$route.params.id,"screen"),expression:'$options.filters.filterUrl($route.params.id, "screen")',arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"primary",plain:""}},[e._v("复制")]),a("el-button",{attrs:{type:"primary",plain:""},nativeOn:{click:function(t){e.openNewWindow(t)}}},[e._v("打开")])],1),e._v(" "),a("p",[e._v("手机端URL："+e._s(e._f("filterUrl")(e.$route.params.id))),a("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.$options.filters.filterUrl(e.$route.params.id),expression:"$options.filters.filterUrl($route.params.id)",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"primary",plain:""}},[e._v("复制")])],1)]),e._v(" "),a("div",{staticClass:"qrcode-img"},[e.form.phone_er_url?a("img",{attrs:{src:e._f("uploadPrefixUrl")(e.form.phone_er_url)}}):e._e()])])]),e._v(" "),e.visibleMap?a("BaiduMap",{on:{closeDialog:e.closeDialog}}):e._e()],1)},staticRenderFns:[]};var v=a("VU/8")(m,f,!1,function(e){a("gRXA")},"data-v-f32e2738",null);t.default=v.exports},"9bBU":function(e,t,a){a("mClu");var r=a("FeBl").Object;e.exports=function(e,t,a){return r.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},"KI+6":function(e,t,a){"use strict";var r=a("V33R");if(!r)throw new Error("you shold npm install `clipboard` --save at first ");var n={bind:function(e,t){if("success"===t.arg)e._v_clipboard_success=t.value;else if("error"===t.arg)e._v_clipboard_error=t.value;else{var a=new r(e,{text:function(){return t.value},action:function(){return"cut"===t.arg?"cut":"copy"}});a.on("success",function(t){var a=e._v_clipboard_success;a&&a(t)}),a.on("error",function(t){var a=e._v_clipboard_error;a&&a(t)}),e._v_clipboard=a}},update:function(e,t){"success"===t.arg?e._v_clipboard_success=t.value:"error"===t.arg?e._v_clipboard_error=t.value:(e._v_clipboard.text=function(){return t.value},e._v_clipboard.action=function(){return"cut"===t.arg?"cut":"copy"})},unbind:function(e,t){"success"===t.arg?delete e._v_clipboard_success:"error"===t.arg?delete e._v_clipboard_error:(e._v_clipboard.destroy(),delete e._v_clipboard)}},s=function(e){e.directive("Clipboard",n)};window.Vue&&(window.clipboard=n,Vue.use(s)),n.install=s;t.a=n},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var r,n=a("C4MV"),s=(r=n)&&r.__esModule?r:{default:r};t.default=function(e,t,a){return t in e?(0,s.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},bVlW:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.el-autocomplete[data-v-eb429b16] {\n  width: 100%;\n}\n.search-wrap[data-v-eb429b16] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.search-input[data-v-eb429b16] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-right: 20px;\n}\n#map_container[data-v-eb429b16] {\n  margin-top: 30px;\n  height: 300px;\n}\n",""])},dioa:function(e,t,a){"use strict";t.c=function(e){return Object(r.a)({url:"/admin/hotel/getHotelList",method:"post",data:e})},t.a=function(e){return Object(r.a)({url:"/admin/hotel/delHotel",method:"post",data:e})},t.b=function(e){return Object(r.a)({url:"/admin/hotel/getHotelInfo",method:"post",data:e})},t.d=function(e){return Object(r.a)({url:"/admin/hotel/updateHtInfo",method:"post",data:e})},t.e=function(e){return Object(r.a)({url:"/admin/hotel/updateHtRate",method:"post",data:e})};var r=a("vLgD")},eJDu:function(e,t,a){var r=a("bVlW");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("713858c4",r,!0)},f6yI:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.box-card[data-v-f32e2738] {\n  margin-bottom: 40px;\n}\n.address button[data-v-f32e2738] {\n  margin-left: 20px;\n}\n.upload-wrap[data-v-f32e2738] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.upload-wrap .upload-text[data-v-f32e2738] {\n    font-size: 14px;\n    color: #606266;\n    font-weight: 700;\n}\n.upload-wrap .upload-inner[data-v-f32e2738] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    margin-left: 15px;\n}\n.upload-wrap .avatar-uploader-icon[data-v-f32e2738] {\n    width: 100px;\n    height: 100px;\n    line-height: 100px;\n}\n.upload-wrap .avatar[data-v-f32e2738] {\n    width: 100px;\n    height: 100px;\n    display: block;\n}\n.upload-wrap .format-tip[data-v-f32e2738] {\n    color: #606266;\n    font-size: 13px;\n    margin-top: 20px;\n}\n.upload-wrap .avatar-uploader[data-v-f32e2738] .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.upload-wrap .avatar-uploader[data-v-f32e2738] .el-upload:hover {\n      border-color: #409EFF;\n}\n.line[data-v-f32e2738] {\n  border-bottom: 1px solid #ebeef5;\n  margin-bottom: 20px;\n}\n.percent-tip[data-v-f32e2738] {\n  font-size: 14px;\n}\n.percent-tip[data-v-f32e2738]:not(:first-child) {\n    margin-left: 40px;\n}\n.rate-row[data-v-f32e2738] {\n  margin-bottom: 14px;\n}\n.input-number-percent[data-v-f32e2738] {\n  margin: 0 5px;\n}\n.tip[data-v-f32e2738] {\n  color: #606266;\n  font-size: 14px;\n  line-height: 16px;\n  padding-left: 60px;\n}\n.tip[data-v-f32e2738]:first-of-type {\n    margin-top: 30px;\n}\n.url-wrap[data-v-f32e2738] {\n  padding: 0 20px;\n  font-size: 14px;\n}\n.qrcode-img img[data-v-f32e2738] {\n  width: 200px;\n  height: 200px;\n}\n.url-item[data-v-f32e2738] button:first-of-type {\n  margin-left: 15px;\n}\n",""])},gRXA:function(e,t,a){var r=a("f6yI");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("d81ce4b2",r,!0)},mClu:function(e,t,a){var r=a("kM2E");r(r.S+r.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},tiXV:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={data:function(){return{input:"",map:null,mapSearch:null,selectItem:null,geocoder:null}},methods:{onClose:function(){this.$emit("closeDialog",null)},querySearch:function(e,t){var a=this;this.mapSearch||(this.mapSearch=new BMap.LocalSearch(this.map,{onSearchComplete:function(e){t(a.searchFilterBack(e))},pageCapacity:50})),this.mapSearch.search(e)},handleSelect:function(e){var t=this;this.geocoder.getLocation(e.point,function(e){console.log(e),t.selectItem=e,t.map.clearOverlays();var a=new BMap.Point(e.point.lng,e.point.lat);t.map.centerAndZoom(a,15);var r=new BMap.Marker(a);t.map.addOverlay(r)})},onSubmit:function(){null!=this.selectItem?this.$emit("closeDialog",this.selectItem):this.$message.error("请输入地址并点击下拉地址进行选择定位")},searchFilterBack:function(e){var t=[];for(var a in e)if("[object Array]"==Object.prototype.toString.call(e[a])&&e[a].length>0){e[a][0].point&&(t=e[a]);break}return t}},mounted:function(){var e=this,t=this;this.$nextTick(function(){e.map=new BMap.Map("map_container");var a=new BMap.Geolocation;e.geocoder=new BMap.Geocoder,a.getCurrentPosition(function(e){if(this.getStatus()==BMAP_STATUS_SUCCESS){var a=e.point;t.map.centerAndZoom(new BMap.Point(a.lng,a.lat),15)}}),e.map.enableScrollWheelZoom()})}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"地图选址",visible:!0},on:{close:e.onClose}},[a("div",{staticClass:"search-wrap"},[a("div",{staticClass:"search-input"},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入地址","trigger-on-focus":!1,valueKey:"title"},on:{select:e.handleSelect},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}})],1),e._v(" "),a("div",{staticClass:"search-btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("确定")])],1)]),e._v(" "),a("div",{attrs:{id:"map_container"}})])},staticRenderFns:[]};var s=a("VU/8")(r,n,!1,function(e){a("eJDu")},"data-v-eb429b16",null);t.default=s.exports}});