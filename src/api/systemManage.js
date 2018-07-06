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

/**
 * 搜索微信关注用户
* @param {*} data
 */
export function getSubscribeMember(data) {
  return request({
    url: '/admin/role/getSubscribeMember',
    method: 'post',
    data
  })
}

/**
 * 设置系统用户状态
* @param {*} data
 */
export function setSysUserStatus(data) {
  return request({
    url: '/admin/role/setSysUserStatus',
    method: 'post',
    data
  })
}

/**
 * 添加系统用户
* @param {*} data
 */
export function addWxSysUser(data) {
  return request({
    url: '/admin/role/addWxSysUser',
    method: 'post',
    data
  })
}

/**
 * 获取编辑用户信息
* @param {*} data
 */
export function getWxSysUser(data) {
  return request({
    url: '/admin/role/getWxSysUser',
    method: 'post',
    data
  })
}


/**
 * 编辑系统用户
* @param {*} data
 */
export function updateWxSysUser(data) {
  return request({
    url: '/admin/role/modifyWxSysUser',
    method: 'post',
    data
  })
}

/**
 * 获取权限列表
* @param {*} data
 */
export function getRoleList() {
  return request({
    url: '/admin/role/getRoleList',
    method: 'post',
  })
}


