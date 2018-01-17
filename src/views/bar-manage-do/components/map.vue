<template>
  <el-dialog title="地图选址" :visible="true" @close="onClose">
    <div class="search-wrap">
      <div class="search-input">
        <el-autocomplete
          class="inline-input"
          v-model="input"
          :fetch-suggestions="querySearch"
          placeholder="请输入地址"
          :trigger-on-focus="false"
          @select="handleSelect"
          valueKey="title"
        ></el-autocomplete>
      </div>
      <div class="search-btn">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </div>
    <div id="map_container">

    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      map: null,
      mapSearch: null,
      selectItem: null,
      geocoder: null
    }
  },
  methods: {
    onClose() {
      this.$emit('closeDialog', null)
    },
    querySearch(queryString, cb) {
      let _this = this
      if (!this.mapSearch) {
        this.mapSearch = new BMap.LocalSearch(this.map, {
          onSearchComplete: function(result){
            cb(_this.searchFilterBack(result))
          },
          pageCapacity: 10
        })
      }
      this.mapSearch.search(queryString)
    },
    handleSelect(item) {
      this.geocoder.getLocation(item.point, (result) => {
        console.log(result)
        this.selectItem = result
        this.map.clearOverlays()
        var point = new BMap.Point(result.point.lng, result.point.lat)
        this.map.centerAndZoom(point, 15)
        var marker = new BMap.Marker(point)
        this.map.addOverlay(marker)
      })
      
    },
    onSubmit(){
      this.$emit('closeDialog', this.selectItem)
    },
    searchFilterBack(result) {
      var _result = []
      for( var i in result) {
        if (Object.prototype.toString.call(result[i])=='[object Array]' && result[i].length > 0) {
          if (result[i][0].point) {
            _result = result[i]
          } 
          break;
        }
      }
      return _result
    }
  },
  mounted() {
    let _this = this
    this.$nextTick(() => {
      this.map = new BMap.Map("map_container")
      var geolocation = new BMap.Geolocation()
      this.geocoder = new BMap.Geocoder()
      geolocation.getCurrentPosition(function(result) {
        if(this.getStatus() == BMAP_STATUS_SUCCESS) {
          var pt = result.point;
          _this.map.centerAndZoom(new BMap.Point(pt.lng,pt.lat), 15);
        }
      })
      this.map.enableScrollWheelZoom()
    })
    
  }
}
</script>

<style lang="scss" scoped>
.el-autocomplete {
  width: 100%;
}
.search-wrap {
  display: flex;
}
.search-input {
  flex: 1;
  margin-right: 20px;
}
#map_container {
  margin-top: 30px;
  height: 300px;
}
</style>
