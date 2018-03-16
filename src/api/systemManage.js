import request from '@/utils/request'

/**
 * 获取系统用户列表
 * @param {*} data
 */
export function getSysUsers(data) {
  return request({
    url: '/admin/users/getSysUserList',
    method: 'post',
    data
  })
}

/**
 * 修改系统用户密码
 * @param {*} data
 */
export function modifyPassword(data) {
  return request({
    url: '/admin/users/updatePwd',
    method: 'post',
    data
  })
}

/**
 * 设置默认比例
 * @param {*} data
 */
export function setDefaultRate(data) {
  return request({
    url: '/admin/finance/setDefaultRate',
    method: 'post',
    data
  })
}

/**
 * 获取默认比例
 * @param {*} data
 */
export function getDefaultRate(data) {
  return request({
    url: '/admin/finance/getDefaultRate',
    method: 'post',
    data
  })
}

/**
 * 获取系统设置列表项
 */
export function sysValueList() {
  return request({
    url: '/admin/sys/sysValueList',
    method: 'post'
  })
}

/**
 * 设置系统项
* @param {*} data
 */
export function sysValueSet(data) {
  return request({
    url: '/admin/sys/sysValueSet',
    method: 'post',
    data
  })
}
