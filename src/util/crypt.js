const _ = require('lodash')
const crypto = require('crypto')
const tool = require('./cutomtools')

/**
   * 將輸入的字串套 authme 密碼演算法
   *
   * @param {String} cryptstring
   * @param {String} stringInAuthme 在 Authme 中的 passwordString, 用於提取 salt
   * @return {String}  hash 過的 cryptstring 使其符合 stringInAuthme 格式
   */
// authme 密碼演算法
const validate = (originPassword, stringInAuthme) => {
  const hash = crypto.createHash('sha256')
  const hash2 = crypto.createHash('sha256')
  hash.update(originPassword)
  hash2.update(hash.digest('hex') + tool.getsalt(stringInAuthme))
  return hash2.digest('hex')
}


module.exports = {
  validate
}



