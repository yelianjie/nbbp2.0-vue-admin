var Acan = {
  isInt: function (s) {
    return parseInt(s) === s
  },
  isInts: function (s) {
    return /^[\d]+\.?[\d]+$/.test(s)
  },
  isBool: function (s) {
    return Object.prototype.toString.call(s) === '[object Boolean]'
  // return typeof (s) == 'boolean' ? true : false
  },
  isNum: function (s) {
    return Object.prototype.toString.call(s) === '[object Number]'
  // return typeof (s) == 'number' ? true : false
  },
  // 判断是否 浮点类型
  isFloat: function (s) {
    return parseFloat(s) === s || false
  },
  isStr: function (s) {
    return Object.prototype.toString.call(s) === '[object String]'
  // return typeof (s) == 'string' ? true : false
  },
  isArr: function (d) {
    return Object.prototype.toString.call(d) === '[object Array]'
  // return d instanceof Array
  },
  isObj: function (d) {
    return Object.prototype.toString.call(d) === '[object Object]'
  // if (typeof (d) === 'object' && d !== null) return true
  // else return false
  },
  isFun: function (d) {
    return Object.prototype.toString.call(d) === '[object Function]'
  // return d instanceof Function
  },
  isDate: function (d) {
    return Object.prototype.toString.call(d) === '[object Date]'
  // return d instanceof Date
  }
}
// 判断对象中属性是否定义过
Acan.isDefined = function (d) {
  // return !(Object.prototype.toString.call(d)==='[object Undefined]')
  return !(typeof d === 'undefined')
}
// 变量是否为空，可以判断 字符串，对象，数组，bool，数字
Acan.isEmpty = function (a) {
  if (a && Acan.isFun(a.test) && Acan.isFun(a.compile)) {
    return false
  } else if (Acan.isObj(a)) {
    return Acan.count(a) === 0 || false
  } else if (Acan.isStr(a) || Acan.isArr(a)) {
    return a.length === 0 || false
  } else if (Acan.isNum(a)) {
    return false
  } else if (Acan.isBool(a)) {
    return false
  } else if (a === null) {
    return true
  } else if (!Acan.isDefined(a)) {
    return true
  } else {
    return false
  }
}
Acan.isBase64 = function (s) {
  return (this.isStr(s) && s.substr(0, 5) === 'data:' && s.indexOf('base64') !== -1) || false
}
// dom节点判断
Acan.isEle = function (d) {
  var _t = Object.prototype.toString.call(d)
  if (_t.substr(0, 12) === '[object HTML' && _t.substr(-8) === 'Element]' && d.nodeType === 1) return true
  else return false
}
Acan.isAele = function (d) {
  if (Acan.isObj(d) && d.Aele === 1) return true
  else return false
}
Acan.isFile = function (d) {
  return d instanceof File
}
Acan.isFiles = function (d) {
  return d instanceof FileList
}
Acan.isJSON = function (s) {
  var pi
  var p = ['[', '{', '"']
  var e = [']', '}', '"']
  var rs = false
  if (this.isStr(s) && s.length > 1) {
    pi = p.indexOf(s.substr(0, 1))
    if (pi >= 0 && s.substr(-1) === e[pi]) rs = true
  }
  return rs
}
// mongoose ObjectId
Acan.isObjectId = function (s) {
  if (Acan.isObj(s)) {
    s = s.toString()
  }
  if (Acan.isStr(s) && /^[a-f0-9]{24}$/.test(s)) {
    return true
  }
  return false
}
Acan.isIp = function (ip) {
  var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return re.test(ip)
}
// mongoose ObjectId parse
Acan.ObjectIdParse = function (oid) {
  var rs = {}
  if (!Acan.isObjectId(oid)) return rs
  rs.time = parseInt(oid.substr(0, 8), 16)
  rs.date = Acan.time('Y-m-d H:i:s', rs.time)
  return rs
}
/**
 *
 * @param n     总任务数（回调）
 * @param call  单次的回调
 * @param rcb   总回调
 * @param ttl   超时时间（毫秒）
 * @returns {Acan.Ccall}
 */
Acan.ccb = function (n, call, rcb, ttl) {
  return new Acan.Ccall(n, call, rcb, ttl)
}
// 多任务并行执行 -> 串行汇总回调
Acan.Ccall = function (n, call, rcb, ttl) {
  this.ttl = ttl || 3000 * n // 设置返回超时,默认3秒乘以任务数
  if (!rcb) {
    this.call = false
    this.rcb = call
  } else if (Acan.isInt(rcb)) {
    this.call = false
    this.rcb = call
    this.ttl = rcb
  } else {
    this.call = call // 并行回调
    this.rcb = rcb // 总回调
  }
  if (n === 0 && Acan.isFun(this.rcb)) this.rcb()
  this.n = n // 设置并行任务数
  this.i = 0 // 初始化计数器
  this.t = 0 // 初始化任务数
  this.status = 1 // 状态 1:初始化,2:执行中,3:完成
  this.cbrs = [] // 并行回调结果汇总
  return this
}
Acan.Ccall.prototype = {
  cb: function () {
    this.i++
    this.status = 2
    this.cbrs.push(arguments)
    try {
      if (this.call) this.call.apply(this, arguments) // 回调
      if (this.status < 3 && this.n === this.i) {
        this.status = 3
        this.rcb(this.cbrs)
      }
    } catch (e) {
      // console.trace('ccall',location.href,e.stack)
      Acan.debug.error(e)
    }
    var ni = this.i
    var self = this
    setTimeout(function () {
      self.timeout(ni)
    }, this.ttl)
  },
  at: function (c) { // 增加任务 计数
    if (c > 0) {
      this.n += c
      this.t += c
    } else {
      this.n++
      this.t++
    }
  },
  setnum: function (n) { // 设置任务数量
    if (!this.t) this.t = n
    if (!this.t) return false
    try {
      if (this.status < 3 && this.t === this.i) {
        this.status = 3
        this.rcb(this.cbrs)
      }
    } catch (e) { console.trace('ccall', e) }
  },
  timeout: function (ni) { // 超时检查
    if (ni === this.i && ni < this.n) {
      this.status = 3
      this.rcb(this.cbrs)
    }
  }
}
// -----nodejs
Acan.mkdirs = function (dpath) {
  if (!fs.existsSync(path.dirname(dpath))) {
    Acan.mkdirs(path.dirname(dpath))
  }
  if (!fs.existsSync(dpath)) {
    fs.mkdirSync(dpath)
  }
  return true
}

Acan.regexp = {
  'mail': /([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)/,
  'mailOrPhone': /(([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)|1(3|5|8)\d{9}$)/,
  'phone': /^1(3|4|5|7|8)\d{9}$/,
  'tel': /(^\d{3,4}-\d{7,8})$/,
  'qq': /^(\d{5,11}|0)$/,
  'mobile': {
    '86': /^1(3|4|5|7|8)\d{9}$/,
    '64': /^0?2\d{6,9}$/
  },
  isChinaMobile: /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/, // 移动方面最新答复
  isChinaUnion: /^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/, // 向联通微博确认并未回复
  isChinaTelcom: /^(?:133|153|177|18[019])\d{8}$/, // 1349号段 电信方面没给出答复，视作不存在
  isOtherTelphone: /^170([059])\d{7}$/ // 其他运营商
}
// ---------Acan 函数类---------

Acan.setstr = function (str, err) {
  if (!err) err = ''
  if (str) return str
  else return err
}
/*
* 复制的字符串
* Acan.str_repeat('ab',3)='ababab'
*/
Acan.str_repeat = function (i, m) {
  for (var o = []; m > 0; o[--m] = i) return o.join('')
}
/*
* 时间处理函数
* type 为需要转换的格式,t为指定的时间,默认为当前时间,可以是时间戳/日期格式/ISODate
* Acan.time('Y-m-d')="2013-05-01"
*/
Acan.time = function (type, t, no0, lang) {
  lang = lang || 'zh'
  if (!type) type = 's'
  if (Acan.isStr(t)) {
    t = t.replace('年', '-').replace('月', '-').replace('日', ' ').replace('时', ':').replace('分', ':').replace('秒', ' ')
    if (t.substr(-1, 1) === ':') {
      t += '00'
    }
  }
  var weeks = {
    zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }
  var APs = [{zh: '上午', en: 'AM'}, {zh: '下午', en: 'PM'}]
  var Months = [
    {zh: '1月', en: 'Jan'},
    {zh: '2月', en: 'Feb'},
    {zh: '3月', en: 'Mar'},
    {zh: '4月', en: 'Apr'},
    {zh: '5月', en: 'May'},
    {zh: '6月', en: 'Jun'},
    {zh: '7月', en: 'Jul'},
    {zh: '8月', en: 'Aug'},
    {zh: '9月', en: 'Sep'},
    {zh: '10月', en: 'Oct'},
    {zh: '11月', en: 'Nov'},
    {zh: '12月', en: 'Dec'}
  ]
  var now
  if (!t) now = new Date()
  else if (t > 0 && t < 9000000000) {
    now = new Date(t * 1000)
  } else if (t > 9000000000) {
    now = new Date(t)
  } else if (typeof (type) === 'string') {
    now = new Date(t)
    if (isNaN(now.getTime())) {
      if (t.indexOf(' ')) {
        t = t.replace(' ', 'T')
        now = new Date(t)
        now = new Date(now.getTime() - 3600 * 8000)
      } else if (t.indexOf('T')) {
        t = t.replace('T', ' ')
        now = new Date(t)
        now = new Date(now.getTime() + 3600 * 8000)
      }
    }
  } else if (Acan.isDate(t)) { now = t }
  if (type === 's') return Math.floor(now.getTime() / 1000)
  else if (type === 'ms') return now.getTime()
  else if (type.length > 0) {
    var day = {}
    day.Y = now.getFullYear()
    day.m = now.getMonth() + 1
    if (lang === 'en') day.m = Months[day.m][lang]
    day.d = now.getDate()
    day.H = now.getHours()
    day.h = day.H
    day.A = APs[0][lang]
    if (day.h > 12) {
    	day.A = APs[1][lang]
    	day.h = day.h - 12
    }
    day.i = now.getMinutes()
    day.s = now.getSeconds()
    day.M = now.getMilliseconds()
    day.w = now.getDay()
    day.W = weeks[lang][day.w]
    day.z = '+' + Acan.time.n2s(Math.abs(now.getTimezoneOffset()))
    day.Z = now.getTimezoneOffset() / 60
    var krr = []
    for (var key in day) {
      krr.push(key)
    }
    type = type.replace(new RegExp('(' + krr.join('|') + ')', 'g'), function (e, key) {
      if (day[key] < 10 && key !== 'Z' && key !== 'w' && (!no0 || key === 'i' || key === 's')) day[key] = '0' + day[key]
      return day[key] || ''
    })
    return type
  }
}
// 480 -> 08:00 时区差 分钟转小时
Acan.time.n2s = function (n) {
  var r = ''
  var h = Math.floor(n / 60)
  var s = n % 60
  if (h < 60) { r += (h < 10 ? ('0' + h) : h) + ':' + (s < 10 ? ('0' + s) : s) }
  return r
}
// 计算年龄 传入 单个参数 date 或者 三个参数 year,month,day
Acan.age = function (year, month, day) {
  if (arguments.length === 1) {
    var bday = year
    if (!/[\d]{10,12}/.test(year)) bday = Acan.time('s', year)
    month = Acan.time('m', bday)
    day = Acan.time('d', bday)
    year = Acan.time('Y', bday)
  }
  var age = Acan.time('Y') - year
  var nowmonth = Acan.time('m')
  var nowday = Acan.time('d')
  if (nowmonth > month) {
    age++
  } else if (nowmonth === month) {
    if (nowday > day) {
      age++
    }
  }
  return age
}
// 交集 两个数组的交集 [1,2,3],[1,3]=[1,3]
Acan.intersection = function () {
  var ir = []
  if (arguments.length < 2) return ir
  var fr = arguments[0]
  if (Acan.isArr(fr)) {
    for (var fi = 0; fi < fr.length; fi++) {
      var p = true
      for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].indexOf(fr[fi]) === -1) p = false
      }
      if (p) ir.push(fr[fi])
    }
    return ir
  }
}
// 一级数组按大小排序
Acan.sort = function (arr) {
  return arr.sort(Acan.sortNumber)
}
Acan.sortNumber = function (a, b) {
  return a - b
}
// 整型数字的随机函数
Acan.random = function (min, max) {
  var rand
  if (!min && !max && min !== 0 && max !== 0) rand = Math.floor(Math.random() * 100 + 1)
  else if (min > 0 && !max) rand = Math.floor(Math.random() * min)
  else rand = Math.floor(Math.random() * max + min)
  return rand
}
/*
* t1,{'t':'t1'} = true
* t1,['t1'] = true
* t1,[{'t':'t1'}] = true
*/
Acan.inArr = function (str, arr, f) {
  var r = false
  if (Acan.isArr(arr)) {
    arr.forEach(function (v, i) {
      if (f && Acan.isObj(v) && v[f] && v[f] == str) r = true // 子对象的属性比较
      else if (v == str) r = true
    })
  } else if (Acan.isObj(arr)) {
    for (var i in arr) {
      var v = arr[i]
      if (f && Acan.isObj(v) && v[f] && v[f] == str) return true // 子对象的属性比较
      else if (v == str) return true
    }
  }
  return r
}

