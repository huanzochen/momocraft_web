const _ = require('lodash')
const crypto = require('crypto')
const tool = require('./cutomtools')

/**
   * 將輸入的字串套 authme 密碼演算法回傳 authme 格式的密碼
   *
   * @param {String} cryptstring
   * @param {String} stringInAuthme 在 Authme 中的 passwordString, 用於提取 salt
   * @return {String}  hash 過的 cryptstring 使其符合 authme 格式的密碼
   */
const validate = (originPassword, stringInAuthme) => {
  const hash = crypto.createHash('sha256')
    .update(originPassword)
    .digest('hex')
  return crypto.createHash('sha256')
    .update(hash + tool.getsalt(stringInAuthme))
    .digest('hex')
}

const newPassword = (originPassword, stringInAuthme) => {
  const hash = crypto.createHash('sha256')
    .update(originPassword)
    .digest('hex')
  return '$'.concat(
    tool.gettype(stringInAuthme), 
    '$', 
    tool.getsalt(stringInAuthme), 
    '$', 
    crypto.createHash('sha256')
      .update(hash + tool.getsalt(stringInAuthme))
      .digest('hex')
  )
}

const generateToken = () => {
  return crypto.randomBytes(25).toString('hex')
}


module.exports = {
  validate,
  newPassword,
  generateToken
}



