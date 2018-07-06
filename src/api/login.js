import request from '@/utils/request'
/**
 * 账号密码登录
 * @param {Object} data 
 */
export function loginByUsername(data) {
  return request({
    url: '/admin/login/sublogin',
    method: 'post',
    data
  })
}

/**
 * 微信登录
 * @param {Object} data 
 */
export function loginByWx(data) {
  return request({
    url: '/admin/login/getWxLoginById',
    method: 'post',
    data
  })
}

/**
 * 获取微信登录二维码
 * @param {Object} data 
 */
export function getLoginQrcode() {
  return request({
    url: '/admin/login/getLoginQrcode',
    method: 'post',
  })
}
  
/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/admin/users/loginOut',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getSysUserInfo() {
  return request({
    url: '/admin/users/getSysUserInfo',
    method: 'get',
  })
}
