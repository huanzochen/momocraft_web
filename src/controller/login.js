'use strict'
require('dotenv').config()
const moment = require('moment')
const _ = require('lodash')
const session = require('express-session')
const nodemailer = require('nodemailer')

const app = require('../app')
const tool = require('../util/cutomtools')
const crypt = require('../util/crypt')

const Common = require('../models/common')
const Member = require('../models/member')
const LoginLog = require('../models/loginlog')
const ForgetLog = require('../models/forgetlog')

let hour = 3600 * 1000

/* READ *****************************************/

const getPage = async (req, res, next) => {
  let fieldlength
  await Member.getFieldLength(req, res)
    .then(([rows]) => {
      fieldlength = rows
    })
    .catch(err => console.dir(err))
  res.render('login', {
    _: _,
    errorcode: '',
    session: req.session,
    fieldlength: fieldlength,
    currentPage: 'login'
  })
}

/* SUBMIT **********************************/

const submitData = async (req, res, next) => {
  let fieldlength
  let momocraftMember
  let errorTimes

  await Member.getFieldLength(req, res)
    .then(([rows]) => {
      fieldlength = rows
    })
    .catch(err => console.dir(err))

  /* 強制限制欄位為DB限制之長度(防有人偷改) */
  req.body.account = req.body.account.substr(0, fieldlength[_.map(fieldlength, 'COLUMN_NAME').indexOf('realname')].CHARACTER_MAXIMUM_LENGTH)
  let account = req.body.account
  await Member.queryMomocraftMember(req, res, account)
    .then(([rows]) => {
      momocraftMember = rows
    })
    .catch(err => console.dir(err))

  /*  檢查用戶是否存在 */ 
  if (JSON.stringify(momocraftMember) === '[]') {
    console.dir('此用戶不存在')
    res.render('login', { 
      _: _,
      errorcode: '查無此帳號或密碼錯誤!',
      fieldlength: fieldlength,
      session: req.session,
      currentPage: 'login'
    })
    return
  }
  else {
    await LoginLog.loginErrorTimes(req, res,
      momocraftMember[_.map(momocraftMember, 'realname').indexOf(req.body.account)].realname,
      moment().subtract(1, 'hour').format()
    )
      .then(([rows]) => {
        errorTimes = rows
      })
      .catch(err => console.dir(err))
    if (errorTimes.length > 5) {
      res.render('login', { 
        _: _,
        errorcode: '密碼錯誤多次, 請稍後在試',
        fieldlength: fieldlength,
        session: req.session,
        currentPage: 'login'
      })
      return
    }

    /*  檢查密碼是否正確 */
    // 將使用者輸入的密碼 pwdcheck 套 authme 演算法與 DB 中的密碼比對
    let pwdcheck = crypt.validate(req.body.password, momocraftMember[_.map(momocraftMember, 'realname').indexOf(req.body.account)].password)
    if (pwdcheck === tool.getpwd(momocraftMember[_.map(momocraftMember, 'realname').indexOf(req.body.account)].password)) {
      console.dir('密碼核對正確!')
      await LoginLog.successLogin(req, res,
        momocraftMember[_.map(momocraftMember, 'realname').indexOf(req.body.account)].realname
      )
      if (req.session.views) {

        /* 密碼正確，返回 */
        req.session.views++
        req.session.user = req.body.account
        console.dir('Information about session and cookie')
        console.dir(req.session)
        console.dir(req.session.cookie)
        res.redirect('/')
      }
      else {

        /* 密碼正確且此session初次造訪網站 */
        req.session.views = 1

        /* 密碼正確，返回 */
        req.session.views++
        req.session.user = req.body.account
        console.dir('Information about session and cookie')
        console.dir(req.session)
        console.dir(req.session.cookie)
        res.redirect('/')
      }
    }
    else {
      await LoginLog.errorLogin(req, res,
        momocraftMember[_.map(momocraftMember, 'realname').indexOf(req.body.account)].realname
      )
      console.dir('密碼核對錯誤!')
      console.dir('用戶資料')
      console.dir(momocraftMember)
      res.render('login', { 
        _: _,
        errorcode: '查無此帳號或密碼錯誤!',
        fieldlength: fieldlength,
        session: req.session,
        currentPage: 'login'
      })
    }
  }
}

/* FORGET PASSWORD **********************************/


const forgetPasswordGetPage = async(req, res, next) => {
  res.render('forget_password', { 
    _: _,
    errorcode: '',
    session: req.session,
    currentPage: 'forget_password',
    state: ''
  })
}

