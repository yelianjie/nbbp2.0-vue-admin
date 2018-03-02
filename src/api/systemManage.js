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
