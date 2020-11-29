require('dotenv').config()
const db = require('../util/momodb');
const moment = require('moment');

module.exports = class {
    // WRITE
    static errorLogin(req, res,verify) {
        let uuid = verify[0].uuid;
        return(db.execute('INSERT INTO `web`.`loginlog` (`uuid`, `success`, `updated_time`) VALUES(?, ?, ?)', [uuid,false,moment().format()]));
    }
    static successLogin(req, res,verify) {
        let uuid = verify[0].uuid;
        return(db.execute('INSERT INTO `web`.`loginlog` (`uuid`, `success`, `updated_time`) VALUES(?, ?, ?)', [uuid,true,moment().format()]));
    }

    static loginErrorTimes(req, res, uuid, time) {
        console.log('time')
        console.log(time)
        return(db.execute('SELECT uuid,success FROM web.loginlog where uuid = ? AND updated_time > ? AND success = false', [uuid, time]));
    }
} 