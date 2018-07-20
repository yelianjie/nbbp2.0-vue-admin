import Cookies from 'js-cookie'
import store from './../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const powerTree = [{
    code: '0',
    title: '数据总览',
    api: ''
  }, {
    code: '1',
    title: '商户列表',
    api: ''
  }, {
    code: '2',
    title: '大屏幕管理',
    api: ''
  }, {
    code: '3',
    title: '资源管理',
    api: ''
	}, {
    code: '4',
    title: '财务管理',
    api: '',
    child: [{
	    code: '4-1',
	    title: '商户总统计',
	    api: ''
	  }, {
	    code: '4-2',
	    title: '代理分成',
	    api: ''
	  }, {
	    code: '4-3',
	    title: '订单详情',
	    api: ''
	  }, {
	    code: '4-4',
	    title: '充值详情',
	    api: ''
	  }, {
	    code: '4-5',
	    title: '提现详情',
	    api: ''
	  }, {
	    code: '4-6',
	    title: '兑换详情',
	    api: ''
	  }, {
	    code: '4-7',
	    title: '红包详情',
	    api: ''
	  }]
  }, {
    code: '5',
    title: '用户管理',
    api: '',
    child: [{
	    code: '5-1',
	    title: '酒吧管理员',
	    api: ''
	  }, {
	    code: '5-2',
	    title: '代理管理',
	    api: ''
	  }, {
	    code: '5-3',
	    title: '微信用户',
	    api: ''
	  }, {
	    code: '5-4',
	    title: '商家管理',
	    api: ''
	  }, {
	    code: '5-5',
	    title: '用户端超管',
	    api: ''
	  }, {
      code: '5-6',
      title: '黑名单用户',
      api: ''
    }]
  }, {
    code: '6',
    title: '系统管理',
    api: '',
    child: [{
	    code: '6-1',
	    title: '系统用户',
	    api: ''
	  }, {
	    code: '6-2',
	    title: '角色管理',
	    api: '',
	    child: [{
	    	code: '6-2-1',
	    	title: '可编辑',
	    	api: '',
	    }]
	  }]
  }, {
    code: '7',
    title: '版本管理',
    api: '',
    child: [{
	    code: '7-1',
	    title: '用户端',
	    api: ''
	  }, {
	    code: '7-2',
	    title: '客户端',
	    api: ''
	  }]
	}, {
	    code: '8',
	    title: '系统设置',
	    api: ''
	}, {
      code: '9',
      title: '消息管理',
      api: ''
  }]

const uriPowers = { // 路由权限表 uri > powers
	'/': '',
	'/Main': '',
  '/dashboard': ['0'],
  '/barManage/index': ['1'],
  '/barManageDo/edit': '',
  '/bigScreenManage/index': ['2'],
  '/resourceManage/index' : ['3'],
  '/financeManage': ['4-1','4-2','4-3','4-4','4-5','4-6','4-7'],
  '/financeManage/statistics': ['4-1'],
  '/financeManage/defaultDivide': ['4-2'],
  '/financeManage/orderList': ['4-3'],
  '/financeManage/rechargeList': ['4-4'],
  '/financeManage/depositList': ['4-5'],
  '/financeManage/exchangeList': ['4-6'],
  '/financeManage/packetList': ['4-7'],
  '/userManage': ['5-1','5-2','5-3','5-4','5-5'],
  '/userManage/barManager': ['5-1'],
  '/userManage/agentManager': ['5-2'],
  '/userManage/wxManager': ['5-3'],
  '/userManage/business': ['5-4'],
  '/userManage/adminManager': ['5-5'],
  '/userManage/blackManager': ['5-6'],
  '/systemManage': ['6-1','6-2','6-3'],
  '/systemManage/systemUser': ['6-1'],
  '/systemManage/roleManage': ['6-2'],
  '/systemManage/roleManageEdit': ['6-2-1'],
  '/systemManage/modifyPassword': '',
  '/systemVersion': ['7-1','7-2'],
  '/systemVersion/systemVersionUser': ['7-1'],
  '/systemVersion/systemVersionClient': ['7-2'],
  '/systemSetting/index': ['8'],
  '/messageManage/index': ['9'],
  '/404': '',
  '/401': ''
}

export function hasPower(to, next) {
  var powers = store.getters.roles.list
  // url 判断任意保护代码
  var uri = to
  if (to.path) uri = to.path
  // 代码直接判断是否存在
  var powerStr = ',' + powers.join(',')

  function call() {
    if (rs) {
      if (next) next()
      return rs
    }
    if (next) Message.error('无权访问')
    NProgress.done()
    if (next) next({ path: '/' })
    return rs
  }

  var rs = false
  if (store.getters.username === 'admin') {
    rs = true
    return call()
  }
  if (uri.indexOf('/') === -1) {
    rs = powerStr.indexOf(',' + uri) !== -1
    return call()
  }
   var up = uriPowers[uri]
  if (typeof up === 'undefined') return call()
  //if (!powers || powers.length === 0) return call()
  if (up === '') {
    rs = true
    return call()
  }
  if (typeof up === 'string') up = [up]
  up.forEach(v => {
    if (powers.indexOf(v) !== -1) rs = true
  })
  return call()
}

import Vue from 'vue'
Vue.mixin({
  methods: { hasPower: hasPower }
})