// 数组 对象 循环
Acan.each = function (o, cb) {
  if (!cb) return false
  if (Acan.isArr(o)) {
    o.forEach(cb)
  } else if (Acan.isObj(o)) {
    for (var i in o) {
      cb(o[i], i, o)
    }
  }
}
// 从数组中查找
/*
@mult 为真，返回多个结果，数组形式
* var arr=[{'t':'t1'}]
Acan.arrFind(arr,t,t1)={'t':'t1'}
*/
Acan.arrFind = function (arr, k, v, mult) {
  var rs
  if (!Acan.isArr(v)) v = [v]
  if (mult) rs = []
  Acan.each(arr, function (val, key) {
    if (Acan.isObj(val) && Acan.inArr(val[k], v)) {
      if (mult) {
        rs.push(val)
      } else if (!rs) {
        rs = val
      }
    }
  })
  return rs
}

// 对象和数组的数量统计
Acan.count = function (obj) {
  var n = 0
  Acan.each(obj, function (v, i) {
    n++
  })
  return n
}
// 字符串转换为 （整型、浮点） 类型
Acan.int = function (s) {
  if (typeof (s) === 'number') return s
  if (s && s.indexOf('.') !== -1) return parseFloat(s)
  else return parseInt(s)
}
Acan.trim = function (str) {
  if (typeof (str) !== 'string') return str
  return str.replace(/^\s+|\s+$/g, '')
}

/*
//@对象继承
  o         被继承的对象，最后返回
  n         需要继承的对象，仅用于继承
  override  是否覆盖继承

  Acan.extend({a:1},{a:2,b:1})
    Object {a: 1, b: 1}
  Acan.extend({a:1},{a:2,b:1},1)
    Object {a: 2, b: 1}
*/
Acan.extend = function (o, n, override) {
  if (!Acan.isObj(o)) {
    o = n
    return o
  }
  if (!Acan.isObj(n)) return o
  for (var p in n) {
    if (n.hasOwnProperty(p)) {
      if (!o.hasOwnProperty(p)) { // 不存在的情况
        o[p] = n[p]
      } else { // 存在的情况
        if (Acan.isObj(n[p])) { // 子对象 -> 子继承
          o[p] = Acan.extend(o[p], n[p], override)
        } else {
          if (override) { // 需要覆盖
            o[p] = n[p]
          }
        }
      }
    }
  }
  return o
}

// 对象克隆
Acan.clone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
  var tbj = {}
  if (Acan.isArr(obj)) {
    tbj = []
    obj.forEach(function (v) {
      if (Acan.isObj(v)) {
        tbj.push(Acan.clone(v))
      } else {
        tbj.push(v)
      }
    })
    return tbj
  }
  for (var i in obj) {
    if (Acan.inArr(i, ['__proto__'])) {
    } else if (Acan.isObj(obj[i])) {
      tbj[i] = Acan.clone(obj[i])
    } else {
      tbj[i] = obj[i]
    } }
  return tbj
}
// 多参数 转对象参数，获得更多的参数传入支持
Acan.argObj = function (a, r) {
  var o = {}
  var al = a.length
  var c
  if (a.length === 2 && Acan.isObj(a[0])) {
    o = a[0]
    for (var oi in o) {
      if (r.indexOf(oi) === -1) {
        delete o[oi]
      }
    }
    c = a[1]
  } else if (a.length > 2) {
    c = a[al - 1]
    var start = al - 2
    if (r.length > a.length) {
      start = al - 1
    }
    for (var i = start; i >= 0; i--) {
      o[r[i]] = a[i]
    }
  }
  if (Acan.isFun(c)) o.__cb = c
  if (!Acan.isFun(o.__cb)) o.__cb = function () {}
  return o
}

// ---------Acan.obj 类---------

// 直接获取对象多级属性值 Acan.objGet(obj,'a.0.c') = obj.a.b.c
// df   Mixed   default (默认值)
Acan.objGet = function (obj, str, df, isSet) {
  var p
  if (Acan.isStr(str)) {
    p = str.split('.')
  }
  if (!Acan.isArr(p)) return false
  return Acan.objGet_c(obj, p, df, isSet)
}

