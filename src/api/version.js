import request from '@/utils/request'
/**
 * 添加版本管理
 * @param {Object} data
 */
export function AddVersion(data) {
  return request({
    url: '/admin/version/AddVersion',
    method: 'post',
    data
  })
}
/**
 * 获取版本数据
 */
export function getVersion(data) {
  return request({
    url: '/admin/version/getVersion',
    method: 'post',
    data
  })
}
/**
 * 查看版本管理
 */
export function checkVersion(data) {
  return request({
    url: '/admin/version/CheckVersion',
    method: 'post',
    data
  })
}

/**
 * 编辑版本管理
 */
export function editVersion(data) {
  return request({
    url: '/admin/version/EditVersion',
    method: 'post',
    data
  })
}

/**
 * 获取版本
 */
export function getNewVersion(data) {
  return request({
    url: '/weixin/version/getNewVersion',
    method: 'post',
    data
  })
}
