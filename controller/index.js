const moment = require('moment');

const Common = require('../models/common');

exports.getPage = async (req, res, next) => {
    let common;

    const getCommon = await Common.getCommon()
    .then(([rows]) => {
        common = rows;
    })

    let data = {
        common: common
    }


    res.render('index', {
        title: 'momocraft',
        common: common
     });
}
