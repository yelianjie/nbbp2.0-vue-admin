import request from '@/utils/request'

/**
 * 酒吧列表
 * @param {*} data
 */
export function getBars(data) {
  return request({
    url: '/admin/hotel/getHotelList',
    method: 'post',
    data
  })
}

/**
 * 删除酒吧
 * @param {*} data
 */
export function deleteBar(data) {
  return request({
    url: '/admin/hotel/delHotel',
    method: 'post',
    data
  })
}

/**
 * 获取酒吧信息
 * @param {*} data
 */
export function getBarInfo(data) {
  return request({
    url: '/admin/hotel/getHotelInfo',
    method: 'post',
    data
  })
}

/**
 * 更新酒吧信息
 * @param {*} data
 */
export function updateBarInfo(data) {
  return request({
    url: '/admin/hotel/updateHtInfo',
    method: 'post',
    data
  })
}

/**
 * 更新酒吧分成
 * @param {*} data
 */
export function updateRateInfo(data) {
  return request({
    url: '/admin/hotel/updateHtRate',
    method: 'post',
    data
  })
}

/**
 * 获取打开和关闭大屏详细时间
 * @param {*} data
 */
export function getScreenDetailTime(data) {
  return request({
    url: '/admin/hotel/getScreenDetailTime',
    method: 'post',
    data
  })
}

