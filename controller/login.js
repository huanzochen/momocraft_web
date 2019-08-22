const moment = require('moment');
const _ = require('lodash');
const session = require('express-session')

const app = require('../app');
const fd = require('../util/findarray');
const crypt = require('../util/crypt');

const Member = require('../models/member');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    res.render('login', {
        title: 'momocraft',
        _: _,
        errorcode: ''
     });
};

/* SUBMIT **********************************/

exports.submitData = async (req, res, next) => {
    let verify;

    const submit = await Member.queryMember(req,res)
        .then(([rows]) => {
            verify = rows;
        })
        .catch(err => console.dir(err));

    if (JSON.stringify(verify) === '[]') {
        console.dir("此用戶不存在");
        res.render('login', { 
            errorcode: '查無此帳號或密碼錯誤!' 
        });
    }
    else {
        console.dir(verify);
        let pwdcheck = crypt(req,res, next);
        if (pwdcheck == verify[(_.map(verify, "act_name").indexOf(req.body.account))].pwd){
            var hour = 3600 * 1000;
            console.dir("密碼核對正確!");
            if (req.session) {
                req.session.views++;
            }
            else {
                req.session.views = 1;
                req.session.cookie.name = req.body.account;
                req.session.cookie.expires = new Date(Date.now() + hour);
                req.session.loginID = req.body.account;
            }
        }
        else {
            console.dir("密碼核對錯誤!");
            console.dir(verify);
            res.render('login', { 
                errorcode: '查無此帳號或密碼錯誤!'
            });
        }
    }




}





/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

