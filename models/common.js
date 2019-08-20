const db = require('../util/momocraftweb.js');


// READ

module.exports = class Category{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    static getCommon() {
        return db.query('SELECT * FROM web.common;');
    }




}