// 直接赋值对象多级属性值 Acan.objSet(obj,'a.0.c','asdf') = obj.a.b.c
// df   Mixed   default (默认值)
Acan.objSet = function (obj, str, df) {
  var p
  if (Acan.isStr(str)) {
    p = str.split('.')
  }
  if (!Acan.isArr(p)) return false
  if (Acan.isObj(obj) || Acan.isArr(obj)) {
    Acan.objGet_c(obj, p, df, 1)
  }
  return obj
}
// 寻找对象中的子元素
Acan.objGet_c = function (o, prr, df, isSet) {
  var f = prr.shift()
  var _o
  if (!isSet) isSet = 0
  if (typeof (o) === 'undefined') {
    if (isSet) {
      o = Acan.objGet_c_df(f, prr, df)
    } else { // 获取的时候
      return df
    }
  }
  if (!isSet) {
    if (!Acan.isObj(o) && !Acan.isArr(o)) return df
  }
  if (typeof (o[f]) === 'undefined') {
    if (isSet) {
      o[f] = Acan.objGet_c_df(f, prr, df)
    } else { // 获取的时候
      return df
    }
  }
  _o = o[f]
  if (prr.length === 0 || typeof (_o) === 'undefined') {
    if (isSet) { // 设置的时候返回设置后的值
      _o = o[f] = df
      return _o
    } else { // 获取的时候返回对应的值或者默认值
      return Acan.isDefined(_o) ? _o : df
    }
  } else {
    return Acan.objGet_c(_o, prr, df, isSet)
  }
}
Acan.objGet_c_df = function (f, prr, df) {
  var _df
  if (prr.length === 0) {
    _df = df // 直接赋值
  } else if (Acan.isInts(prr[0])) {
    _df = []
  } else {
    _df = {}
  }
  return _df
}
// 属性名变小写
Acan.objToLowerCase = function (o, p) {
  for (var i in o) {
    var i2 = i.toLowerCase()
    if (Acan.isObj(o[i])) {
      Acan.objToLowerCase(o[i], 1)
    }
    if (i !== i2) {
      o[i2] = o[i]
      delete o[i]
    }
  }
  return o
}
Acan.obj_json = function (o) {
  var r = []
  if (o === null) return 'null'
  if (typeof o === 'string') return '"' + o.replace(/([\'\"\\])/g, '\\$1').replace(/(\n)/g, '\\n').replace(/(\r)/g, '\\r').replace(/(\t)/g, '\\t') + '"'
  if (typeof o === 'undefined') return '""' // 未知的变量返回空
  if (typeof o === 'object') {
    if (Acan.count(o) === 0) { return '' } // 空的对象返回空
    if (o === null) return 'null'
    //  else if(!o.sort){
    for (var i in o) {
      if (i === 'length') { continue }
      r.push('"' + i + '"' + ':' + Acan.obj_json(o[i]))
    }
    r = '{' + r.join() + '}'
    /*    }else{
        for(var i =0; i<o.length; i++)
          r.push(Acan.obj_json(o[i]))
        r="["+r.join()+"]"
      }*/
    return r
  }
  if (typeof o === 'number') { return o.toString() }
  return o.toString()
}

Acan.json_obj = function (str) { // -- json字符串 -> 对象
  if (typeof str === 'string') {
    if (['{', '[', '"'].indexOf(str.substring(0, 1)) !== -1) return (new Function('return ' + str))()
    if (Acan.inArr(str, ['true', 'false'])) return (new Function('return ' + str))()
    return str
  } else return str
}
// 获取对象的属性列表
Acan.obj_key = function (obj) {
  if (Acan.isStr(obj)) return obj
  if (typeof (obj) !== 'object') return ''
  var str = []
  for (var i in obj) {
    str.push(i)
  }
  return str
}
// 对象转为 url get 请求参数并url编码
Acan.obj_form = function (o) {
  if (typeof (o) !== 'object') return ''
  var str = ''
  for (var i in o) {
    str += '&' + i + '=' + encodeURI(o[i])
  }
  return str
}

/* 新老对象变化
@o 旧对象
@n 新对象
@pArr (可选) 上级调用的父对象是否是数组
*/
Acan.objModify = function (o, n, pArr) {
  var rs = {}
  var old = {}
  var m = false
  var isArr = false
  if (Acan.isArr(o)) {
    isArr = true
    rs = [] // 记录新值
    old = [] // 保存原值
  }
  if (typeof (o) !== 'object' || typeof (n) !== 'object') return
  if (isArr) {
    var n2 = []
    o.forEach(function (v, i) {
      if (!Acan.isDefined(n[i])) return
      if (typeof (v) === 'object' && typeof (n[i]) === 'object') {
        if (Acan.isEmpty(v) && Acan.isEmpty(n[i])) {
          // delete n[i]
        } else {
          var tmp = Acan.objModify(v, n[i], isArr)
          if (Acan.isArr(tmp)) {
            rs.push(tmp[0])
            m = true // 有变化
            if (Acan.isDefined(tmp[1])) {
              old.push(tmp[1])
            }
          } else {
            n2.push(n[i])
          }
        }
      } else if (v !== n[i]) {
        m = true // 有变化
        rs.push(n[i])
        old.push(v)
      }
    })
    if (Acan.isEmpty(o)) {
    } else {
      n = n2
    }
  } else {
    m = Acan.objModifyObj(o, n, pArr, rs, old, m)
  }
  if (pArr && !Acan.isEmpty(rs) && o._id) { // mongodb 对象专用，数组文档更新的_id
    rs._id = o._id
    old._id = o._id
  }
  Acan.objClean(n) // 清除空数据
  Acan.objClean(rs) // 清除空数据
  Acan.objClean(old) // 清除空数据
  if (!Acan.isEmpty(n)) m = true // 新增数据
  Acan.extend(rs, n)
  if (!m) return // 无变化
  return [rs, old]
}
// 比较新老对象的变化
Acan.objModifyObj = function (o, n, pArr, rs, old, m) {
  for (var i in o) {
    if (!Acan.isDefined(n[i])) continue // 新的对象中不存在老的索引 跳过
    if (typeof (o[i]) === 'object' && typeof (n[i]) === 'object') { // 存在并且是对象
      if (Acan.isEmpty(o[i])) {
        if (Acan.isEmpty(n[i])) delete n[i] // 都是空对象 删除
      } else {
        var tmp = Acan.objModify(o[i], n[i], false)
        if (!Acan.isArr(tmp)) {
          delete n[i]
          continue
        }
        rs[i] = tmp[0]
        old[i] = tmp[1]
        if (!rs[i]) delete rs[i]
        if (!old[i]) delete old[i]
        else m = true // 有变化
      }
    } else if (o[i] !== n[i]) { // 存在并且不一致
      m = true // 有变化
      rs[i] = n[i]
      old[i] = o[i]
      delete n[i]
    } else { // 存在并且一致
      delete n[i]
    }
  }
  return m
}
// 数组移除指定索引值
Acan.arrRm = function (arr, i) {
  if (!Acan.isArr(arr)) return arr
  if (!Acan.isArr(i)) i = [i]
  var nrr = []
  arr.forEach(function (v, k) {
    if (i.indexOf(k) !== -1) {
      nrr.push(v)
    }
  })
  return nrr
}
/*
数组移除指定属性的元素
@arr 数组
@key 子属性
@val String,Array 属性对应的值，可以是数组
*/
Acan.arrRmc = function (arr, key, val) {
  if (!Acan.isArr(arr)) return arr
  if (!Acan.isArr(val)) val = [val]
  var nrr = []
  arr.forEach(function (v, k) {
    if (v[key] && Acan.inArr(v[key], val)) {
    } else {
      nrr.push(v)
    }
  })
  return nrr
}
// 清除对象中空的信息
Acan.objClean = function (no, p) {
  if (Acan.isArr(no)) {
    var trr = []
    no.forEach(function (v, k) {
      if (!Acan.isEmpty(v)) trr.push(v)
    })
    no = trr
    if (p && Acan.isEmpty(no)) {
      return
    }
  }
  for (var i in no) {
    if (Acan.isEmpty(no[i])) delete no[i]
    else if (typeof (no[i]) === 'object') {
      no[i] = Acan.objClean(no[i], 1)
      if (!Acan.isDefined(no[i])) delete no[i]
    }
  }
  return no
}
// form parse to obj
Acan.form_parse = function (files) {
  for (var name in files) {
    var nrr = name.match(/[^\[\]]+/g)
    if (nrr.length > 1) {
      Acan.form_parse_c(nrr, files, files[name])
      delete files[name]
    }
  }
  return files
}
Acan.form_parse_c = function (nrr, pbj, val) {
  if (nrr.length > 0) {
    var tn = nrr.shift()
  }
  if (nrr.length > 0) {
    if (!pbj[tn]) {
      pbj[tn] = {}
    }
    if (nrr.length > 0) Acan.form_parse_c(nrr, pbj[tn], val)
  } else if (nrr.length === 0) {
    if (!pbj[tn]) {
      pbj[tn] = val
    } else {
      if (!Acan.isArr(pbj[tn])) pbj[tn] = [pbj[tn]]
      pbj[tn].push(val)
    }
    return pbj
  }
}
// 获取对象指定条数，默认是最后几条
/*
var list=[{1:1},{2:2},{3:3}]
Acan.obj_list(list,2)=[{2:2},{3:3}]
*/
Acan.obj_list = function (obj, num, type) {
  if (!type) type = 'end'
  var cl = Acan.count(obj) - num
  if (cl > 0) {
    var li = 0
    for (var i in obj) {
      if (type === 'end') {
        if (li === cl) { break }
        delete obj[i]
        li++
      } else {
        if (li <= num) { continue }
        delete obj[i]
        li++
      }
    }
  }
  return obj
}
// 对象根据属性排序 [{},{}]
Acan.obj_sort = function (arr, prop, desc) {
  var props = []
  var ret = []
  var i = 0
  var len = Acan.count(arr)
  var oI
  if (typeof prop === 'string') {
    for (; i < len; i++) {
      oI = arr[i](props[i] = new String(oI && oI[prop] || ''))._obj = oI
    }
  } else if (typeof prop === 'function') {
    for (; i < len; i++) {
      oI = arr[i](props[i] = new String(oI && prop(oI) || ''))._obj = oI
    }
  } else {
    throw '参数类型错误'
  }
  props.sort()
  for (i = 0; i < len; i++) {
    ret[i] = props[i]._obj
  }
  if (desc) ret.reverse()
  return ret
}
//对象排序
Acan.objSort = function (obj, desc) {
  if (Acan.isArr(obj)) return Acan.arrSort.apply(Acan.arrSort, arguments)
  var sdic = Object.keys(obj).sort()
  var o = {}
  for (ki in sdic) {
    o[sdic[ki]] = obj[sdic[ki]]
  }
  return obj = o
}
//数组排序
Acan.arrSort = function (array, prop, desc) {
  if(!desc) desc = 'asc'
  if(!prop) throw '没有参数'
  array.sort(getSortFun(desc, prop))
  function getSortFun(order, sortBy) {
      var ordAlpah = (order == 'asc') ? '>' : '<';
      var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
      return sortFun;
  }
}
Acan.unique = function (arr) {
	var h = {}
	var rs = []
	arr.forEach(function (v) {
		if (!h[v]) rs.push(v)
		h[v] = 1
	})
	return rs
}
Acan.groupBy = function (obj, val) {
  var result = {}
  // val将被转换为进行分组的处理器函数, 如果val不是一个Function类型的数据, 则将被作为筛选元素时的key值
  var iterator = Acan.isFun(val) ? val : function (obj) {
    return obj[val]
  }
  // 迭代集合中的元素
  for (var i in obj) {
    // 将处理器的返回值作为key, 并将相同的key元素放到一个新的数组
    var key = iterator(obj[i], i)
    if (Acan.isArr(key)) { // key为数组时，拆分归组
      key.forEach(function (v, k) {
        (result[v] || (result[v] = [])).push(obj[i])
      })
    } else {
      (result[key] || (result[key] = [])).push(obj[i])
    }
  }
  // 返回已分组的数据
  return result
}
// ---------Acan.url 类---------
/*

*/
Acan.url = function (key, val, reload) {
  if (!Acan.url.obj) Acan.url.parse()
  var o = Acan.url.obj
  if (arguments.length === 1) {
    if (Acan.isObj(key)) {
      for (var i in key) {
        Acan.url(i, key[i])
      }
      return
    }
    return o[key]
  } else if (arguments.length === 0) {
    return o
  } else if (arguments.length === 2) {
    if (val === null) delete o[key]
    else o[key] = val
    var search = Acan.url.unite(o)
    try{
      history.replaceState({}, document.title, '?' + search)
    }catch(e){
      Acan.debug.error(e);
    }
    return location.href.split('?')[0] + '?' + search
  }
}
// url解析
Acan.url.parse = function (url) {
  var o = {}
  var s = ''
  if (url) {
    try {
      s = url.split('?')[1] || ''
    } catch (e) { return {} }
  } else if (location && location.search) {
		s = location.search.substr(1)
  }
  s.split('&').forEach(function (v) {
    if (!v || !Acan.isDefined(v) || v.length < 1) return
    var vr = v.split('=')
    o[vr[0]] = decodeURIComponent(vr[1])
  })
  if (!url) Acan.url.obj = o
  return o
}
// 合并aurl
Acan.url.unite = function (o, p, ec) {
  var url = []
  if (Acan.isObj(o)) {
    for (var i in o) {
      var key = i
      if (p) key = p + '[' + i + ']'
      if (Acan.isObj(o[i])) {
        url.push(Acan.url.unite(o[i], i))
      } else {
        if (ec) {
          url.push(key + '=' + encodeURIComponent(o[i]))
        } else {
          url.push(key + '=' + encodeURI(o[i]))
        }
      }
    }
  }
  return url.join('&')
}
// 刷新
Acan.url.back = function () {
  window.location.href = document.referrer
}
Acan.url.refresh = function (url) {
  if (url) {
    window.location.href = url
  } else {
    window.location.reload()
  }
}
Acan.url.open = function (url, name, parameters) {
  window.open(url, name, parameters) // window.open('page.html','newwindow','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
}
// 获取url地址
Acan.url.get = function () {
  return window.location.href
}
Acan.url.host = function () {
  return window.location.host
}
Acan.url.arr = function (obj) {
  var uall = window.location.href.split('?')
  var urls = Object()
  urls[0] = uall[0]
  if (uall[1]) {
    var url = uall[1].split('&')
    for (var i in url) {
      var urr = url[i].split('=')
      urls[urr[0]] = urr[1]
    }
  }
  if (obj) {
    for (var i2 in obj) {
      urls[i2] = obj[i2]
    }
  }
  return urls
}
Acan.url.uni = function (o) {
  var url = o[0] + '?'
  var i = 0
  for (var x in o) {
    if (x === 0) { continue }
    if (i === 0) {
      url += x + '=' + o[x]
    } else {
      url += '&' + x + '=' + o[x]
    }
    i++
  }
  return url
}
// 获取aurl
Acan.url.aurl = function () {
  var aurl = window.location.search.split('a=')[1] // 动态地址参数
  if (!aurl) {
    aurl = window.location.href.split(window.location.host + '/')[1] // 静态地址参数
  }
  var arr = aurl.split('/')
  var aurls = []
  aurls[0] = arr[0]
  aurls[1] = arr[1]
  aurls[2] = arr[2]
  for (var i = 3; i < arr.length; i = i + 2) {
    aurls[arr[i]] = arr[i + 1]
  }
  return aurls
}
// --awhere 重定向
Acan.url.locations = function (key, str, val) {
  var aurl = Acan.url.aurl()
  var where = Acan.url.where_arr()
  if (val === '') {
    delete aurl.awhere // 不存在awhere的时候增加
  } else if (where === false) {
    aurl.awhere = str + '=' + val // 不存在awhere的时候增加
  } else {
    // 重定义awhere
    if (where.where[str] !== val) {
      where.where[str] = val
    } else {
      return false
    }
    // 合并awhere
    aurl.awhere = Acan.url.where_unite(where)
  }
  // 合并aurl
  var newurl = Acan.url.unite(aurl)
  window.location.href = newurl
  return true
}

// 合并url where数组
Acan.url.where_unite = function (arr) {
  var url
  var where = arr.where
  for (var v in where) {
    if (url) {
      url += ',' + v + '=' + where[v]
    } else {
      url = v + '=' + where[v]
    }
  }
  return url
}
// 获取where数组
Acan.url.where_arr = function () {
  var awhere = Acan.url.aurl().awhere
  if (awhere) {
    if (awhere.length < 1) {
      return false
    }
  } else {
    return false
  }
  var arr = awhere.split(',')
  var where = []
  for (var v in arr) {
    var brr = arr[v].split('=')
    where[brr[0]] = brr[1]
  }
  var rs = []
  rs['where'] = where
  rs['num'] = arr.length
  return rs
}
// url编码
Acan.url.encode = function (str) {
  str = str.replace(/:/g, '%3A')
  str = str.replace(/\//g, '%2F')
  return str
}
Acan.url.aencode = function (str) {
  str = str.replace(/:/g, '%3A')
  str = str.replace(/\?/g, '%3F')
  str = str.replace(/\&/g, '%26')
  str = str.replace(/\=/g, '%3D')
  str = str.replace(/\//g, '$2F')
  return str
}
// ----Acan.url 类 end
// 浏览器获取位置
Acan.geolocation = function (cb) {
  var call = cb
  var timeoutCall = function (tp, ttl) {
    if (!ttl) ttl = 10000
    setTimeout(function () {
      var geo = Acan.storage.get('Alast_geo')
      var lat = null
      var lng = null
      if (Acan.isArr(geo) && geo.length > 1) {
        lat = geo[0]
        lng = geo[1]
      }
      if (Acan.isFun(call)) call(lat, lng)
      call = false
      cb = false
    }, ttl)
  }
  if (AuexOnload) {
    timeoutCall('appcan', 5000)
    if (!AuexOnload) return
    uexLocation.onChange = function (lat, lng) {
      uexLocation.closeLocation()
      Acan.storage.set('Alast_geo', [lat, lng])
      if (Acan.isFun(call)) call(lat, lng)
      call = false
    }
    uexLocation.cbOpenLocation = function (opId, dataType, data) {}
    uexLocation.openLocation()
  } else if (Acan.browser.isAndroid || Acan.browser.isIphone) {
    timeoutCall('browser', Acan.browser.isAndroid ? 10000 : 5000)
    navigator.geolocation.getCurrentPosition(function (pt) {
      if (Acan.isFun(call)) call(pt.coords.latitude, pt.coords.longitude)
      call = false
    /*
    {"coords":{"speed":0.6417,"accuracy":200,"altitudeAccuracy":10,"altitude":13.162527,"longitude":"121.58126","heading":null,"latitude":29.874707},"timestamp":13878}
    */
    })
  } else {
    if (Acan.isFun(call)) call(null, null)
  }
}
Acan.Rad = function (d) {
  return d * Math.PI / 180.0 // 经纬度转换成三角函数中度分表形式。
}
Acan.deg_dec = function (latlng, d) { // 经纬度(度数)转换为十进制
  var arr = latlng
  var dec = arr[0] + arr[1] / 60 + arr[2] / 3600
  if (d === 'S') dec = 0 - dec
  return dec
}
// 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度 ;unit:距离单位;acc:精度
Acan.GetDistance = function (lat1, lng1, lat2, lng2, unit, acc) {
  if (Acan.isArr(lat1) && Acan.isArr(lng1)) {
    if (lat2) unit = lat2
    if (lat2 && lng2) acc = lng2
    lng2 = lng1[1]
    lat2 = lng1[0]
    lng1 = lat1[1]
    lat1 = lat1[0]
  }
  // console.log(lat1,lng1,lat2,lng2,unit,acc)
  if (!unit) unit = 'm'
  var ac = 1
  if (acc > 0) for (var i = 0; i < acc; i++) ac = ac * 10
  var radLat1 = Acan.Rad(lat1)
  var radLat2 = Acan.Rad(lat2)
  var a = radLat1 - radLat2
  var b = Acan.Rad(lng1) - Acan.Rad(lng2)
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137 // EARTH_RADIUS
  if (unit === 'km') s = Math.round(s * 100) / ac // 输出为公里
  if (unit === 'm') s = Math.round(s * 1000) / ac // s=s.toFixed(4)
  if (isNaN(s)) s = -1
  return s
}

// ----Acan.cookie
Acan.cookie = function (key, val, ttl, path, domain) {
  if (arguments.length === 1) {
    return Acan.cookie.get(key)
  } else {
    Acan.cookie.set(key, val, ttl, path, domain)
  }
}
Acan.cookie.add = function (key, val, ttl, path, domain) { // 添加cookie
  var pstr
  var dstr
  if (!path) pstr = '/'
  else pstr = path
  if (!domain) dstr = ''
  else dstr = '; domain=' + domain
  var str = key + '=' + encodeURIComponent(val) + '; path=' + pstr + dstr
  if (ttl > 0) { // 为0时不设定过期时间，浏览器关闭时cookie自动消失
    var date = new Date()
    var ms = ttl
    date.setTime(date.getTime() + ms)
    str += '; expires=' + date.toGMTString()
  }
  document.cookie = str
// console.log("添加cookie成功")
}
Acan.cookie.set = function (key, val, ttl, path, domain) { // 重置cookie
  Acan.cookie.del(key, 1)
  Acan.cookie.add(key, val, ttl, path, domain)
}
Acan.cookie.get = function (key) { // 获取指定名称的cookie的值
  if (!key) key = ''
  var arrStr = document.cookie.split('; ')
  var cbj = ''
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split('=')
    if (temp[0] === key) return unescape(temp[1])
    if (key === '') {
      cbj[temp[0]] = unescape(temp[1])
    }
  }
  return cbj
}
Acan.cookie.del = function (name, f) { // 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
	if (!f) Acan.cookie(name, '')
  var date = new Date()
  date.setTime(date.getTime() - 1000000)
  document.cookie = name + '=a; expires=' + date.toGMTString()
}
// 读取所有保存的cookie字符串
Acan.cookie.all = function () {
  var str = document.cookie
  if (str === '') { str = '没有保存任何cookie' }
// console.log(str)
}
// ---------------------html5
// -----html5 本地存储
Acan.storage = function () {}
Acan.storage._check = function () {
  if (Acan.isDefined(window.localStorage)) {
    try {
      localStorage.setItem('__test', 'testValue')
      localStorage.removeItem('__test')
      return true
    } catch (error) {
      return false
    }
  } else {
    return false
  }
}
Acan.storage.check = Acan.storage._check()

Acan.storage.set = function (key, o) {
  if (Acan.storage.check) {
    if (!Acan.isStr(o)) o = JSON.stringify(o)
    return localStorage.setItem(key, o)
  } else {
    return false
  }
}
Acan.storage.get = function (key) {
  if (Acan.storage.check) {
    var rs
    var val = localStorage.getItem(key)
    if (!Acan.isStr(val)) return
    if (isNaN(parseFloat(val)) && !Acan.inArr(val[0], ['{', '[', '"'])) return val
    try{
      rs = JSON.parse(val)
    } catch(e) {
      console.log(e)
    } finally {
      if (!Acan.isDefined(rs)) rs = Acan.json_obj(val)
    }
    return rs
  } else {
    return
  }
}
Acan.storage.save = function (key, okey, o) {
  var data = Acan.storage.get(key)
  if (!data) { data = {} }
  if (!Acan.isObj(data)) {
    data = {}
  }
  data[okey] = o
  return Acan.storage.set(key, data)
}
Acan.storage.del = function (key) {
  if (Acan.storage.check) {
    return localStorage.removeItem(key)
  } else {
    return false
  }
}
Acan.storage.keys = function (pre) {
  if (!pre) pre = ''
  var storage = window.localStorage
  var keys = []
  for (var i = 0; i < storage.length; i++) {
    if (pre) {
      if (storage.key(i).indexOf(pre) !== -1) {
        keys.push(storage.key(i))
      } else {
        if (keys.length > 0) continue
      }
    } else {
      keys.push(storage.key(i))
    }
  }
  return keys
}
Acan.storage.delAll = function () {
  if (Acan.storage.check) {
    return localStorage.clear()
  } else {
    return false
  }
}
// ------编码类
Acan.base64encodechars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
Acan.base64decodechars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1)
Acan.base64encode = function (str) {
  var out, i, len
  var c1, c2, c3
  len = str.length
  i = 0
  out = ''
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i === len) {
      out += Acan.base64encodechars.charAt(c1 >> 2)
      out += Acan.base64encodechars.charAt((c1 & 0x3) << 4)
      out += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i === len) {
      out += Acan.base64encodechars.charAt(c1 >> 2)
      out += Acan.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
      out += Acan.base64encodechars.charAt((c2 & 0xf) << 2)
      out += '='
      break
    }
    c3 = str.charCodeAt(i++)
    out += Acan.base64encodechars.charAt(c1 >> 2)
    out += Acan.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
    out += Acan.base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6))
    out += Acan.base64encodechars.charAt(c3 & 0x3f)
  }
  return out
}
Acan.base64decode = function (str) {
  var c1, c2, c3, c4
  var i, len, out
  len = str.length
  i = 0
  out = ''
  while (i < len) {
    do {
      c1 = Acan.base64decodechars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c1 === -1)
    if (c1 === -1) break
    do {
      c2 = Acan.base64decodechars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c2 === -1)
    if (c2 === -1) break
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))
    do {
      c3 = str.charCodeAt(i++) & 0xff
      if (c3 === 61) return out
      c3 = Acan.base64decodechars[c3]
    } while (i < len && c3 === -1)
    if (c3 === -1) break
    out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2))
    do {
      c4 = str.charCodeAt(i++) & 0xff
      if (c4 === 61) return out
      c4 = Acan.base64decodechars[c4]
    } while (i < len && c4 === -1)
    if (c4 === -1) break
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
  }
  return out
}

