webpackJsonp([36],{"5pOp":function(e,t,n){(e.exports=n("BkJT")(!1)).push([e.i,"\n.el-autocomplete[data-v-eb429b16] {\n  width: 100%;\n}\n.search-wrap[data-v-eb429b16] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.search-input[data-v-eb429b16] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-right: 20px;\n}\n#map_container[data-v-eb429b16] {\n  margin-top: 30px;\n  height: 300px;\n}\n",""])},"5xCH":function(e,t,n){var a=n("5pOp");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("6480874c",a,!0)},tiXV:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{input:"",map:null,mapSearch:null,selectItem:null,geocoder:null}},methods:{onClose:function(){this.$emit("closeDialog",null)},querySearch:function(e,t){var n=this;this.mapSearch||(this.mapSearch=new BMap.LocalSearch(this.map,{onSearchComplete:function(e){t(n.searchFilterBack(e))},pageCapacity:50})),this.mapSearch.search(e)},handleSelect:function(e){var t=this;this.geocoder.getLocation(e.point,function(e){console.log(e),t.selectItem=e,t.map.clearOverlays();var n=new BMap.Point(e.point.lng,e.point.lat);t.map.centerAndZoom(n,15);var a=new BMap.Marker(n);t.map.addOverlay(a)})},onSubmit:function(){null!=this.selectItem?this.$emit("closeDialog",this.selectItem):this.$message.error("请输入地址并点击下拉地址进行选择定位")},searchFilterBack:function(e){var t=[];for(var n in e)if("[object Array]"==Object.prototype.toString.call(e[n])&&e[n].length>0){e[n][0].point&&(t=e[n]);break}return t}},mounted:function(){var e=this,t=this;this.$nextTick(function(){e.map=new BMap.Map("map_container");var n=new BMap.Geolocation;e.geocoder=new BMap.Geocoder,n.getCurrentPosition(function(e){if(this.getStatus()==BMAP_STATUS_SUCCESS){var n=e.point;t.map.centerAndZoom(new BMap.Point(n.lng,n.lat),15)}}),e.map.enableScrollWheelZoom()})}},i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{title:"地图选址",visible:!0},on:{close:e.onClose}},[n("div",{staticClass:"search-wrap"},[n("div",{staticClass:"search-input"},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入地址","trigger-on-focus":!1,valueKey:"title"},on:{select:e.handleSelect},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}})],1),e._v(" "),n("div",{staticClass:"search-btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("确定")])],1)]),e._v(" "),n("div",{attrs:{id:"map_container"}})])},staticRenderFns:[]};var o=n("/Xao")(a,i,!1,function(e){n("5xCH")},"data-v-eb429b16",null);t.default=o.exports}});