require('dotenv').config()
const db = require('../util/momodb')
const moment = require('moment')

module.exports = class {
  // WRITE
  static forgetEmailSend(req, res, email, success) {
    return db.execute('INSERT INTO `web`.`forgetlog` (`email`, `success`,`updated_time`) VALUES(?, ?, ?)', [email, success, moment().format()])
  }

  static forgetTimesQuery(req, res, email, time) {
    return db.execute('SELECT email,success FROM web.forgetlog where email = ? AND updated_time > ? AND success = true', [email, time])
  }
} 