Acan.SHA1 = function (msg) {
  function rotate_left (n, s) {
    var t4 = (n << s) | (n >>> (32 - s))
    return t4
  }
  function lsb_hex (val) {
    var str = ''
    var i
    var vh
    var vl
    for (i = 0; i <= 6; i += 2) {
      vh = (val >>> (i * 4 + 4)) & 0x0f
      vl = (val >>> (i * 4)) & 0x0f
      str += vh.toString(16) + vl.toString(16)
    }
    return str
  }
  function cvt_hex (val) {
    var str = ''
    var i
    var v
    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f
      str += v.toString(16)
    }
    return str
  }
  function Utf8Encode (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  }
  var blockstart
  var i
  var j
  var temp
  var W = new Array(80)
  var H0 = 0x67452301
  var H1 = 0xEFCDAB89
  var H2 = 0x98BADCFE
  var H3 = 0x10325476
  var H4 = 0xC3D2E1F0
  var A, B, C, D, E
  msg = Utf8Encode(msg)
  var msg_len = msg.length
  var word_array = []
  for (i = 0; i < msg_len - 3; i += 4) {
    j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
    msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3)
    word_array.push(j)
  }
  switch (msg_len % 4) {
    case 0:
      i = 0x080000000
      break
    case 1:
      i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000
      break
    case 2:
      i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000
      break
    case 3:
      i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80
      break
  }
  word_array.push(i)
  while((word_array.length % 16) != 14) word_array.push(0)
  word_array.push(msg_len >>> 29)
  word_array.push((msg_len << 3) & 0x0ffffffff)
  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
    for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i]
    for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
    A = H0;B = H1;C = H2;D = H3;E = H4
    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff
      E = D
      D = C
      C = rotate_left(B, 30)
      B = A
      A = temp
    }
    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff
      E = D
      D = C
      C = rotate_left(B, 30)
      B = A
      A = temp
    }
    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff
      E = D
      D = C
      C = rotate_left(B, 30)
      B = A
      A = temp
    }
    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff
      E = D
      D = C
      C = rotate_left(B, 30)
      B = A
      A = temp
    }
    H0 = (H0 + A) & 0x0ffffffff
    H1 = (H1 + B) & 0x0ffffffff
    H2 = (H2 + C) & 0x0ffffffff
    H3 = (H3 + D) & 0x0ffffffff
    H4 = (H4 + E) & 0x0ffffffff
  }
  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4)
  return temp.toLowerCase()
}

