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

    
    // 可以用 req.session 拿取存在 session 的值
    // 這邊判斷有沒有 req.session.views
    // 如果有的話就 +1，反之初始化成 1
    // 所以 req.session 可讀也可寫
    if (req.session.views) {
        req.session.views++
        console.dir('viewsID: ' + req.session);
    } else {
        req.session.views = 1
        var hour = 3600 * 1000;
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour
    }
    console.dir('viewsID: ' + req.session);
    console.dir(req.session);

    res.render('index', {
        title: 'momocraft',
        common: common,
        _: _
     });
};

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

