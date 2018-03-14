export function uploadPrefixUrl(url) {
  if (!url) {
    return ''
  }
  if (url.indexOf('http') !== -1) {
    return url
  }
  var baseUrl
  if (process.env.NODE_ENV === 'development') {
    baseUrl = require('../../config/dev.env').BASE_API
  } else {
    baseUrl = require('../../config/prod.env').BASE_API
  }
  return baseUrl.replace(/"/g, '') + url
}