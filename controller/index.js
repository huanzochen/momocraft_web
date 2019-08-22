const moment = require('moment');
const _ = require('lodash');

const Common = require('../models/common');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    let common;

    const getCommon = await Common.getCommon()
    .then(([rows]) => {
        common = rows;
    });

    res.render('index', {
        title: 'momocraft',
        _: _,
        common: common
     });
};

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