Acan.MD5 = (function ($) {
  'use strict'
  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safeAdd (x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRotateLeft (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5cmn (q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff (a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  function md5gg (a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  function md5hh (a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii (a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMD5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[((len + 64) >>> 9 << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMD5 (s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHMACMD5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUTF8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMD5 (s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  function hexMD5 (s) {
    return rstr2hex(rawMD5(s))
  }
  function rawHMACMD5 (k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  function hexHMACMD5 (k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }
  return md5
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
})(this)

// 将字符串转化为UTF-8
Acan.EncodeUtf8 = function (s1) {
  var s = escape(s1)
  var sa = s.split('%')
  var retV = ''
  if (sa[0] !== '') {
    retV = sa[0]
  }
  for (var i = 1; i < sa.length; i++) {
    if (sa[i].substring(0, 1) === 'u') {
      retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)))
    } else retV += '%' + sa[i]
  }
  return retV
}
// html 的转义
Acan.jsstr = function () {
  this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g
  this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g
  this.REGX_TRIM = /(^\s*)|(\s*$)/g
  this.HTML_DECODE = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&nbsp;': ' ',
    '&quot;': '"',
    '&copy;': ''
  // Add more
  }
  this.encodeHtml = function (s) {
    s = (s !== undefined) ? s : this.toString()
    return (typeof s !== 'string') ? s : s.replace(this.REGX_HTML_ENCODE,
      function ($0) {
        var c = $0.charCodeAt(0)
        var r = ['&#']
        c = (c === 0x20) ? 0xA0 : c
        r.push(c); r.push(';')
        return r.join('')
      })
  }
  this.decodeHtml = function (s) {
    var HTML_DECODE = this.HTML_DECODE
    s = (s !== undefined) ? s : this.toString()
    return (typeof s !== 'string') ? s : s.replace(this.REGX_HTML_DECODE,
      function ($0, $1) {
        var c = HTML_DECODE[$0]
        if (c === undefined) {
          // Maybe is Entity Number
          if (!isNaN($1)) {
            c = String.fromCharCode(($1 === 160) ? 32 : $1)
          } else {
            c = $0
          }
        }
        return c
      })
  }
  this.trim = function (s) {
    s = (s !== undefined) ? s : this.toString()
    return (typeof s !== 'string') ? s : s.replace(this.REGX_TRIM, '')
  }
  this.hashCode = function () {
    var hash = this.__hash__
    var _char
    if (hash === undefined || hash === 0) {
      hash = 0
      for (var i = 0, len = this.length; i < len; i++) {
        _char = this.charCodeAt(i)
        hash = 31 * hash + _char
        hash = hash & hash // Convert to 32bit integer
      }
      hash = hash & 0x7fffffff
    }
    this.__hash__ = hash
    return this.__hash__
  }
}
Acan.jsstr.call(String.prototype)
// 兼容ie8以下数组没有的属性
Acan.arr = function () {
  this.forEach = function (fn) {
    for (var i = 0; i < this.length; i++) {
      fn(this[i], i)
    }
  }
  this.indexOf = function (str) {
    for (var i = 0; i < this.length; i++) {
      if (str === this[i]) return i
    }
    return -1
  }
  this.filter = function (fn) {
    var res = []
    for (var i = 0; i < this.length; i++) {
      if (fn(this[i], i, this)) res.push(this[i])
    }
    return res
  }
  this.map = function (fn) {
    var out = new Array(this.length)
    for (var i = 0; i < this.length; i++) {
      out[i] = fn(this[i], i, this)
    }
    return out
  }
/*
this.reduce = function reduce(callback, opt_initialValue) {
  var value, isValueSet = false
  if (2 < arguments.length) {
    value = opt_initialValue
    isValueSet = true
  }
  for (var i = 0, l = this.length; l > i; ++i) {
    if (this.hasOwnProperty(i)) {
      if (isValueSet) {
        value = callback(value, this[i], i, this)
      }else {
        value = this[i]
        isValueSet = true
      }
    }
  }
  return value
},*/
}

// IE8以前的兼容
if ('ab'.substr(-1) !== 'b') {
  String.prototype.substr = function (start, length) {
    var str = ''
    var end = this.length
    if (start < 0) start = this.length + start
    if (length > 0) end = start + length
    for (var i = start; i < end; i++) {
      str += this.charAt(i)
    }
    return str
  }
}
if (typeof Array.isArray === 'undefined') Array.isArray = Acan.isArr
if (typeof Array.prototype.forEach === 'undefined') Acan.arr.call(Array.prototype)
if (typeof JSON === 'undefined') {
  var JSON = {}
  JSON.parse = Acan.json_obj
  JSON.stringify = Acan.obj_json
}
// 十进制转16进制
function Str2Hex (s) {
  var c = ''
  var n
  var ss = '0123456789ABCDEF'
  var digS = ''
  for (var i = 0; i < s.length; i++) {
    c = s.charAt(i)
    n = ss.indexOf(c)
    digS += Dec2Dig(eval(n))
  }
  // return value
  return digS
}
// 十进制转2进制
function Dec2Dig (n1) {
  var s = ''
  var n2 = 0
  for (var i = 0; i < 4; i++) {
    n2 = Math.pow(2, 3 - i)
    if (n1 >= n2) {
      s += '1'
      n1 = n1 - n2
    } else s += '0'
  }
  return s
}
function Dig2Dec (s) {
  var retV = 0
  if (s.length === 4) {
    for (var i = 0; i < 4; i++) {
      retV += eval(s.charAt(i)) * Math.pow(2, 3 - i)
    }
    return retV
  }
  return -1
}
function Hex2Utf8 (s) {
  var retS = ''
  var tempS = ''
  var ss = ''
  if (s.length === 16) {
    tempS = '1110' + s.substring(0, 4)
    tempS += '10' + s.substring(4, 10)
    tempS += '10' + s.substring(10, 16)
    var sss = '0123456789ABCDEF'
    for (var i = 0; i < 3; i++) {
      retS += '%'
      ss = tempS.substring(i * 8, (eval(i) + 1) * 8)
      retS += sss.charAt(Dig2Dec(ss.substring(0, 4)))
      retS += sss.charAt(Dig2Dec(ss.substring(4, 8)))
    }
    return retS
  }
  return ''
}

// ----Acan.html 类
Acan.html = function (obj) { return Acan.html.anew(obj) }
Acan.html.anew = function (obj) {
  this.obj = obj
  return this
}
// ---------Acan.html.tag-----------生成html标签
Acan.html.span = function (html, arr) { return this.tag('span', arr, html) }
Acan.html.p = function (html, arr) { return this.tag('p', arr, html) }
Acan.html.a = function (html, arr) { return this.tag('a', arr, html) }
Acan.html.li = function (html, arr) { return this.tag('li', arr, html) }
Acan.html.ul = function (html, arr) { return this.tag('ul', arr, html) }
Acan.html.dd = function (html, arr) { return this.tag('dd', arr, html) }
Acan.html.dt = function (html, arr) { return this.tag('dt', arr, html) }
Acan.html.div = function (html, arr) { return this.tag('div', arr, html) }
Acan.html.text = function (html, arr) { return this.tag('text', arr, html) }
Acan.html.textarea = function (html, arr) { return this.tag('textarea', arr, html) }
Acan.html.dl = function (arr, html) { return this.tag('dl', arr, html) }
Acan.html.tag = function (type, arr, html) {
  if (!arr) arr = {}
  if (!html) { html = '' }
  var adds = '</' + type + '>'
  var adde = ''
  if (['input', 'br', 'hr'].indexOf(type) !== -1) {
    adds = ''
    adde = '/'
  }
  var str = this.base.unite(arr, type)
  var strs = '<' + type + ' ' + str + adde + '>' + html + adds
  if (arr.type === 'text') {
    strs = html + '<' + type + ' ' + str + '>' + adds
  } else if (type === 'textarea') {
    strs = '<' + type + ' ' + str + '>' + html + adds
  }
  return strs
}
Acan.html.radio = function (obj, data, val, label) {
  var radios = ''
  var opobj = obj
  opobj.type = 'radio'
  for (var x in data) {
    opobj.value = x
    if (x === 'length') { continue }
    if (x === val) { opobj.checked = 'checked' }
    radios += this.tag('input', opobj, data[x])
    delete opobj.checked
  }
  if (!label) { label = '' }
  return label + radios
}
Acan.html.checkbox = function (obj, data, val, label) {
  var radios = ''
  var opobj = obj
  opobj.type = 'checkbox'
  opobj.name = opobj.name + '[]'
  for (var x in data) {
    opobj.value = x
    if (x === 'length') { continue }
    if (x === val) { opobj.checked = 'checked' }
    radios += this.tag('input', opobj, data[x])
    delete opobj.checked
  }
  if (!label) { label = '' }
  return label + radios
}
Acan.html.select = function (obj, data, val, label) {
  var option = ''
  for (var x in data) {
    var opstr = Object()
    if (x === 'length') { continue }
    opstr.value = x
    if (x === val) { opstr.selected = 'selected' }
    option += this.tag('option', opstr, data[x])
  }
  if (!label) { label = '' }
  return label + this.tag('select', obj, option)
}
Acan.html.inputs = function (obj, data, val, label) {
  var str = ''
  if (data.length === 0) { return }
  for (var i in data) {
    if (i === 'length') { continue }
    delete obj.checked
    obj.value = i
    if (typeof (val) === 'object') {
      if (Acan.inArr(i, val)) { obj.checked = 'checked' }
    } else if (typeof (val) === 'string') {
      if (val === i) { obj.checked = 'checked' }
    }
    str += this.tag('input', obj, this.tag('span', '', data[i]))
  }
  if (!label) label = ''
  return label + str
}
// --Acan.html.base
Acan.html.base = function () {}
Acan.html.base.unite = function (arr, type) { // 合并标签参数
  var str = ''
  if (arr.length === 0) { return }
  for (var i in arr) {
    if (i === 'length') { continue }
    if (type === 'textarea') { if (i === 'type' || i === 'value' || i === 'size') { continue } }
    if (i === 'ready') continue
    str += i + '="' + arr[i] + '" '
  }
  return str
}

// ----dom 效果

Acan.uaParse = function (ua) {
  var o = {
    version: (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
    webkit: /webkit/i.test(ua),
    safari: /safari/i.test(ua),
    opera: /opera/i.test(ua),
    msie: /msie/i.test(ua) && !/opera/.test(ua),
    mozilla: /mozilla/i.test(ua) && !/(compatible|webkit)/.test(ua),
    isWp: /windows phone/i.test(ua),
    isIphone: /iphone/i.test(ua),
    isAndroid: /android/i.test(ua),
    isWechat: /micromessenger/i.test(ua),
    isQQ: /\sqq\/\d/i.test(ua),
    appcan: /appcan/i.test(ua),
    btopCordova: /btopcordova/i.test(ua),
    container: /aiyiwebcontainer/i.test(ua),
    theworld: /theworld/i.test(ua),
    apicloud: /apicloud/i.test(ua)
  }
  o.isWin = /windows/i.test(ua) && !o.isWp
  o.isIos = (o.isIpad || o.isIphone) || false // 是否ios
  o.isSafari = false
  if (o.isIos && !o.isWechat && !o.appcan && !o.btopCordova) {
    o.isSafari = /safari/i.test(ua) // 是否ios下的原生浏览器
  }
  o.isMobile = (o.isIos || o.isAndroid) || false // 是否移动设备
  return o
}

var userAgent = navigator.userAgent.toLowerCase()
Acan.userAgent = userAgent
Acan.browser = Acan.uaParse(userAgent)

Acan.isTouch = 'ontouchend' in document || false
Acan.support = {
  transform3d: (function () {
    if ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()) {
      return true
    } else {
      var css = ['perspectiveProperty', 'MozPerspective', 'OPerspective', 'msPerspective']
      for (var p in css) {
        if (css[p] in document.documentElement.style) return true
      }
    }
    return false
  })(),
  touch: ('ontouchstart' in window)
}

Acan.loadimg = function (url, cb) {
  var img = new Image() // 创建一个Image对象，实现图片的预下载
  img.src = url
  if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
    cb.call(img, true)
    return // 直接返回，不用再处理onload事件
  }
  /*
  img.onreadystatechange=function(){
    if(this.readyState=="complete"){
      cb.call(img,true)
    }else{
      cb(false)
    }
  }*/
  img.onload = function () { // 图片下载完毕时异步调用callback函数。
    img.onload = null // 优化Gif（多次触发onload事件）f和IE6的内容泄漏
    cb.call(img, true) // 将回调函数的this替换为Image对象
  }
  img.onerror = function () {
    cb.call(img, false) // 将回调函数的this替换为Image对象
  }
}

Acan.getElement = function (node, type) {
  if (!type) type = 'nextSibling'
  else type = 'previousSibling'
  if (!node) return null
  if (node.nodeType === 1) return node
  if (node[type]) return Acan.getElement(node[type], type)
  return null
}
Acan.parseDom = function (arg, ev) {
  if (Acan.isEle(arg)) return arg
  var fmt = document.createDocumentFragment()
  var objE = document.createElement(ev || 'div')
  objE.innerHTML = arg
  Acan.parseDomC(objE, fmt)
  return fmt
}
Acan.parseDomC = function (objE, fmt) {
  if (objE.childNodes.forEach) {
    objE.childNodes.forEach(function (ele, i) {
      fmt.appendChild(ele)
    })
  } else {
    for (var i = 0, length = objE.childNodes.length; i < length; i += 1) {
      // 文档片段加载克隆的节点
      fmt.appendChild(objE.childNodes[0])
    }
  }
}
//计算字符串中汉字长度
Acan.countZhLen = function(str){
  var totalCount = 0;
  for (var i=0; i<str.length; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {}
  else {
           totalCount++;
       }
   }
  return totalCount;
}
// ----Adom 操作
function Adom (Did, arg) {
  if (Did) {
    var obj = new Adom()
    return obj._init_(Did, arg)
  }
}
Adom.getFontSize = function () {
  var style = document.body.currentStyle || document.defaultView.getComputedStyle(document.body, '')
  return parseInt(style.fontSize)
}
Adom.style = function (dom, type) {
  if (Acan.isStr(dom)) dom = document.querySelector(dom)
  dom = dom || document.body
  var style = dom.currentStyle || document.defaultView.getComputedStyle(dom, '')
  return type ? style[type] : style
}
Adom._p = {
  height: function () {
    return this.e[0].offsetHeight
  },
  width: function () {
    return this.e[0].offsetWidth
  },
  scrollTop: function (v) {
    if (v) this.e[0].scrollTop = v
    return this.e[0].scrollTop
  },
  scrollLeft: function (v) {
    if (v) this.e[0].scrollLeft = v
    return this.e[0].scrollLeft
  },
  parent: function () {
    var obj = new Adom()
    return obj._init_(this.e[0].parentNode)
  },
  find: function (Did) {
    var obj = new Adom()
    return obj._init_(Did, this.e[0])
  },
  prev: function () {
    this.e[0] = Acan.getElement(this.e[0].previousSibling, 'previousSibling')
    return this
  },
  next: function () {
    this.e[0] = Acan.getElement(this.e[0].nextSibling, 'nextSibling')
    return this
  },
  children: function () {
    var obj = new Adom()
    obj.e = {}
    var ei = 0
    for (var i in this.e) {
      for (var c in this.e[i].childNodes) {
        var cbj = this.e[i].childNodes[c]
        if (cbj.nodeType === 1) {
          obj.e[ei] = cbj
          ei++
        }
      }
    }
    return obj
  },
  contents: function () {},
  on: function (ev, cb) {
    if (Acan.isFun(cb)) {
      this.each(function (i) {
        var _s = this
        try {
          _s.addEventListener(ev, function (e) { cb(_s, e) }, false)
        } catch (e) { Acan.debug.error(e) }
      })
    }
  },
  focus: function () {
    if (this.e[0]) return this.e[0].focus()
  },
  blur: function () {
    if (this.e[0]) return this.e[0].blur()
  },
  get: function (i) {
    if (!i) i = 0
    return this.e[i]
  },
  each: function (cb) {
    if (!cb) return
    for (var i in this.e) {
      var ele = this.e[i]
      if (Acan.isEle(ele) && Acan.isFun(cb)) cb.apply(ele, [i])
    }
  },
  htmls: function () {
    return this.e[0].outerHTML
  },
  html: function (html) {
    if (typeof (html) !== 'undefined') {
      this.each(function (i) {
        if (html.nodeType === 1) {
          this.innerHTML = ''
          this.insertBefore(html, null)
        } else {
          this.innerHTML = '' + html
        }
      })
    }
    return this.e[0].innerHTML
  },
  text: function (str) {
    if (typeof (str) !== 'undefined') this.each(function (i) { this.innerText = '' + str })
    return this.e[0] ? this.e[0].innerText : ''
  },
  val: function (str) {
    if (this.e[0].nodeType !== 1) return false
    if (this.e[0].tagName === 'INPUT') {
      if (this.e[0].type === 'radio') {
        var rs = ''
        this.each(function (i) {
          if (typeof (str) !== 'undefined') {
            if (this.value === str) {
              this.checked = true
              rs = this.value
              return
            }
          } else {
            if (this.checked === true) {
              rs = this.value
              return
            }
          }
        })
        return rs
      }
    }
    if (typeof (str) !== 'undefined') this.each(function (i) { this.value = '' + str })
    return this.e[0].value
  },
  insert: function (str, rDid) {
    var rnode = null
    if (rDid) {
      if (rDid.nodeType === 1) rnode = rDid
      if (rDid.length > 0) rnode = Adom(rDid).e[0]
    }
    if (typeof (str) !== 'undefined') {
      this.each(function (i) {
        this.insertBefore((str.nodeType === 1) ? str : Acan.parseDom('' + str), rnode)
      })
    }
  },
  append: function (str) {
    // this.e[0].innerHTML = this.e[0].innerHTML+html
    if (str.nodeType !== 1) {
      str = Acan.parseDom('' + str)
    }
    if (typeof (str) !== 'undefined') {
      this.each(function (i) {
        this.appendChild(str)
      })
    }
  },
  after: function (str) {
    // this.e[0].innerHTML = this.e[0].innerHTML+html
    var _s = this
    if (Acan.isAele(str)) {
      str = str.e[0]
    }
    if (!Acan.isEle(str)) {
      str = Acan.parseDom('' + str)
    }
    if (!Acan.isEle(str)) return false
    this.each(function (i) {
      var parent = this.parentNode
      if (parent.lastChild === this) parent.appendChild(str)
      else parent.insertBefore(str, this.nextSibling)
    })
  },
  attr: function (name, value) {
    if (Acan.isDefined(value)) {
      this.each(function (i) {
        var _att = document.createAttribute(name)
        _att.nodeValue = value
        this.setAttributeNode(_att)
        return
      })
    }
    var val = null
    if (name === 'tagName') {
      val = this.e[0].tagName
    } else if (this.e[0].getAttribute) {
      val = this.e[0].getAttribute(name)
    } else if (this.e[0].getAttributeNode(name)) {
      val = this.e[0].getAttributeNode(name).nodeValue
    }
    return val
  },
  removeAttr: function (name) {
    this.each(function (i) {
      switch (name) {
        case 'class':
          this.removeAttribute('class')
          break
        case 'className':
          this.removeAttribute('className')
          break
        default:
          this.removeAttribute(name)
      }
    })
  },
  remove: function () {
    this.each(function (i) { this.remove() })
  },
  addClass: function (cls) {
    var self = this
    this.each(function (i) {
      if (!self.hasClass(cls, this)) this.className += ' ' + cls
    })
  },
  removeClass: function (cls) {
    var self = this
    this.each(function (i) {
      if (self.hasClass(cls, this)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        this.className = this.className.replace(reg, ' ')
      }
    })
  },
  hasClass: function (cls, ele) {
    if (!ele) ele = this.e[0]
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  },
  css: function (key, val) {
    var st = this.attr('style')
    if (!st) st = ''
    var sr = (st !== '') ? st.split(';') : []
    var cbj = {}
    if (sr.length > 0) {
      for (var i in sr) {
        if (!Acan.isInt(i)) continue
        var src = sr[i].split(':')
        if (src.length < 2) continue
        var src1 = Acan.trim(src[0])
        src.splice(0, 1)
        var src2 = Acan.trim(src.join(':'))
        if (src1 && src2 && src1.length > 0 && src2.length > 0) {
          cbj[src1] = src2
        }
      }
    }
    if (typeof (key) !== 'object' && key && !val) {
      if (cbj[key]) return cbj[key]
      else return st
    }
    if (typeof (key) === 'object') {
      for (var ki in key) {
        cbj[ki] = key[ki]
        if (Acan.isNum(key[ki]) && ['top', 'left', 'bottom', 'right', 'width', 'height'].indexOf(ki) !== -1) cbj[ki] += 'px'
      }
    } else {
      cbj[key] = val
    }
    st = ''
    this.each(function () {
      for (var i in cbj) {
        this.style[i] = cbj[i]
      }
    })
    for (var i2 in cbj) {
      st += i2 + ':' + cbj[i2] + ';'
    }
    return st
  },
  show: function () {
    this.css('display', 'block')
  },
  hide: function () {
    this.css('display', 'none')
  },
  click: function () {
    this.each(function () { this.click() })
  },
  scrollTo: function (x, y) {
    this.e[0].scrollTo(x, y)
  },
  onpress: function (cb, t) {
    var _press
    if (!t) t = 1000
    this.e[0].onmousedown = function () {
      _press = setTimeout(cb, t) // 这里设置时间
    }
    this.e[0].onmouseup = function () {
      clearTimeout(_press)
    }
  }
}
Adom.prototype = {
  _init_: function (Did, pbj) {
    this.e = {}
    this.Aele = 1
    this.length = 0
    if (Acan.isStr(Did) && Did.indexOf('</') !== -1) {
      var fmt = Acan.parseDom(Did).childNodes
      for (var i in fmt) {
        if (Acan.isInts(i)) this.e[i] = fmt[i]
      }
      this.Did = ''
      return this.rt()
    }
    // 节点转Acan
    if (Acan.isEle(Did)) {
      if (pbj === 'parent') {
        this.e[0] = Did.parentNode
      } else {
        this.e[0] = Did
      }
      this.Did = this.e[0].id
      // this.length=this.e.length
      return this.rt()
    }
    if (!this.Did) this.Did = Did
    if (typeof (this.Did) !== 'string') { return }
    // 查找节点子对象
    if (typeof (pbj) === 'object' && pbj.nodeType === 1) {
      var old = pbj.id
      var id = pbj.id = '__Afind__'
      try {
        this.e = pbj.querySelectorAll('#' + id + ' ' + this.Did)
      } catch (e) {} finally {
        old ? pbj.id = old : pbj.removeAttribute('id')
      }
      return this.rt()
    }
    if (typeof (this.Did) === 'string') {
      this.e = document.querySelectorAll(this.Did)
    }
    return this.rt()
  /*
  if (typeof (this.Did) === 'string' && this.Did.indexOf(' ') !== -1) {
    var Drr = this.Did.split(' ')
    var _obj = Adom(Drr[0])
    for (var i = 1; i < Drr.length; i++) {
      if (Drr[i].length > 1) {
        _obj = _obj.find(Drr[i])
      }
    }
    return _obj
  }
  var tag = this.Did.substr(0, 1)
  var tagname = this.Did.substr(1)
  switch (tag) {
    case '#':
      this.e[0] = ((this.e[0] && this.e[0].nodeType === 1) ? this.e[0] : document).getElementById(tagname)
      break
    case '.':
      this.e = ((this.e[0] && this.e[0].nodeType === 1) ? this.e[0] : document).getElementsByClassName(tagname)
      break
    default:
      // if(Acan.in_array(this.Did,['ul','li','div','p','span','h1','h2','html','textarea','input'])){
      if (this.Did == 'body') {
        this.e[0] = document.body
      } else {
        try {
          var name
          var mrs
          if (typeof (this.Did) === 'string') mrs = this.Did.match(/\[name=('|")*(.*?)('|")*\]/)
          if (mrs && mrs.length > 2) name = mrs[2]
          if (name) {
            this.e = ((this.e[0] && this.e[0].nodeType === 1) ? this.e[0] : document).getElementsByName(name)
            break
          }
        } catch (e) {
          Acan.bug('Acan._init_', e)
        }
        this.e = ((this.e[0] && this.e[0].nodeType === 1) ? this.e[0] : document).getElementsByTagName(this.Did)
      }
      // return false
      break
  }
  if (this.e[0] && this.e[0].tagName === 'IFRAME') {
    this.doc = {}
    for (var i in this.e) {
      // this.doc[i] = this.e[i].contentWindow.document
      this.doc[i] = this.e[i].contentDocument
    }
  }
  if (this.e[0] && this.e[0].nodeType === 1) {
    this.length = 1
    return this.rt()
  } else {
    return false
  } */
  },
  rt: function () {
    if (Acan.isEle(this.e[0])) {
      Acan.extend(this, Adom._p)
    }
    this.length = this.e.length
    return this
  }
}

// 为空 获取当前语言，默认获取系统设置语言
Acan.lang = function (l) {
  if (typeof _lang === 'undefined') {
    _lang = ''
  }
  // -- 获取默认语言
  var langDef = 'en'
  var nl = navigator.language || navigator.browserLanguage
  if (nl.indexOf('zh') !== -1) langDef = 'zh'
  var urlLang = Acan.url('_lang')
  if (l) {
    _lang = l
    Acan.storage.set('_lang', _lang)
    Acan.cookie('_lang', _lang)
    if (Acan.isDefined(urlLang) && _lang !== urlLang) Acan.url('_lang', _lang)
  } else {
    _lang = Acan.storage.get('_lang') || Acan.cookie('_lang') || langDef
    Acan.storage.set('_lang', _lang)
    Acan.cookie('_lang', _lang)
  }
  if (urlLang && urlLang !== _lang) {
    Acan.lang(Acan.url('_lang'))
  }
  return _lang
}

// jQuery on click to touchend
Acan.jQTouch = function () {
  try {
    event.preventDefault()
  } catch (e) {}
  var args = arguments
  var status = true
  var isProxy = false
  var oldcb
  var call = function () {
    event.preventDefault()
    if (isProxy) {
      event.realEle = this
    }
    if (!status) return
    oldcb.apply(this, arguments)
  }
  if (args[1] === 'click' && (Acan.browser.isIos || Acan.browser.isAndroid)) {
    args[0].on('touchstart', function (e) {
      status = true
    })
    args[0].on('touchmove', function (e) {
      status = false
    })
    args[1] = 'touchend'
    if (Acan.isFun(args[2])) {
      oldcb = args[2]
      args[2] = call
    }
    if (Acan.isFun(args[3])) {
      isProxy = true
      oldcb = args[3]
      args[3] = call
    }
  }
  return arguments
}

// 点击事件初始化绑定
Acan.jQTouchReady = function () {
  jQuery('[ajqon]').each(function () {
    var fname = function (f) { // 区分对象和函数的回调
      var rs = ''
      var frr = f.split(':')
      var n = frr[0]
      var nrr = n.split('.')
      if (frr[1]) { // 带指定参数的回调
        rs += 'arguments[0]=' + frr[1] + ';'
      }
      if (nrr.length === 1) {
        rs += 'return ' + n + '.apply(this,arguments)'
      } else if (srr.length === 2) {
        rs += 'return ' + n + '.apply(' + nrr[0] + ',arguments)'
      }
      return rs
    }
    var self = jQuery(this)
    var str = self.attr('ajqon')
    var srr = str.split(';')
    if (srr.length === 1) {
      self.on('click', (new Function(fname(srr[0]))))
    } else if (srr.length === 2) {
      self.on('click', srr[0], (new Function('event.realEle=this;' + fname(srr[1]))))
    }
    self.attr('ajqon_s', 1)
  })
}

Acan.debugInit = function () {
  var debug = Acan.url('debug')
  if (debug === '0') {
    Acan.storage.del('debug')
  } else if (debug) {
    Acan.storage.set('debug', debug)
  }
  Acan.debug.mode = Acan.storage.get('debug')
  if (!Acan.debug.mode || Acan.debug.mode === 'undefined') {
    Acan.debug.enable = 0
  } else {
    Acan.debug.enable = 1
  }
}
Acan.__start = Acan.time('ms')
Acan.isTop = function () {
  if (!top.Acan) return false
  return top.Acan.__start === Acan.__start
}

function AreadyCb (tp) {
  if (Areadyccb.status === 3 && !tp) return
  Acan.debug.log('Areadycb run')
  if (AreadyPre.length > 0) {
    AreadyPre.forEach(function (f, i) {
      try {
        if ((Acan.isFun(f) && !f.__Aready) || tp === 2) {
          f(tp || 0)
          f.__Aready = 1
        }
      } catch (e) { Acan.debug.error('AreadyPre run err:', e) }
    })
  }
  if (Aready.length > 0) {
    Aready.forEach(function (f, i) {
      try {
        if ((Acan.isFun(f) && !f.__Aready) || tp === 2) {
          f(tp || 0)
          f.__Aready = 1
        }
      } catch (e) {
        Acan.debug.error('Aready run err:', f.toString(), e)
      }
    })
  }
}

function insertAfter (newElement, targetElement) {
  var parent = targetElement.parentNode
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

if (!document.querySelectorAll) {
  document.querySelectorAll = function (selectors) {
    var style = document.createElement('style')
    var elements = []
    var element
    document.documentElement.firstChild.appendChild(style)
    document._qsa = []

    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}'
    window.scrollBy(0, 0)
    style.parentNode.removeChild(style)

    while (document._qsa.length) {
      element = document._qsa.shift()
      element.style.removeAttribute('x-qsa')
      elements.push(element)
    }
    document._qsa = null
    return elements
  }
}

if (!document.querySelector) {
  document.querySelector = function (selectors) {
    var elements = document.querySelectorAll(selectors)
    return (elements.length) ? elements[0] : null
  }
}

Acan.debug = function () {
  if (!Acan.debug.enable) return
  Acan.debug.out(arguments)
}
Acan.debug.mobileOut = function (args, stack) {
  var Dom = Adom('#Adebug')
  var html
  if (Dom.e.length === 0) {
    var d = document.createElement('div')
    d.id = 'Adebug'
    insertAfter(d, document.getElementsByTagName('body')[0])
    Dom = Adom(d)
    Dom.on('click', function () {
      Dom.html('')
    })
    html = '<style>\
#Adebug{position:fixed;left:0;top:100px;bottom:50px;padding:0;background:rgba(0,0,0,0.7);color:#fff;word-break:break-all;overflow-y:auto;overflow-x: auto;z-index:99999;}\
#Adebug._hide{display:none;}\
#Adebug ._close{position:absolute;background:rgba(0,255,255);top:0;left:0;width:1em;height:1em;}\
</style>'
    Adom('body').append(html)
  }
  for (var i in args) {
    var str = ''
    if (!Acan.isDefined(args[i])) continue
    else if (Acan.isStr(args[i])) str = args[i]
    else if (args[i] && args[i].stack) {
      str = args[i] + ' ('
      str += args[i].stack.replace(/:\/(.+)\//g, function () {
        return '...' + arguments[0].substr(-16, 16)
      })
    } else str = JSON.stringify(args[i])
    var _d = document.createElement('div')
    _d.innerText = str.replace(/([\n\r\t])+/g, '\n').substr(0, 1024)
    Dom.append(_d)
    Dom.append('<hr>')
    if (Acan.inArr(Acan.debug.mode, ['error', 'trace', 'debug']) && Acan.url('debugmode') !== 'log') {
      _d = document.createElement('div')
      _d.innerText = Acan.debug._trace(stack)
      Dom.append(_d)
      Dom.append('<hr>')
    }
  }
}
Acan.debug._trace = function (str) {
  str = str.replace('Error\n', '')
  if (Acan.debug.mode === 'trace') return str
  else if (Acan.debug.mode === 'error') {
    return str
  } else if (Acan.debug.mode === 'debug') {
    var si = str.indexOf('\n')
    if (si >= 0) return str.substr(0, si)
    else return str
  } else {
    return null
  }
}
Acan.debug.pcOut = function (args, stack, type) {
  var colorCf = {
    'error': 'color:red',
    'trace': 'color:purple',
    'warn': 'color:yellow',
    'info': 'color:blue',
    'log': 'color:gray'
  }
  if (!type) type = 'log'
  var style = colorCf[type]
  for (var i in args) {
    if (args[i] && args[i].stack) {
      console[type](args[i], args[i].stack)
    } else {
      console[type](args[i])
    }
    var _str = Acan.debug._trace(stack)
    if (_str) console.log('%c ' + _str, style)
  }
}
Acan.debug.out = function (args, type, err) {
  if (!Acan.debug.enable) return
  if (Acan.debug.mode === 'error') {
    if (Acan.inArr(type, ['debug', 'info', 'log', 'warn', 'trace'])) return
  } else if (Acan.debug.mode === 'warn') {
    if (Acan.inArr(type, ['debug', 'info', 'log', 'trace'])) return
  } else if (Acan.debug.mode === 'log') {
    if (Acan.inArr(type, ['info'])) return
  } else if (Acan.debug.mode === 'debug') {
    if (Acan.inArr(type, ['info', 'log'])) return
  } else if (Acan.debug.mode === 'all') {
  }
  if (!err) {
    if (Error.captureStackTrace) {
      err = new Error()
      Error.captureStackTrace(err, args.callee)
    } else {
      err = new Error()
    }
  }
  if (!Acan.DomReady) {
    setTimeout(function () {
      Acan.debug.out(args, type, err)
    }, 10)
    return
  }
  if (Acan.browser.isAndroid || Acan.browser.isIphone || Acan.browser.theworld) {
    try {
      Acan.debug.mobileOut(args, err.stack, type)
    } catch (e) { alert(e) }
  } else {
    Acan.debug.pcOut(args, err.stack, type)
  }
}
Acan.debug.log = function () {
  Acan.debug.out(arguments, 'log')
}
Acan.debug.debug = function () {
  Acan.debug.out(arguments, 'debug')
}
Acan.debug.warn = function () {
  Acan.debug.out(arguments, 'warn')
}
Acan.debug.trace = function () {
  Acan.debug.out(arguments, 'trace')
}
Acan.debug.error = function () {
  Acan.debug.out(arguments, 'error')
}
Acan.debug.enable = 0

var Areadyccb = Acan.ccb(2, AreadyCb)
var AreadyPre = []
var Aready = []
var Aloadfile = {css: [], js: []}
var Aloadfilei = 0
var _lang
var AreadyJs = [] // 初始化基础js文件
var isAppcan = false
var AuexOnload = false
var AppcanRoot = '' // 兼容appcan的初始化
isAppcan = Acan.browser.appcan || false
// 等待DOM结构解析完毕
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function () {
    Acan.DomReady = true
    Acan.debug.debug('DOMContentLoaded ok')
    Areadyccb.cb()
  }, false)
}
if (typeof appcan !== 'undefined' || isAppcan) {
  // isAppcan=true
  AppcanRoot = Acan.storage.get('AppcanRoot') || ''
  // AppcanRoot=''
  Acan.lang()
// Ainclude_all('locales/'+_lang+'.js','js',0,function(){})
}

// 按并发载入js
function Ainclude_all (str, filetype, r, cb) {
  Acan.debug.debug('Ainclude_all...')
  var Accbjs
  if (Acan.isArr(str)) {
    if (filetype === 'js') {
      Aloadfilei += str.length
      Accbjs = Acan.ccb(str.length, function () {
        if (cb) cb()
        setTimeout(function () {
          Acan.debug.debug('Ainclude_all ok', Aloadfilei)
          if (Aloadfilei === 0) {
            Areadyccb.cb()
          }
          if (Areadyccb.status === 3) {
            AreadyCb()
          }
        }, 60)
      })
    }
    str.forEach(function (o, k) {
      Ainclude(o, filetype, r, function (err) {
        if (filetype === 'js') {
          Aloadfilei--
          Accbjs.cb()
        }
      })
    })
  } else if (Acan.isStr(str)) {
    Ainclude(str, filetype, r)
  }
}
/*
fname:需要引入的路径
filetype:为引入的文件类型
r:引入根路径，不设置为当前域名
cb:引入成功后的回调
*/
function Ainclude (o, filetype, r, cb) {
  var fname = o
  var env
  if (Acan.isObj(o)) {
    fname = o.path
    if (Acan.isArr(o.env)) env = o.env
  }
  if (!Ainclude._list) Ainclude._list = {}
  var filename = fname
  if (!Ainclude.root) Ainclude.root = ''
  if (r === 1 || Acan.appcanDebug) { // appcan Debug模式
    // var Afileup=Astorageget('Afileup')
    // if(Afileup && Afileup[filename] && Afileup[filename].time) ft=Afileup[filename].time
    // filename=Apath_down+"ictx/"+fname+'?_='+(new Date()).getTime();//+(isAndroid?'':'?_='+ft)
    filename = 'http://is.dev.cheesedu.com/appcan/homestay/phone/' + filename + '?_=' + (new Date()).getTime() //
  } else if (r === 'dev') { // 开发模式
    filename += '?_=' + (new Date()).getTime()
  } else if (fname.indexOf('http://') !== -1) { // 外网

  } else if (Acan.isStr(r) && r.length > 0) { // 自定义根目录
    filename = r + filename
  } else if (isAppcan) { // Appcan 模式下
    filename = AppcanRoot + filename
  } else if (typeof (AcanApp) !== 'undefined') { // 离线本地环境 模式下
    if (filename.indexOf('..') !== 0) filename = '..' + filename
  } else if (fname.indexOf('://') !== -1){ // 默认 模式下
    filename = Ainclude.root + filename
  }
  if (filename.indexOf('?') === -1) filename += '?'
  filename += '&_ver=' + Acan.objGet(Acf, 'lastUpdate.tpl', '')
  if (filename.indexOf('http://') === -1 && location.hostname !== '127.0.0.1' && filename.indexOf('https://') === -1 && location.protocol.indexOf('http') === 0) { // cdn资源判断
    if (Acf && Acf.sfcdnFn) {
      filename = Acf.sfcdnFn(filename)
    }
  }
  Acan.debug.debug(filename)
  if (Ainclude._list[filename]) { // 已经加载过的直接返回
    Acan.debug.debug(filename, 'has load')
    if (cb) cb(null)
    return
  } else if (env) {
    var enverr
    env.forEach(function (v) {
      var _tt
      try {
        _tt = (new Function('return top.' + v))()
      } catch (e) {
        enverr = 1
      }
      if (_tt && !enverr) {
        eval('window.' + v + '=top.' + v)
      } else {
        enverr = 1
        Acan.debug.warn(v, 'top load err')
      }
    })
    if (!enverr) {
      if (o.init) eval('window.' + o.init + '();')
      Acan.debug.debug(filename, 'top load')
      if (cb) cb(null)
      return
    }
  }
  if (!filetype) filetype = 'js'
  var script
  if (filetype === 'js') {
    script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = true
    script.onload = script.onreadystatechange = function (e) {
      Ainclude._list[filename] = 1
      if (cb) cb(null)
      // if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return
      script.onload = script.onreadystatechange = script.onerror = null
      script.src = ''
      script.parentNode.removeChild(script)
      script = null
      return
    }
    script.onerror = function (e) {
      // Acan.debug.error('load js err:'+filename,e)
      if (Acan.browser.isAndroid) {
        // alert('load js err:'+filename+' '+location.href)
        // alert(e.stack)
      }
      Acan.debug.error('load js err:' + filename, e, e.stack, location.href)
      if (isAppcan) {
        setTimeout(function () {
          Ainclude(fname, filetype, r, cb)
        }, 500)
        return
      }
      if (cb) cb('load js err:' + filename)
      return false
    // Afileup = Astorageget('Afileup')
    // if (Afileup && Afileup[fname]) delete Afileup[fname]
    // Astorageset('Afileup', Afileup)
    // // Adowncache()
    // return false
    }
    script.type = 'text/javascript'
    script.src = filename
  } else if (filetype === 'css') {
    script = document.createElement('link')
    script.setAttribute('rel', 'stylesheet')
    script.setAttribute('type', 'text/css')
    script.setAttribute('href', filename)
  }
  if (typeof script !== 'undefined') {
    try {
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(script, s)
    } catch (e) { Acan.debug.error(e) }
  }
}

if (isAppcan && Acan.isTop()) {
  Areadyccb.at()
  Acan.debug.debug('uexOnload load...')
  window.uexOnload = function (type) {
    var uexChk = function () {
      if (AuexOnload) return
      if (typeof (uexWindow) === 'undefined') {
        setTimeout(function () { uexChk() }, 10)
        return
      }
      AuexOnload = true
      Acan.debug.debug('uexOnload ok', location.href)
      Areadyccb.cb()
    }
    uexChk()
  }
}
if (Acan.browser.theworld) {
  var _consoleLog = console.log
  console.log = function () {
    if (Acan.debug.initss) {
      Acan.debug.apply(Acan.debug, arguments)
    } else {
      _consoleLog.apply(console, arguments)
    }
  }
}

var Aresize = []

AreadyPre.push(function () {
  Acan.debug.initss = 1
  setTimeout(function () {
    window.onresize = function () {
      Acan.debug.log('window resize', Aresize.length)
      Aresize.forEach(function (cb) {
        if (cb) cb()
      })
    }
    Acan.debug.log('window resize init', Aresize.length)
  }, 500)
})


Acan.debugInit()
