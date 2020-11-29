const _ = require('lodash')

module.exports = function (rows, column, value) {
  return _.map(rows, column).indexOf(value)
}

/** usage 
console.dir(verify[fd(verify,"act_name",req.body.account)].pwd);
*/