const db = require('../util/momodb');

// @deprecated
// WRITE

module.exports = class {
    static insertSession(req,res) {
        console.dir(req.session);
        console.dir(req.body.account);
        return db.query('INSERT INTO `web`.`session` (`act_name`, `content`) VALUES (?, ?) ', [req.body.account, String(req.session)] );
    }
    static updateSession(req,res) {
        return db.query('UPDATE `web`.`session` SET `content` = ? WHERE (`act_name` = ?)', [req.session, req.body.account] );
    }
}