const forgetPasswordSubmit = async(req, res, next) => {
  console.log('req.body')
  console.log(req.body)
  let forgetTimes
  let momocraftMember
  const email = req.body.email
  await Member.queryMomocraftEmail(req, res, email)
    .then(([rows]) => {
      momocraftMember = rows
    })
    .catch(err => {
      console.dir(err) 
      return
    })

  /*  檢查用戶是否存在 */ 
  if (JSON.stringify(momocraftMember) === '[]') {
    console.dir('此用戶不存在')
    res.render('forget_password', { 
      _: _,
      errorcode: '查無此帳號~',
      session: req.session,
      currentPage: 'forget_password',
      state: ''
    })
    return
  }
  await ForgetLog.forgetTimesQuery(req, res, email, moment().subtract(1, 'hour').format())
    .then(([rows]) => {
      forgetTimes = rows
    })
    .catch(err => console.dir(err))
  // if (forgetTimes.length > 5) {
  //   res.render('forget_password', { 
  //     _: _,
  //     errorcode: '你提交太多重設密碼請求了 ><',
  //     session: req.session,
  //     currentPage: 'forget_password',
  //     state: ''
  //   })
  //   return 
  // }

  let emailResetToken = crypt.generateToken()
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
  })
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"茉茉醬💗" <noreply@mail.momocraft.tw>', // sender address
    to: [email], // list of receivers
    subject: '茉茉🌺伺服器-密碼重設信件', // Subject line
    text: '請開啟信箱的 HTML 信件功能來閱讀這封信', // plain text body
    html: `
        <html>
            <head>
                <meta charset="utf-8">
                <style></style>
            </head>
            <body>
                <p>忘記密碼了嗎 🤪🤪🤪</p>
                <p>點擊此連結來重設你的密碼噢😋</p>
                <p>連結將在 3 小時候失效🤗</p>
                <a href="${process.env.APP_URL}/forget/resetPassword/${emailResetToken}"> 
                ${process.env.APP_URL}/forget/resetPassword/${emailResetToken}</a>
            </body>
        </html>
      `
  })
  console.log('Message sent: %s', info.messageId)
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  await ForgetLog.forgetEmailSend(req, res, email, true, emailResetToken)
  res.render('forget_password', { 
    _: _,
    errorcode: '請查收你的郵件並重設密碼喔~',
    session: req.session,
    currentPage: 'forget_password',
    state: ''
  })
}

const resetPassword = async(req, res, next) => {
  let token = req.params.token
  let tokenUser
  await ForgetLog.tokenIsExpired(req, res, 
    token,
    moment().subtract(3, 'hour').format()
  )
    .then(([rows]) => {
      tokenUser = rows
    })
    .catch(err => console.dir(err))

  /*  檢查 token 是否有效 */ 
  if (JSON.stringify(tokenUser) === '[]') {
    console.dir('該連結已失效或無效')
    res.render('forget_password', { 
      _: _,
      errorcode: '該連結已經失效囉',
      session: req.session,
      currentPage: 'forget_password',
      token: token,
      state: ''
    })
    return
  }
  else {
    console.log('該重設密碼 token 有效!')
    res.render('forget_password', { 
      _: _,
      errorcode: '',
      session: req.session,
      currentPage: 'forget_password',
      token: token,
      state: 'resetpassword'
    })
  }
}

const resetPasswordSubmit = async(req, res, next) => {
  let token = req.params.token
  let tokenUser
  let momocraftMember
  let forgetEmail
  let fieldlength
  await ForgetLog.tokenIsExpired(req, res, 
    token, 
    moment().subtract(3, 'hour').format()
  )
    .then(([rows]) => {
      tokenUser = rows
    })
    .catch(err => console.dir(err))

  /*  檢查 token 是否有效 */ 
  if (JSON.stringify(tokenUser) === '[]') {
    console.dir('該連結已失效或無效')
    res.render('forget_password', { 
      _: _,
      errorcode: '該重設連結已經失效囉',
      session: req.session,
      currentPage: 'forget_password',
      token: token,
      state: 'resetpassword'
    })
    return
  }
  else {
    let password = req.body.password
    let password_confirm = req.body.password_confirm
    if (password !== password_confirm) { 
      res.render('forget_password', { 
        _: _,
        errorcode: '密碼不一致',
        session: req.session,
        currentPage: 'forget_password',
        token: token,
        state: 'resetpassword'
      })
    }
    await ForgetLog.forgetEmailQuery(req, res, token)
      .then(([rows]) => {
        forgetEmail = rows[0].email
      })
    await Member.queryMomocraftEmail(req, res, forgetEmail)
      .then(([rows]) => {
        momocraftMember = rows
      })
      .catch(err => console.dir(err))
    let newPwd = crypt.newPassword(
      password, 
      momocraftMember[_.map(momocraftMember, 'email').indexOf(forgetEmail)].password
    )
    await Member.resetMemberPassword(req, res, 
      forgetEmail, 
      newPwd
    )
    await Member.getFieldLength(req, res)
      .then(([rows]) => {
        fieldlength = rows
      })
      .catch(err => console.dir(err))
    await ForgetLog.tokenExpired(req, res, token)
    res.render('login', { 
      _: _,
      errorcode: '密碼重設完成, 請重新登入!',
      fieldlength: fieldlength,
      session: req.session,
      currentPage: 'login'
    })
  }
}





exports.getPage = getPage
exports.submitData = submitData
exports.forgetPasswordGetPage = forgetPasswordGetPage
exports.forgetPasswordSubmit = forgetPasswordSubmit
exports.resetPassword = resetPassword
exports.resetPasswordSubmit = resetPasswordSubmit