webpackJsonp([42],{"B+Ea":function(e,t,i){(e.exports=i("FZ+f")(!1)).push([e.i,'\n.percent-tip[data-v-6f1f2100] {\n  font-size: 14px;\n}\n.percent-tip[data-v-6f1f2100]:last-of-type {\n    margin-left: 40px;\n}\n.input-number-percent[data-v-6f1f2100] {\n  margin: 0 5px;\n}\n.divide-form-inline[data-v-6f1f2100] {\n  margin: 24px 0;\n}\n.edit-input[data-v-6f1f2100] {\n  padding-right: 100px;\n}\n.cancel-btn[data-v-6f1f2100] {\n  position: absolute;\n  right: 15px;\n  top: 10px;\n}\n.tinymce-container[data-v-6f1f2100] {\n  position: relative;\n}\n.tinymce-textarea[data-v-6f1f2100] {\n  visibility: hidden;\n  z-index: -1;\n}\n.editor-custom-btn-container[data-v-6f1f2100] {\n  position: absolute;\n  right: 15px;\n  /*z-index: 2005;*/\n  top: 18px;\n}\n.editor-upload-btn[data-v-6f1f2100] {\n  display: inline-block;\n}\n.container[data-v-6f1f2100] .version-top {\n  padding: 8px 0;\n}\n.container[data-v-6f1f2100] .el-collapse-item__header {\n  height: auto;\n  line-height: 1;\n}\n.container[data-v-6f1f2100] .el-collapse-item__content {\n  padding-bottom: 0;\n}\n.container[data-v-6f1f2100] .el-collapse-item__arrow {\n  font-size: 20px;\n}\n.version-top .el-icon-edit[data-v-6f1f2100] {\n  font-size: 20px;\n  float: right;\n  margin-top: 4px;\n  margin-right: 8px;\n}\n.version[data-v-6f1f2100] {\n  line-height: 24px;\n  margin: 5px 0;\n  font-size: 24px;\n  font-weight: normal;\n}\n.v_time[data-v-6f1f2100] {\n  margin-left: 20px;\n  color: #a2a1a1;\n}\n.desc[data-v-6f1f2100] {\n  line-height: 20px;\n  font-size: 16px;\n  margin: 0 0 8px;\n}\n.subversion-list[data-v-6f1f2100] {\n  padding: 10px 0 10px 40px;\n}\n.subverison-item[data-v-6f1f2100] {\n  padding: 0 10px 10px 10px;\n  background-color: #fbfbfb;\n  position: relative;\n}\n.subverison-item[data-v-6f1f2100]::after {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 1px;\n    background-color: #f1f1f1;\n    content: "";\n}\n.tooltip-custom[data-v-6f1f2100] {\n  max-width: 300px;\n}\n.tooltip-custom p[data-v-6f1f2100] {\n    margin: 0;\n    line-height: 1.4;\n}\n.upload-demo[data-v-6f1f2100] {\n  float: right;\n  margin-left: 10px;\n}\n.time-wrap[data-v-6f1f2100] {\n  float: right;\n  margin-left: 8px;\n  color: #939393;\n  position: relative;\n  font-size: 14px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n',""])},bmN4:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("woOf"),o=i.n(n),s=i("Dd8w"),a=i.n(s),l=(i("ms7A"),i("NYxO")),r=i("mM5X"),c={name:"systemVersionUser",data:function(){return{loading:!1,fileList:[],globalFileList:[],headers:{},params:{page:1,pageSize:10,beginT:"",endT:"",type:1},formInline:{type:1,v_id:0,version_ids:"",versionIds:[],is_online:"",is_force_update:"",version_num:"",title:"",content:"",online_time:"",notes:"",file:"",update_file_url:"",update_type:"0"},dialogFormVisible:!1,value:"",toolbar:["removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code","bold italic blockquote | h2 p  media link | alignleft aligncenter alignright"],menubar:"",height:260,hasChange:!1,hasInit:!1,edit:!1,editVersion:"",versionType:1,formRules:{version_ids:[{required:!0,trigger:"blur",message:"请选择更新类别"}],title:[{required:!0,trigger:"blur",message:"请填写更新标题"}],content:[{required:!0,trigger:"blur",message:"请填写更新内容"}],is_online:[{required:!0,trigger:"blur",message:"请选择是否上线版本"}],is_force_update:[{required:!0,trigger:"blur",message:"请选择是否强制刷新"}],online_time:[{required:!0,trigger:"blur",message:"请填写上线时间"}],file:[{required:!0,trigger:"blur",message:"请上传zip文件"}],update_type:[{required:!0,trigger:"blur",message:"请选择更新类型"}]},total:0,versions:[],lastVersion:"",exeForm:{url:"",upload_time:""},pickerOptions:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}}}},created:function(){this.getData(),this.getNewestPackage()},mounted:function(){this.headers={tId:this.token}},watch:{value:function(e){var t=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(t.tinymceId).setContent(e)})},dialogFormVisible:function(e){var t=this;e&&this.$nextTick(function(){t.initTinymce()})}},computed:a()({title:function(){return!0===this.edit?"版本编辑":"版本添加"}},Object(l.b)(["token"])),methods:{checkIfOnline:function(e,t){return console.log(this.fileList[0]),"1"==e&&new Date(t)<Date.now()},limitFileSize:function(e){var t=e.size/1024/1024<500;if(console.log("filesize:"+e.size/1024/1024),!t)return this.$message({message:"上传文件必须小于500M",type:"warning"}),!1},getNewestPackage:function(){var e=this;Object(r.d)().then(function(t){Array.isArray(t.data.result)&&(e.exeForm=t.data.result[0])})},handleZipExeSuccess:function(e,t,i){this.$message({message:"上传成功",type:"success"}),this.exeForm=e.result},handleZipSuccess:function(e,t,i){this.$message({message:"上传成功",type:"success"}),this.formInline.file=e.result,this.formInline.update_file_url=e.result,this.fileList=[{name:this.filterExtension(e.result),url:e.result}]},resetFormValue:function(){this.formInline={type:1,v_id:0,version_ids:"",versionIds:[],is_online:"",is_force_update:"",version_num:"",title:"",content:"",online_time:"",notes:"",file:"",update_file_url:"",update_type:"0"},this.$refs.updateForm.resetFields(),this.fileList=[]},updateVersion:function(){var e=this;this.formInline.file=this.formInline.update_file_url,"0"==this.formInline.is_online&&(this.formInline.online_time=""),this.$refs.updateForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.formInline.version_ids=e.formInline.versionIds.join(",");var i=r.a;e.edit&&(i=r.c),console.log(e.formInline),i(e.formInline).then(function(t){e.dialogFormVisible=!1,e.getData(),e.getNewestPackage()})})},showDialog:function(e,t,i){if(this.formInline.v_id=i||0,console.log(this.formInline.v_id),this.dialogFormVisible=!0,this.edit=e,this.versionType=t,1===t){var n=this.lastVersion.split(".");n[0]=1+~~n[0],n[1]=0,n[2]=0,this.formInline.version_num=n.join(".")}else this.formInline.version_num=this.lastVersion},showEditDialog:function(e,t,i){var n=this;this.formInline.v_id=t,this.dialogFormVisible=!0,this.edit=e,this.versionType=i,Object(r.b)({v_id:t}).then(function(e){console.log(e),e.data.result.data.versionIds=e.data.result.data.version_ids.map(function(e){return~~e}),e.data.result.data.online_time=n.$options.filters.formatDateTime(e.data.result.data.online_time),n.formInline=o()({},n.formInline,e.data.result.data);var t=e.data.result.data.update_file_url;t&&n.fileList.push({name:n.filterExtension(t),url:t})})},filterExtension:function(e){return e.substring(e.lastIndexOf("/")+1)},versionChange:function(e){var t=this.editVersion.split(".");-1!=e.indexOf(1)&&(t[1]=1+~~t[1]),e.filter(function(e){return[2].indexOf(e)>-1}).length>0&&(t[2]=1+~~t[2]),this.formInline.version_num=t.join(".")},getData:function(){var e=this;this.loading=!0,Object(r.f)(this.params).then(function(t){e.versions=t.data.result.data,e.versions[0]?(e.versions[0].next_version.length>0?e.lastVersion=e.versions[0].next_version[0].version_num:e.lastVersion=e.versions[0].version_num,e.editVersion=e.lastVersion):(e.lastVersion="0.0.0",e.editVersion=e.lastVersion),e.loading=!1,e.total=t.data.result.total})},handleSizeChange:function(e){this.params.pageSize=e,this.getData()},handleCurrentChange:function(e){this.params.page=e,this.getData(),console.log("当前页: "+e)},initTinymce:function(){var e=this;if(this.hasInit)return!1;var t=this;window.tinymce.init({selector:"#view",height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar,menubar:this.menubar,plugins:"advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools",end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["wpimg.wallstcn.com","wallstreetcn.com"],imagetools_toolbar:"watermark",default_link_target:"_blank",link_title:!1,init_instance_callback:function(i){t.value&&i.setContent(t.value),t.hasInit=!0,i.on("NodeChange Change KeyUp",function(){e.hasChange=!0,e.$emit("input",i.getContent({format:"raw"}))})}})},destroyTinymce:function(){window.tinymce.get(this.tinymceId)&&window.tinymce.get(this.tinymceId).destroy()},setContent:function(e){window.tinymce.get(this.tinymceId).setContent(e)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},handleRemove:function(e,t){console.log(e,t)},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")}},destroyed:function(){this.destroyTinymce()}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"container"},[i("el-row",{staticStyle:{"margin-bottom":"10px"}},[e.exeForm.create_time?i("div",{staticClass:"time-wrap"},[i("div",[e._v("上传时间："+e._s(e.exeForm.create_time))]),i("div",{staticClass:"time"},[e._v(e._s(e.exeForm.filename))])]):e._e(),e._v(" "),i("el-upload",{staticClass:"upload-demo",attrs:{accept:"application/zip",headers:e.headers,"file-list":e.globalFileList,"show-file-list":!1,action:e._f("uploadPrefixUrl")("/admin/file_upload/uploadClientExe"),limit:1,"on-success":e.handleZipExeSuccess}},[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.globalFileList=[]}}},[e._v("点击上传")])],1),e._v(" "),i("div",{staticStyle:{float:"right"}},[e._v("牛霸最新安装包："),e.exeForm.url?i("a",{attrs:{href:e.exeForm.url,download:"niuba.zip"}},[i("el-button",{attrs:{type:"primary",plain:""}},[e._v("下载")])],1):i("el-button",{attrs:{type:"primary",plain:"",disabled:!0}},[e._v("下载")])],1)],1),e._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},nativeOn:{click:function(t){e.showDialog(!1,1)}}},[e._v("新增主版本")]),e._v(" "),i("el-tooltip",{attrs:{placement:"right"}},[i("div",{staticClass:"tooltip-custom",attrs:{slot:"content"},slot:"content"},[e.versions&&e.versions.length>0?i("p",[e._v("V"+e._s(e.versions[0].version_num))]):e._e(),e._v(" "),i("p",[e._v("第一位：主版本号，表示客户端大版本更新，新增的次版本都基于此")]),e._v(" "),i("p",[e._v("第二位、第三位：次版本号，第二位标识客户端更新，第三位表示大屏幕端更新")])]),e._v(" "),i("i",{staticClass:"el-icon-question"})]),e._v(" "),i("el-collapse",{staticStyle:{"margin-top":"20px"},attrs:{accordion:""}},e._l(e.versions,function(t,n){return i("el-collapse-item",{key:n},[i("template",{slot:"title"},[i("div",[i("div",{staticClass:"version-top"},[i("span",{staticClass:"version"},[e._v("V"+e._s(t.version_num))]),i("span",{staticClass:"v_time"},[e._v("创建时间："+e._s(e.$options.filters.formatDateTime(t.create_time)))]),i("i",{staticClass:"el-icon-edit",on:{click:function(i){i.stopPropagation(),e.showEditDialog(!0,t.id,1)}}})]),e._v(" "),i("p",{staticClass:"desc"},[e._v(e._s(t.title))])])]),e._v(" "),i("div",{staticClass:"subversion-list"},[i("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"primary",icon:"el-icon-edit"},nativeOn:{click:function(i){e.showDialog(!1,2,t.id)}}},[e._v("新增次版本")]),e._v(" "),e._l(t.next_version,function(t,n){return i("div",{key:n,staticClass:"subverison-item"},[i("div",{staticClass:"version-top"},[i("span",{staticClass:"version"},[e._v("V"+e._s(t.version_num))]),i("span",{staticClass:"v_time"},[e._v("创建时间："+e._s(e.$options.filters.formatDateTime(t.create_time)))]),i("i",{staticClass:"el-icon-edit",on:{click:function(i){i.stopPropagation(),e.showEditDialog(!0,t.id,2)}}})]),e._v(" "),i("p",{staticClass:"desc"},[e._v(e._s(t.title))])])})],2)],2)})),e._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),i("el-dialog",{attrs:{title:e.title,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.resetFormValue}},[i("el-form",{ref:"updateForm",attrs:{model:e.formInline,"label-width":"120px","status-icon":"",rules:e.formRules}},[2==e.versionType?i("el-form-item",{attrs:{label:"版本更新类别",prop:"versionIds"}},[i("el-checkbox-group",{attrs:{disabled:e.edit},on:{change:e.versionChange},model:{value:e.formInline.versionIds,callback:function(t){e.$set(e.formInline,"versionIds",t)},expression:"formInline.versionIds"}},[i("el-checkbox",{attrs:{label:1}},[e._v("客户端")]),e._v(" "),i("el-checkbox",{attrs:{label:2}},[e._v("大屏幕端")])],1)],1):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"版本号"}},[e._v(e._s(e.formInline.version_num))]),e._v(" "),i("el-form-item",{attrs:{label:"更新标题",prop:"title"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"有新版本更新啦！"},model:{value:e.formInline.title,callback:function(t){e.$set(e.formInline,"title",t)},expression:"formInline.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"更新内容",prop:"content"}},[i("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.formInline.content,callback:function(t){e.$set(e.formInline,"content",t)},expression:"formInline.content"}})],1),e._v(" "),-1==e.formInline.versionIds.indexOf(1)&&e.formInline.v_id&&1!=e.versionType?e._e():i("el-form-item",{attrs:{label:"升级文件",prop:"file"}},[e.checkIfOnline(e.formInline.is_online,e.formInline.online_time)?[e._v(e._s(e.fileList[0]&&e.fileList[0].name))]:i("el-upload",{attrs:{accept:"application/zip",headers:e.headers,action:e._f("uploadPrefixUrl")("/admin/file_upload/uploadUpdate"),"file-list":e.fileList,"before-upload":e.limitFileSize,"on-success":e.handleZipSuccess}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传ZIP文件")])],1)],2),e._v(" "),i("el-form-item",{attrs:{label:"是否上线版本",prop:"is_online"}},[i("el-radio",{attrs:{label:"1"},model:{value:e.formInline.is_online,callback:function(t){e.$set(e.formInline,"is_online",t)},expression:"formInline.is_online"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"0"},model:{value:e.formInline.is_online,callback:function(t){e.$set(e.formInline,"is_online",t)},expression:"formInline.is_online"}},[e._v("否")])],1),e._v(" "),i("el-form-item",{attrs:{label:"是否强制更新",prop:"is_force_update"}},[i("el-radio",{attrs:{label:"1"},model:{value:e.formInline.is_force_update,callback:function(t){e.$set(e.formInline,"is_force_update",t)},expression:"formInline.is_force_update"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"0"},model:{value:e.formInline.is_force_update,callback:function(t){e.$set(e.formInline,"is_force_update",t)},expression:"formInline.is_force_update"}},[e._v("否")])],1),e._v(" "),i("el-form-item",{attrs:{label:"更新类型",prop:"is_force_update"}},[i("el-radio",{attrs:{label:"0"},model:{value:e.formInline.update_type,callback:function(t){e.$set(e.formInline,"update_type",t)},expression:"formInline.update_type"}},[e._v("主程序")]),e._v(" "),i("el-radio",{attrs:{label:"1"},model:{value:e.formInline.update_type,callback:function(t){e.$set(e.formInline,"update_type",t)},expression:"formInline.update_type"}},[e._v("更新程序")])],1),e._v(" "),"0"!=e.formInline.is_online?i("el-form-item",{attrs:{label:"上线时间",prop:"online_time"}},[i("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间","value-format":"yyyy-MM-dd HH:mm:ss","picker-options":e.pickerOptions},model:{value:e.formInline.online_time,callback:function(t){e.$set(e.formInline,"online_time",t)},expression:"formInline.online_time"}})],1):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"备注信息",prop:"notes"}},[i("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入备注内容"},model:{value:e.formInline.notes,callback:function(t){e.$set(e.formInline,"notes",t)},expression:"formInline.notes"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.updateVersion}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var f=i("VU/8")(c,d,!1,function(e){i("zpiy")},"data-v-6f1f2100",null);t.default=f.exports},zpiy:function(e,t,i){var n=i("B+Ea");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i("rjj0")("643dbd4d",n,!0)}});