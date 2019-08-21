const moment = require('moment');
const _ = require('lodash');

const Common = require('../models/common');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    let common;

    const getCommon = await Common.getCommon()
    .then(([rows]) => {
        common = rows;
    })

    let data = {
        common: common,
        _: _
    }

    res.render('index', {
        title: 'momocraft',
        common: common,
        _: _
     });
};

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

