import request from '@/utils/request'

export function example(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
