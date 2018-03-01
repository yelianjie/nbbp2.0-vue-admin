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
