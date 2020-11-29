const moment = require('moment')
const _ = require('lodash')

const Common = require('../models/common')


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
  let common

  await Common.getCommon()
    .then(([rows]) => {
      common = rows
    })
    .catch(err => console.dir(err))

  console.dir('session')
  console.dir(req.session)
  res.render('index', {
    title: 'momocraft',
    _: _,
    common: common,
    session: req.session,
    currentPage: 'index'
  })
}

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

