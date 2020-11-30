const web = require('../util/webdb')


// READ

module.exports = class {
  static getCommon() {
    return web.query('SELECT * FROM web.common;')
  }




}