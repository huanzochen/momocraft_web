const moment = require('moment');
const _ = require('lodash');
const session = require('express-session')

const app = require('../app');
const tool = require('../util/customtools');
const crypt = require('../util/crypt');

const Common = require('../models/common');
const Member = require('../models/member');

let hour = 3600 * 1000;

/* READ *****************************************/

exports.getPage = async (req, res, next) => {

    await Member.getFieldLength(req,res)
    .then(([rows]) => {
        fieldlength = rows;
    })
    .catch(err => console.dir(err));
    res.render('login', {
        _: _,
        errorcode: '',
        session: req.session,
        fieldlength: fieldlength
     });
};

/* SUBMIT **********************************/

exports.submitData = async (req, res, next) => {

    await Member.getFieldLength(req,res)
        .then(([rows]) => {
            fieldlength = rows;
        })
        .catch(err => console.dir(err));

    /* 強制限制欄位為DB限制之長度(防有人偷改) */
    req.body.account = (req.body.account).substr(0, (fieldlength[(_.map(fieldlength, "COLUMN_NAME").indexOf("act_name"))].CHARACTER_MAXIMUM_LENGTH));
    req.body.password =  (req.body.password).substr(0, (fieldlength[(_.map(fieldlength, "COLUMN_NAME").indexOf("pwd"))].CHARACTER_MAXIMUM_LENGTH));

    await Member.queryMember(req,res)
        .then(([rows]) => {
            verify = rows;
        })
        .catch(err => console.dir(err));

    await Member.queryMomocraftmember(req,res)
        .then(([rows]) => {
            momocraftMember = rows;
        })
        .catch(err => console.dir(err));

    /*  檢查用戶是否存在 */ 
    if (JSON.stringify(momocraftMember) === '[]') {
        console.dir("此用戶不存在");
        res.render('login', { 
            _: _,
            errorcode: '查無此帳號或密碼錯誤!',
            session: req.session
        });
    }
    else {
        console.log('req.ip')
        console.log(req.ip)
        /*  檢查密碼是否正確 */
        let pwdcheck = crypt.validate(req.body.password, momocraftMember[(_.map(momocraftMember, "realname").indexOf(req.body.account))].password);
        if (pwdcheck == tool.getpwd(momocraftMember[(_.map(momocraftMember, "realname").indexOf(req.body.account))].password)){
            console.dir("密碼核對正確!");
            if (req.session.views) {
                /* 密碼正確，返回 */
                req.session.views++;
                req.session.user = req.body.account;
                console.dir("Information about session and cookie");
                console.dir(req.session);
                console.dir(req.session.cookie);
                res.redirect('https://' + req.hostname + '/');
            }
            else {
                /* 密碼正確且此session初次造訪網站 */
                req.session.views = 1;
                /* 密碼正確，返回 */
                req.session.views++;
                req.session.user = req.body.account;
                console.dir("Information about session and cookie");
                console.dir(req.session);
                console.dir(req.session.cookie);
                res.redirect('/');
            }
        }
        else {
            console.dir("密碼核對錯誤!");
            console.dir("用戶資料");
            console.dir(pwdcheck);
            res.render('login', { 
                _: _,
                errorcode: '查無此帳號或密碼錯誤!',
                session: req.session
            });
            /*
            let test = Date.now();
            console.dir(Date(test));
            test += 3600000;
            console.dir(Date(test));
            req.session.cookie.maxAge = Date.now() + 3600000;
            req.session.cookie.name = req.body.account;
            console.dir(Date(req.session.cookie.originalMaxAge));
            
            req.session.loginID = req.body.account;
            console.dir(req.session.cookie);
            console.dir(req.session);
            */
        }
    }
}





/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

