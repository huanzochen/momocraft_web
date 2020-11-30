const web = require('../util/momodb')

// @deprecated
// WRITE

module.exports = class {
  static insertSession(req, res) {
    console.dir(req.session)
    console.dir(req.body.account)
    return web.query('INSERT INTO `web`.`session` (`act_name`, `content`) VALUES (?, ?) ', [req.body.account, String(req.session)])
  }
  static updateSession(req, res) {
    return web.query('UPDATE `web`.`session` SET `content` = ? WHERE (`act_name` = ?)', [req.session, req.body.account])
  }
}
