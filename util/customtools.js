const _ = require('lodash');



const findarray = (rows, column, value) => {
    return (_.map(rows, column).indexOf(value))
}

const getsalt = (password) => {
    let line = password.split('$');
    return line[2];
}

const getpwd = (password) => {
    let line = password.split('$');
    return line[3];
}


/** usage 
console.dir(verify[tool(verify,"act_name",req.body.account)].pwd);
*/

module.exports = {
    findarray,
    getsalt,
    getpwd
};
