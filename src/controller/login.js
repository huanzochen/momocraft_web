const moment = require('moment');
const _ = require('lodash');
const session = require('express-session')

const app = require('../app');
const fd = require('../util/findarray');
const crypt = require('../util/crypt');

const Common = require('../models/common');
const Member = require('../models/member');
const LoginLog = require('../models/loginlog');

let hour = 3600 * 1000;

/* READ *****************************************/

const getPage = async (req, res, next) => {

    await Member.getFieldLength(req,res)
    .then(([rows]) => {
        fieldlength = rows;
    })
    .catch(err => console.dir(err));
    res.render('login', {
        _: _,
        errorcode: '',
        session: req.session,
        fieldlength: fieldlength,
        currentPage: 'login'
     });
};

/* SUBMIT **********************************/

const submitData = async (req, res, next) => {
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
            errorcode: '查無此帳號或密碼錯誤!',
            session: req.session,
            currentPage: 'login'
        });
    }
    else {
        await LoginLog.loginErrorTimes(req,res,verify[0].uuid, moment().subtract(1, 'hour').format())
        .then(([rows]) => {
            errorTimes = rows;
        })
        .catch(err => console.dir(err));
        if( errorTimes.length > 5) {
            res.render('login', { 
                _: _,
                errorcode: '密碼錯誤多次, 請稍後在試',
                session: req.session,
                currentPage: 'login'
            });
        }
        /*  檢查密碼是否正確 */
        let pwdcheck = crypt.crypt(req.body.password);
        if (pwdcheck == verify[(_.map(verify, "act_name").indexOf(req.body.account))].pwd){
            console.dir("密碼核對正確!");
            await LoginLog.successLogin(req,res,verify)
            if (req.session.views) {
                /* 密碼正確，返回 */
                req.session.views++;
                req.session.user = req.body.account;
                console.dir("Information about session and cookie");
                console.dir(req.session);
                console.dir(req.session.cookie);
                res.redirect('/');
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
            await LoginLog.errorLogin(req,res,verify)
            console.dir("密碼核對錯誤!");
            console.dir("用戶資料");
            console.dir(verify);
            res.render('login', { 
                _: _,
                errorcode: '查無此帳號或密碼錯誤!',
                session: req.session,
                currentPage: 'login'
            });
        }
    }
}

/* FORGET PASSWORD **********************************/


const forgetPasswordGetPage = async(req, res, next) => {
    res.render('forget_password', { 
        _: _,
        errorcode: '',
        session: req.session,
        currentPage: 'forget_password'
    });
}

const forgetPasswordSubmit = async(req, res, next) => {
    console.log('req.body')
    console.log(req.body)
}






/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */



exports.getPage = getPage
exports.submitData = submitData
exports.forgetPasswordGetPage = forgetPasswordGetPage
exports.forgetPasswordSubmit = forgetPasswordSubmit