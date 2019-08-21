const moment = require('moment');
const _ = require('lodash');

const member = require('../models/member');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    let member;

    const getMember = await member.getMember()
    .then(([rows]) => {
        member = rows;
    })

    res.render('login', {
        title: 'momocraft',
        _: _,
        member: member
     });
};

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

