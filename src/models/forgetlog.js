require('dotenv').config()
const web = require('../util/webdb')
const moment = require('moment')

module.exports = class {
  // WRITE
  static forgetEmailSend(req, res, email, success, token) {
    return web.execute('INSERT INTO `web`.`forgetlog` (`email`, `success`, `token`, `token_used`, `updated_time`) VALUES(?, ?, ?, ?, ?)', [email, success, token, false, moment().format()])
  }
  static forgetTimesQuery(req, res, email, time) {
    return web.execute('SELECT email, success FROM web.forgetlog WHERE email = ? AND updated_time > ? AND success = true', [email, time])
  }
  static tokenIsExpired(req, res, token, time) {
    return web.execute('SELECT email, token, updated_time FROM web.forgetlog WHERE token = ? AND updated_time > ? AND token_used = false ', [token, time])
  }
  static tokenExpired(req, res, token) {
    return web.execute('UPDATE web.forgetlog SET token_used = true WHERE token = ?', [token])
  }
} 