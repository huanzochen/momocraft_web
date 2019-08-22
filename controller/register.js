const moment = require('moment');
const _ = require('lodash');
const session = require('express-session')

const app = require('../app');
const fd = require('../util/findarray');

const Member = require('../models/member');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    res.render('register', {
        _: _,
        errorcode: ''
    });
};

/* SUBMIT **********************************/

exports.submitData = async (req, res, next) => {
    let fieldlength;
    let isregistered;

    await Member.getFieldLength(req,res)
        .then(([rows]) => {
            fieldlength = rows;
        })
        .catch(err => console.dir(err));

    /* 強制限制欄位為DB限制之長度(防有人偷改)*/
    req.body.account = (req.body.account).substr(0, (fieldlength[(_.map(fieldlength, "COLUMN_NAME").indexOf("act_name"))].CHARACTER_MAXIMUM_LENGTH));
    req.body.password =  (req.body.password).substr(0, (fieldlength[(_.map(fieldlength, "COLUMN_NAME").indexOf("pwd"))].CHARACTER_MAXIMUM_LENGTH));
    req.body.passwordCheck =  (req.body.passwordCheck).substr(0, (fieldlength[(_.map(fieldlength, "COLUMN_NAME").indexOf("pwd"))].CHARACTER_MAXIMUM_LENGTH));
    req.body.email =  (req.body.email).substr(0, (fieldlength[(_.map(fieldlength, "COLUMN_NAME").indexOf("email"))].CHARACTER_MAXIMUM_LENGTH));
    if (req.body.password.length < 5) {
        res.render('register', {
            _: _,
            errorcode: '密碼長度不足'
        });
    }
    if (req.body.passwordCheck != req.body.password) {
        res.render('register', {
            _: _,
            errorcode: '請輸入兩次相同的密碼'
        });
    }

    await Member.writeNewMember(req,res)
        .then(([rows]) => {
            isregistered = rows;
        })
        .catch(err => {
            if (err.sqlState == 23000) {
                res.render('register', {
                    _: _,
                    errorcode: '帳號名稱已存在，請更換帳號名稱'
                });
            }
            else {
                res.render('register', {
                    _: _,
                    errorcode: '未知錯誤，請聯絡管理員'
                });
            }
        });
    if (isregistered.affectedRows == 1) {
        res.render('register', {
            _: _,
            errorcode: '註冊成功!請登入'
        });
    }
    else {
        res.render('register', {
            _: _,
            errorcode: '出現未知錯誤!請聯繫管理員'
        });
    }



}





/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

