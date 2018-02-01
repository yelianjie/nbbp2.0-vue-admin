export function uploadPrefixUrl(url) {
  var baseUrl
  if (process.env.NODE_ENV === 'development') {
    baseUrl = require('../../config/dev.env').BASE_API
  } else {
    baseUrl = require('../../config/prod.env').BASE_API
  }
  return baseUrl.replace(/"/g, '') + url
}