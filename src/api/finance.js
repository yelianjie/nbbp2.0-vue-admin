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

/**
 * 获取各收益数字
 */
export function getFinance() {
  return request({
    url: '/admin/finance/getFinance',
    method: 'post'
  })
}

/**
 * 获取最近一周的数据
 */
export function getWeeklyFinance() {
  return request({
    url: '/admin/finance/getWeeklyFinance',
    method: 'post'
  })
}

/**
 * 修改代理比例
 * @param {*} data
 */
export function setAgentRate(data) {
  return request({
    url: '/admin/agent/setAgentRate',
    method: 'post',
    data
  })
}


/**
 * 获取兑换列表
 * @param {*} data
 */
export function getExchangeList(data) {
  return request({
    url: '/admin/recharge/getExchangeList',
    method: 'post',
    data
  })
}
