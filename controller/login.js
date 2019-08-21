const moment = require('moment');
const _ = require('lodash');

const Member = require('../models/member');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    let member;

    const getMember = await Member.getMember()
    .then(([rows]) => {
        member = rows;
    })

    console.dir(member);
    res.render('login', {
        title: 'momocraft',
        _: _,
        member: member
     });
};

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

