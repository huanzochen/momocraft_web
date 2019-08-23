const moment = require('moment');
const _ = require('lodash');
const session = require('express-session')

const app = require('../app');
const fd = require('../util/findarray');
const crypt = require('../util/crypt');

const Member = require('../models/member');

let hour = 3600 * 1000;

/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    let fieldlength;

    await Member.getFieldLength(req,res)
    .then(([rows]) => {
        fieldlength = rows;
    })
    .catch(err => console.dir(err));
    res.render('login', {
        _: _,
        errorcode: '',
        fieldlength
     });
};

/* SUBMIT **********************************/

exports.submitData = async (req, res, next) => {
    let verify;

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
    

    /*  檢查用戶是否存在 */ 
    if (JSON.stringify(verify) === '[]') {
        console.dir("此用戶不存在");
        res.render('login', { 
            _: _,
            errorcode: '查無此帳號或密碼錯誤!'
        });
    }
    else {
        /*  檢查密碼是否正確 */
        let pwdcheck = crypt(req.body.password);
        if (pwdcheck == verify[(_.map(verify, "act_name").indexOf(req.body.account))].pwd){
            console.dir("密碼核對正確!");
            if (req.session) {
                /* 密碼正確，返回 */
                req.session.views++;
            }
            else {
                /* 密碼正確且此session初次造訪網站 */
                req.session.views = 1;
                req.session.cookie.expires = Date(Date.now() + hour);
                req.session.loginID = req.body.account;
            }
        }
        else {
            console.dir("密碼核對錯誤!");
            console.dir("用戶資料");
            console.dir(verify);
            res.render('login', { 
                _: _,
                errorcode: '查無此帳號或密碼錯誤!'
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

