import request from '@/utils/request'
/**
 * 后台登录
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

