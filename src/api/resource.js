import request from '@/utils/request'

/**
 * 添加霸屏时间
 * @param {Object} data 
 */
export function addBpTime(data) {
  return request({
    url: '/admin/product/saveTimeAdd',
    method: 'post',
    data
  })
}

/**
 * 霸屏时间列表
 * @param {Object} data 
 */
export function getBpTimes(data) {
  return request({
    url: '/admin/product/getGridData',
    method: 'post',
    data
  })
}

/**
 * 编辑霸屏时间
 * @param {Object} data 
 */
export function updateBpTime(data) {
  return request({
    url: '/admin/product/saveTimeEdit',
    method: 'post',
    data
  })
}

/**
 * 添加霸屏主题
 * @param {Object} data 
 */
export function addBpTheme(data) {
  return request({
    url: '/admin/product/saveScreenAdd',
    method: 'post',
    data
  })
}

/**
 * 获取霸屏主题列表
 * @param {Object} data 
 */
export function getBpThemes(data) {
  return request({
    url: '/admin/product/getGridDataScreen',
    method: 'post',
    data
  })
}

/**
 * 编辑霸屏主题
 * @param {Object} data 
 */
export function updateBpTheme(data) {
  return request({
    url: '/admin/product/saveScreenEdit',
    method: 'post',
    data
  })
}

/**
 * 上传图片
 * @param {Object} data 
 */
export function uploadImg(data) {
  return request({
    url: '/admin/file_upload/uploadImg',
    method: 'post',
    data
  })
}

/**
 * 添加霸屏礼物
 * @param {Object} data 
 */
export function addBpGift(data) {
  return request({
    url: '/admin/product/saveGiftAdd',
    method: 'post',
    data
  })
}

/**
 * 获取霸屏礼物列表
 * @param {Object} data 
 */
export function getBpGifts(data) {
  return request({
    url: '/admin/product/getGridDataGift',
    method: 'post',
    data
  })
}

/**
 * 编辑霸屏礼物
 * @param {Object} data 
 */
export function updateBpGift(data) {
  return request({
    url: '/admin/product/saveGiftEdit',
    method: 'post',
    data
  })
}

/**
 * 删除霸屏时间、霸屏主题、霸屏礼物
 * @param {Object} data 
 */
export function deleteBp(data) {
  return request({
    url: '/admin/product/delPro',
    method: 'post',
    data
  })
}
