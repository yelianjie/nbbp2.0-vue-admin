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
 * 编辑霸屏
 * @param {Object} data 
 */
export function updateBpTime(data) {
  return request({
    url: '/admin/product/saveTimeEdit',
    method: 'post',
    data
  })
}
