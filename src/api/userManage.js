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
    url: '/admin/recharge/getRechargeUserList',
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

/**
 * 获取商家列表
 * @param {*} data
 */
export function getGridData(data) {
  return request({
    url: '/admin/Merchant/getGridData',
    method: 'post',
    data
  })
}

/**
 * 获取超管列表
 * @param {*} data
 */
export function getSuperManageData(data) {
  return request({
    url: '/admin/supermanage/getData',
    method: 'post',
    data
  })
}

/**
 * 搜索关注微信用户
 * @param {*} data
 */
export function getWXMemberBySearch(data) {
  return request({
    url: '/admin/supermanage/getMemberBySearch',
    method: 'post',
    data
  })
}

/**
 * 获取超管和关联酒吧信息
 * @param {*} data
 */
export function getSuperManageModel(data) {
  return request({
    url: '/admin/supermanage/getModel',
    method: 'post',
    data
  })
}

/**
 * 保存编辑超管
 * @param {*} data
 */
export function updateSuperManage(data) {
  return request({
    url: '/admin/supermanage/saveEdit',
    method: 'post',
    data
  })
}

/**
 * 保存新增超管
 * @param {*} data
 */
export function addSuperManage(data) {
  return request({
    url: '/admin/supermanage/saveAdd',
    method: 'post',
    data
  })
}

/**
 * 删除超管
 * @param {*} data
 */
export function deleteSuperManage(data) {
  return request({
    url: '/admin/supermanage/delData',
    method: 'post',
    data
  })
}

/**
 * 获取所有酒吧
 * @param {*} data
 */
export function getAllHotel() {
  return request({
    url: '/admin/supermanage/getAllHotel',
    method: 'post',
  })
}

/**
 * 获取黑名单列表
 * @param {*} data
 */
export function getBlackUserList(data) {
  return request({
    url: '/admin/members/getBlackUserList',
    method: 'post',
    data
  })
}

/**
 * 取消拉黑
 * @param {*} data
 */
export function cancelBlack(data) {
  return request({
    url: '/admin/members/cancelBlack',
    method: 'post',
    data
  })
}

/**
 * 禁用微信用户
 * @param {*} data
 */
export function disableWxUser(data) {
  return request({
    url: '/admin/members/modifyLoginStatus',
    method: 'post',
    data
  })
}
