import request from '@/utils/request'

/**
 * 酒吧管理列表（参与分成的）
 * @param {*} data
 */
export function getBarManager(data) {
  return request({
    url: '/admin/supervise/getSuperviseList',
    method: 'post',
    data
  })
}

/**
 * 删除酒吧管理
 * @param {*} data
 */
export function deleteBarManager(data) {
  return request({
    url: '/admin/supervise/getSuperviseList',
    method: 'post',
    data
  })
}

/**
 * 获取会员总数
 * @param {*} data
 */
export function getMemberNum() {
  return request({
    url: '/admin/members/getMembersNum',
    method: 'post'
  })
}

/**
 * 获取会员列表
 * @param {*} data
 */
export function getMembers(data) {
  return request({
    url: '/admin/members/getAcUserList',
    method: 'post',
    data
  })
}

/**
 * 获取充值会员列表
 * @param {*} data
 */
export function getRecharges(data) {
  return request({
    url: '/admin/recharge/getRechargeList',
    method: 'post',
    data
  })
}

/**
 * 获取代理用户列表
 * @param {*} data
 */
export function getAgents(data) {
  return request({
    url: '/admin/agent/getGridData',
    method: 'post',
    data
  })
}

/**
 * 删除代理
 * @param {*} data
 */
export function deleteAgent(data) {
  return request({
    url: '/admin/agent/del',
    method: 'post',
    data
  })
}
