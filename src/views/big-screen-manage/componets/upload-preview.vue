<template>
  <ul class="el-upload-list el-upload-list--picture-card" style="display:block;">
    <transition-group name="upload-item">
      <li tabindex="0" class="el-upload-list__item is-success" v-for="(v, i) in list" :key="i">
        <img src="../../../assets/pixel.gif" class="el-upload-list__item-thumbnail thumb-placeholder" :style="{'background-image': 'url('+ v.url + ')'}" v-if="type == 'image'" :id="'image_file_'+i"/>
        <img src="../../../assets/pixel.gif" class="el-upload-list__item-thumbnail thumb-placeholder" :style="{'background-image':'url('+ placeHolder +')'}" v-if="type == 'video'" :id="'video_file_'+i">
        <a class="el-upload-list__item-name"><i class="el-icon-document"></i>timg.jpg</a>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <i class="el-icon-close"></i><i class="el-icon-close-tip">按 delete 键可删除</i><!---->
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="previewFile(i)"><i class="el-icon-zoom-in"></i></span>
          <span class="el-upload-list__item-delete" @click="deleteFile(i)"><i class="el-icon-delete"></i></span>
        </span>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import BigPicture from '../../../vendor/BigPicture'
import placeHolder from '@/assets/bg-video-place.png'
import { removeResource } from '@/api/screen'
export default {
  data () {
    return {
      placeHolder: placeHolder
    }
  },
  props: ['list', 'onRemove', 'type'],
  methods: {
    previewFile(index) {
      if (this.type === 'image') {
        BigPicture({
          el: document.getElementById(this.type+ '_file_' + index),
          imgSrc: this.list[index].url
        })
      } else {
        BigPicture({
          el: document.getElementById(this.type+ '_file_' + index),
          vidSrc: this.list[index].url
        })
      }
      
    },
    deleteFile(index) {
      console.log(this.list[index].id)
      this.$confirm('确定删除该资源吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeResource({id: this.list[index].id}).then((response) => {
          this.onRemove(index)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {    
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
.thumb-placeholder {
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
}
.upload-item-enter-active, .upload-item-leave-active {
  transition: all 1s;
}
.upload-item-enter, .upload-item-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
