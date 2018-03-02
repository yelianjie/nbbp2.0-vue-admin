import request from '@/utils/request'

/**
 * 获取酒吧统计数据列表(总统计)
 * @param {*} data
 */
export function getHtFinanceList(data) {
  return request({
    url: '/admin/finance/getHtFinanceList',
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
 * 获取订单列表
 * @param {*} data
 */
export function getOrderList(data) {
  return request({
    url: '/admin/recharge/getOrderList',
    method: 'post',
    data
  })
}

/**
 * 获取提现列表
 * @param {*} data
 */
export function getWithdrawList(data) {
  return request({
    url: '/admin/recharge/getWithdrawList',
    method: 'post',
    data
  })
}

/**
 * 获取充值列表
 * @param {*} data
 */
export function getRechargeList(data) {
  return request({
    url: '/admin/recharge/getRechargeList',
    method: 'post',
    data
  })
}
