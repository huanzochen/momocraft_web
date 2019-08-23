const moment = require('moment');
const _ = require('lodash');

const Common = require('../models/common');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    req.session.user = '';
    res.redirect('https://' + req.hostname + '/');
};

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

