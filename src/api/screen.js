import request from '@/utils/request'

/**
 * 添加公告
 * @param {Object} data 
 */
export function addNotice(data) {
  return request({
    url: '/admin/hotel/addNotice',
    method: 'post',
    data
  })
}

/**
 * 删除资源
 * @param {Object} data 
 */
export function removeResource(data) {
  return request({
    url: '/admin/file_upload/delBg',
    method: 'post',
    data
  })
}

/**
 * 获取公告
 */
export function getNotice() {
  return request({
    url: '/admin/hotel/getNotice',
    method: 'post'
  })
}

/**
 * 获取背景图片
 */
export function getBpImages() {
  return request({
    url: '/admin/file_upload/getBgPic',
    method: 'post'
  })
}

/**
 * 获取背景视频
 */
export function getBpVideos() {
  return request({
    url: '/admin/file_upload/getBgVideo',
    method: 'post'
  })
}

/**
 * 获取广告图
 */
export function getAdImages() {
  return request({
    url: '/admin/file_upload/getAdvert',
    method: 'post'
  })
}

/**
 * 添加手机上的MP4URL
*/
export function addMp4Url(data) {
  return request({
    url: '/admin/file_upload/updatePhoneBg',
    method: 'post',
    data
  })
}

/**
 * 获取手机上的视频
*/
export function getBpVideoMp4(data) {
  return request({
    url: '/admin/file_upload/getPhoneBgVideo',
    method: 'post',
    data
  })
}
