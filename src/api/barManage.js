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
