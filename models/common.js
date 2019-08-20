import db from '../util/momocraftweb.js';

module.exports = class {
    
    static getCommon(){
        return db.query('SELECT * FROM web.common;', function (error, results, fields) {
            if(err) throw err;
        });
    }




}