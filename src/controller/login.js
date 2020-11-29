"use strict";
require('dotenv').config()
const moment = require('moment');
const _ = require('lodash');
const session = require('express-session')
const nodemailer = require("nodemailer");

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
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"茉茉醬" <noreply@mail.momocraft.tw>', // sender address
        to: ['momoservertw@gmail.com'], // list of receivers
        subject: "安安你好嗎", // Subject line
        text: "請開啟信箱的 HTML 信件功能來閱讀這封信", // plain text body
        html: `
        <html>
            <head>
                <meta charset="utf-8">
                <style></style>
            </head>
            <body>
                <p>測試~~</p>
                <p>你好啊</p>
            </body>
        </html>
      `
    });
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.render('forget_password', { 
        _: _,
        errorcode: '請查收你的郵件並重設密碼喔~',
        session: req.session,
        currentPage: 'forget_password'
    });
}






/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */



exports.getPage = getPage
exports.submitData = submitData
exports.forgetPasswordGetPage = forgetPasswordGetPage
exports.forgetPasswordSubmit = forgetPasswordSubmit