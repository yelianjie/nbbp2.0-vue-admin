webpackJsonp([11,20],{"+uLS":function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.thumb-placeholder[data-v-fcfece70] {\n  background-color: transparent;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.upload-item-enter-active[data-v-fcfece70], .upload-item-leave-active[data-v-fcfece70] {\n  -webkit-transition: all 1s;\n  transition: all 1s;\n}\n.upload-item-enter[data-v-fcfece70], .upload-item-leave-to[data-v-fcfece70] {\n  opacity: 0;\n  -webkit-transform: translateY(-30px);\n          transform: translateY(-30px);\n}\n",""])},ANK3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("//Fk"),i=a.n(s),o=a("Dd8w"),l=a.n(o),n=a("aPlh"),r=a("NYxO"),d=a("R6zh");function c(e){return e?-1!==e.indexOf("http")?e:a("rBKV").BASE_API.replace(/"/g,"")+e:""}var u={name:"bigScreenManage",computed:l()({},Object(r.b)(["token"])),data:function(){return{dialogFormVisible:!1,loading:!0,textarea:"",ad:{bigImgUrl:"",mobileImgUrl:""},picBgs:[],videoBgs:[],headers:{},form:{},formMp4:{fid:"",id:""},selectedMp4:-1,dialogMp4s:[],mp4s:[]}},created:function(){var e=this,t=d.g(),a=d.d(),s=d.f(),o=d.c(),l=d.e();i.a.all([t,a,s,o,l]).then(function(t){var a=t[0].data,s=t[1].data,i=t[2].data,o=t[3].data,l=t[4].data;console.log(o),Array.isArray(a.result)&&(e.textarea=a.result[0].content),Array.isArray(s.result)&&(s.result.forEach(function(e){e.url=c(e.url)}),e.picBgs=s.result),Array.isArray(i.result)&&(i.result.forEach(function(e){e.url=c(e.url)}),e.videoBgs=i.result),Array.isArray(o.result)&&o.result.forEach(function(t){t.url=c(t.url),console.log(t.url),1==t.type&&0==~~t.ht_id?e.ad.mobileImgUrl=t.url:2==t.type&&0==~~t.ht_id&&(e.ad.bigImgUrl=t.url)}),Array.isArray(l.result)&&(l.result.forEach(function(e){e.url=c(e.url)}),e.mp4s=l.result),e.loading=!1}).catch(function(t){e.loading=!1,e.$message.error(t.message)})},mounted:function(){this.headers={tId:this.token}},methods:{saveNotice:function(){var e=this;d.b({content:this.textarea}).then(function(t){e.$message.success("更新成功")})},handleProgress:function(e,t,a){console.log(e,t)},beforeVideoUpload:function(e){var t=e.size/1024/1024<10;return t||this.$message.error("上传视频大小不能超过 10MB"),t},beforeImageUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传视频大小不能超过 2MB"),t},handleMp4Remove:function(e,t){var a=this;this.$confirm("确定删除该资源吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=a.dialogMp4s[e].id;d.h({id:t}).then(function(t){a.dialogMp4s.splice(e,1),a.$message({type:"success",message:"删除成功!"})}).catch(function(e){a.$message({type:"error",message:e.msg})})})},handleMp4sRemove:function(e,t){var a=this;this.$confirm("确定删除该资源吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=a.mp4s[e].id;d.h({id:t}).then(function(t){a.mp4s.splice(e,1),a.$message({type:"success",message:"删除成功!"})}).catch(function(e){a.$message({type:"error",message:e.msg})})})},handleRemove:function(e,t){var a=this;console.log(e),this.$confirm("确定删除该资源吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var s=1==Number(t)?a.picBgs[e].id:a.videoBgs[e].id;d.h({id:s}).then(function(s){1==Number(t)?a.picBgs.splice(e,1):a.videoBgs.splice(e,1),a.$message({type:"success",message:"删除成功!"})}).catch(function(e){a.$message({type:"error",message:e.msg})})})},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleImageSuccess:function(e,t,a){console.log(e),this.picBgs.push({url:t.url,id:e.result,type:1})},handleVideoSuccess:function(e,t,a){console.log(t),this.videoBgs.push({url:t.url,id:e.result,type:2})},handleVideoMp4Success:function(e,t,a){this.formMp4.id=e.result,this.dialogMp4s=[],this.dialogMp4s.push({url:t.url,id:e.result,type:2})},handleBigImgSuccess:function(e,t){this.ad.bigImgUrl=URL.createObjectURL(t.raw),this.$message({type:"success",message:"上传成功"})},handleMobileImgSuccess:function(e,t){this.ad.mobileImgUrl=URL.createObjectURL(t.raw),this.$message({type:"success",message:"上传成功"})},beforeBigImgUpload:function(e){var t=e.size/1024<300;return t||this.$message.error("上传图片大小不能超过 300K!"),t},beforeMobileImgUpload:function(e){var t=e.size/1024<100;return t||this.$message.error("上传图片大小不能超过 100K!"),t},choseParentId:function(e){this.selectedMp4===e?this.selectedMp4=-1:this.selectedMp4=e},addMp4:function(){var e=this;if(-1===this.selectedMp4)return this.$message.error("请选择关联视频"),!1;this.formMp4.fid=this.videoBgs[this.selectedMp4].id,d.a(this.formMp4).then(function(t){e.mp4s.push(e.dialogMp4s[0]),e.$message({type:"success",message:"添加成功!"}),e.dialogFormVisible=!1})},onDialogClose:function(){this.dialogMp4s=[]}},components:{UploadPreview:n.default}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("平台公告")])]),e._v(" "),a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"请输入内容"},model:{value:e.textarea,callback:function(t){e.textarea=t},expression:"textarea"}}),e._v(" "),a("div",{staticStyle:{"text-align":"right","margin-top":"20px"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveNotice}},[e._v("确定")])],1)],1),e._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("背景添加")])]),e._v(" "),a("div",{staticClass:"row-flex flex-align-center"},[a("h3",{staticClass:"bg-title flex-1"},[e._v("图片背景")]),e._v(" "),a("el-upload",{attrs:{accept:"image/*",headers:e.headers,data:{type:1},action:e._f("uploadPrefixUrl")("/admin/file_upload/uploadBg"),"show-file-list":!1,"before-upload":e.beforeImageUpload,"on-progress":e.handleProgress,"on-success":e.handleImageSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),e._v(" "),a("el-row",{staticClass:"row-flex"},[a("upload-preview",{attrs:{list:e.picBgs,type:"image","on-remove":e.handleRemove}})],1),e._v(" "),a("div",{staticClass:"row-flex flex-align-center"},[a("h3",{staticClass:"bg-title flex-1"},[e._v("视频背景")]),e._v(" "),a("el-upload",{attrs:{accept:"video/*",headers:e.headers,data:{type:2},action:e._f("uploadPrefixUrl")("/admin/file_upload/uploadBg"),"show-file-list":!1,"before-upload":e.beforeVideoUpload,"on-progress":e.handleProgress,"on-success":e.handleVideoSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),e._v(" "),a("el-row",{staticClass:"row-flex"},[a("upload-preview",{attrs:{list:e.videoBgs,type:"video","on-remove":e.handleRemove}})],1),e._v(" "),a("div",{staticClass:"row-flex flex-align-center"},[a("h3",{staticClass:"bg-title flex-1"},[e._v("手机视频背景")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加视频")])],1),e._v(" "),a("el-row",{staticClass:"row-flex"},[a("upload-preview",{attrs:{list:e.mp4s,type:"video","on-remove":e.handleMp4sRemove}})],1)],1),e._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("广告图设置")])]),e._v(" "),a("el-row",[a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("p",[e._v("大屏幕端：")]),e._v(" "),a("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",headers:e.headers,data:{type:2},action:e._f("uploadPrefixUrl")("/admin/file_upload/uploadAdvert"),"list-type":"picture-card","show-file-list":!1,"before-upload":e.beforeImageUpload,"on-progress":e.handleProgress,"on-success":e.handleBigImgSuccess}},[e.ad.bigImgUrl?a("img",{staticClass:"avatar",attrs:{src:e.ad.bigImgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),a("p",{staticClass:"tip"},[e._v("支持jpg、png等格式 建议尺寸大小：1920*1080")])],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("p",[e._v("手机端：")]),e._v(" "),a("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",headers:e.headers,data:{type:1},action:e._f("uploadPrefixUrl")("/admin/file_upload/uploadAdvert"),"list-type":"picture-card","show-file-list":!1,"before-upload":e.beforeImageUpload,"on-progress":e.handleProgress,"on-success":e.handleMobileImgSuccess}},[e.ad.mobileImgUrl?a("img",{staticClass:"avatar",attrs:{src:e.ad.mobileImgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),a("p",{staticClass:"tip"},[e._v("支持jpg、png等格式，建议尺寸：1080 × 1920 或 720 × 1280")])],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加手机视频",visible:e.dialogFormVisible,width:"80%"},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.onDialogClose}},[a("el-form",{attrs:{model:e.formMp4,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"选择关联的视频"}},[a("el-row",{staticStyle:{"margin-left":"0","font-size":"0"},attrs:{gutter:20}},e._l(e.videoBgs,function(t,s){return a("div",{key:s,staticClass:"video-preivew",on:{click:function(t){e.choseParentId(s)}}},[a("label",{directives:[{name:"show",rawName:"v-show",value:e.selectedMp4===s,expression:"selectedMp4 === i"}],staticClass:"status-label"},[a("i",{staticClass:"el-icon-upload-success el-icon-check"})]),e._v(" "),a("video",{staticClass:"video",attrs:{src:t.url}})])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"MP4视频"}},[a("upload-preview",{attrs:{list:e.dialogMp4s,type:"video","on-remove":e.handleMp4Remove}}),e._v(" "),a("el-upload",{attrs:{accept:"video/*",headers:e.headers,data:{type:2},action:e._f("uploadPrefixUrl")("/admin/file_upload/uploadBg"),"show-file-list":!1,"before-upload":e.beforeVideoUpload,"on-progress":e.handleProgress,"on-success":e.handleVideoMp4Success}},[0==e.dialogMp4s.length?a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]):e._e()],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addMp4}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var g=a("VU/8")(u,p,!1,function(e){a("MNQ4")},"data-v-3d56d813",null);t.default=g.exports},CQW3:function(e,t,a){var s=a("+uLS");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("6c611b8c",s,!0)},MNQ4:function(e,t,a){var s=a("SXUp");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("0bfd0f35",s,!0)},OmiB:function(e,t){e.exports="data:image/png;base64,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"},R6zh:function(e,t,a){"use strict";t.b=function(e){return Object(s.a)({url:"/admin/hotel/addNotice",method:"post",data:e})},t.h=function(e){return Object(s.a)({url:"/admin/file_upload/delBg",method:"post",data:e})},t.g=function(){return Object(s.a)({url:"/admin/hotel/getNotice",method:"post"})},t.d=function(){return Object(s.a)({url:"/admin/file_upload/getBgPic",method:"post"})},t.f=function(){return Object(s.a)({url:"/admin/file_upload/getBgVideo",method:"post"})},t.c=function(){return Object(s.a)({url:"/admin/file_upload/getAdvert",method:"post"})},t.a=function(e){return Object(s.a)({url:"/admin/file_upload/updatePhoneBg",method:"post",data:e})},t.e=function(e){return Object(s.a)({url:"/admin/file_upload/getPhoneBgVideo",method:"post",data:e})};var s=a("vLgD")},SXUp:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.container[data-v-3d56d813] .el-upload-list__item:hover {\n  background: transparent;\n}\n.el-card[data-v-3d56d813] {\n  margin-bottom: 60px;\n}\n.tip[data-v-3d56d813] {\n  color: #c3c3c3;\n  font-size: 14px;\n}\n.avatar-uploader[data-v-3d56d813] .el-upload {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.avatar-uploader[data-v-3d56d813] .el-upload:hover {\n    border-color: #409EFF;\n}\n.avatar-uploader-icon[data-v-3d56d813] {\n  font-size: 28px;\n  color: #8c939d;\n  width: 148px;\n  height: 148px;\n  line-height: 148px;\n  text-align: center;\n}\n.avatar[data-v-3d56d813] {\n  width: 148px;\n  height: 148px;\n  display: block;\n}\n.row-flex[data-v-3d56d813] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flex-align-center[data-v-3d56d813] {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.flex-1[data-v-3d56d813] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.bg-title[data-v-3d56d813] {\n  font-weight: normal;\n  font-size: 15px;\n  color: #6c6c6c;\n}\n.video-preivew[data-v-3d56d813] {\n  position: relative;\n  width: 148px;\n  height: 148px;\n  overflow: hidden;\n  margin-right: 20px;\n  margin-bottom: 20px;\n  border-radius: 6px;\n  display: inline-block;\n}\n.video-preivew .status-label[data-v-3d56d813] {\n    position: absolute;\n    right: -15px;\n    top: -6px;\n    width: 40px;\n    height: 24px;\n    background: #13ce66;\n    text-align: center;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n    -webkit-box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);\n    box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);\n    z-index: 1;\n}\n.video-preivew .status-label i[data-v-3d56d813] {\n      font-size: 12px;\n      margin-top: 11px;\n      -webkit-transform: rotate(-45deg);\n      transform: rotate(-45deg);\n      color: #fff;\n}\n.video[data-v-3d56d813] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  position: absolute;\n  left: 0;\n  top: 0;\n  display: block;\n}\n",""])},aPlh:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("DJEL"),i=a("OmiB"),o=a.n(i),l=(a("R6zh"),{data:function(){return{placeHolder:o.a}},props:["list","onRemove","type"],methods:{previewFile:function(e){console.log(this.list),"image"===this.type?Object(s.a)({el:document.getElementById(this.type+"_file_"+e),imgSrc:this.list[e].url}):Object(s.a)({el:document.getElementById(this.type+"_file_"+e),vidSrc:this.list[e].url})},deleteFile:function(e,t){this.onRemove(e,t)}}}),n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("transition-group",{staticClass:"el-upload-list el-upload-list--picture-card",staticStyle:{display:"block"},attrs:{name:"upload-item",tag:"div"}},e._l(e.list,function(t,i){return s("div",{key:i,staticClass:"el-upload-list__item is-success",attrs:{tabindex:"0"}},["image"==e.type?s("img",{staticClass:"el-upload-list__item-thumbnail thumb-placeholder",style:{"background-image":"url("+t.url+")"},attrs:{src:a("elFe"),id:"image_file_"+i}}):e._e(),e._v(" "),"video"==e.type?s("video",{staticClass:"el-upload-list__item-thumbnail thumb-placeholder",staticStyle:{"object-fit":"cover"},attrs:{src:e._f("uploadPrefixUrl")(t.url),id:"video_file_"+i}}):e._e(),e._v(" "),s("a",{staticClass:"el-upload-list__item-name"},[s("i",{staticClass:"el-icon-document"}),e._v("timg.jpg")]),e._v(" "),s("label",{staticClass:"el-upload-list__item-status-label"},[s("i",{staticClass:"el-icon-upload-success el-icon-check"})]),e._v(" "),s("i",{staticClass:"el-icon-close"}),s("i",{staticClass:"el-icon-close-tip"},[e._v("按 delete 键可删除")]),e._v(" "),s("span",{staticClass:"el-upload-list__item-actions"},[s("span",{staticClass:"el-upload-list__item-preview",on:{click:function(t){e.previewFile(i)}}},[s("i",{staticClass:"el-icon-zoom-in"})]),e._v(" "),s("span",{staticClass:"el-upload-list__item-delete",on:{click:function(a){e.deleteFile(i,t.type)}}},[s("i",{staticClass:"el-icon-delete"})])])])}))},staticRenderFns:[]};var r=a("VU/8")(l,n,!1,function(e){a("CQW3")},"data-v-fcfece70",null);t.default=r.exports},elFe:function(e,t){e.exports="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}});