const db = require('../util/momodb');


// READ

module.exports = class {
    static getCommon() {
        return db.query('SELECT * FROM web.common;');
    }




}