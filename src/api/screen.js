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
