
export const Codes = [{
  code: '301002'
}, {
  code: '301000',
  flag: true,
  msg: '登录成功'
}, {
  code: '303000'
}]
export function filterCode(code) {
  var find = Codes.find((v) => v.code === code)
  return find
}
