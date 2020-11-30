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
    .update(originPassword)
    .digest('hex')
  return crypto.createHash('sha256')
    .update(hash + tool.getsalt(stringInAuthme))
    .digest('hex')
}

const generateToken = () => {
  const hash = crypto.createHmac('sha256', 'emilyisno.1')
    .update('I love cupcakes')
    .digest('hex')
  // return hash
  return crypto.randomBytes(25).toString('hex')
}


module.exports = {
  validate,
  generateToken
}



