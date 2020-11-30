require('dotenv').config()
const web = require('../util/webdb')
const moment = require('moment')

module.exports = class {
  // WRITE
  static errorLogin(req, res, account) {
    return web.execute('INSERT INTO `web`.`loginlog` (`account`, `success`, `updated_time`) VALUES(?, ?, ?)', [account, false, moment().format()])
  }
  static successLogin(req, res, account) {
    return web.execute('INSERT INTO `web`.`loginlog` (`account`, `success`, `updated_time`) VALUES(?, ?, ?)', [account, true, moment().format()])
  }
  static loginErrorTimes(req, res, account, time) {
    return web.execute('SELECT account, success FROM web.loginlog where account = ? AND updated_time > ? AND success = false', [account, time])
  }
} 