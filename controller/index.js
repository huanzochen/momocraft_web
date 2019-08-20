const moment = require('moment');
const _ = require('lodash');

const Common = require('../models/common');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    let common;

    const getCommon = await Common.getCommon()
    .then(([rows]) => {
        console.dir(rows[(_.map(rows, "name").indexOf("info"))].text);
        common = rows;
    })

    let data = {
        common: common
    }

    res.render('index', {
        title: 'momocraft',
        common: common
     });
};
