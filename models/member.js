const db = require('../util/momodb');


// READ

module.exports = class Category{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    static getMember() {
        return db.query('SELECT * FROM web.common;');
    }




}