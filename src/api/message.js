import request from '@/utils/request'

/**
 * 已删除消息列表
 * @param {*} data
 */
export function getBarDeleteMessageList(data) {
  return request({
    url: '/admin/hotel/getDeleteMessageList',
    method: 'post',
    data
  })
}

/**
 * 还原已删除消息
 * @param {*} data
 */
export function cancelDeleteMessage(data) {
  return request({
    url: '/admin/hotel/CancelDeleteMessage',
    method: 'post',
    data
  })
}
