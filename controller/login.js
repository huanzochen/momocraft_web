const moment = require('moment');
const _ = require('lodash');
const fd = require('../util/findarray');
const crypto = require('crypto');
const session = require('express-session')
const app = require('../app');


const Member = require('../models/member');
const Sess = require('../models/session');


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

/* SUBMIT **********************************/

exports.submitData = async (req, res, next) => {
    let verify;
    let mem;

    const submit = await Member.queryMember(req,res)
        .then(([rows]) => {
            verify = rows;
        })
        .catch(err => console.log(err));

    if(req.body.password == verify[(_.map(verify, "act_name").indexOf(req.body.account))].pwd){
        console.dir("ya!");
    }
    else {
        console.dir("NOOO!");
    }

    const hash = crypto.createHmac('sha256', 'momopig260')
                   .digest('hex');
    


    var hour = 3600 * 1000;
    req.session.cookie.name = req.body.account;
    req.session.cookie.expires = new Date(Date.now() + hour)

    if(req.session){
        console.dir(hash);
        console.dir(mem);
    }




}





/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

