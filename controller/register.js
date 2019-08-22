const moment = require('moment');
const _ = require('lodash');
const session = require('express-session')

const app = require('../app');
const fd = require('../util/findarray');
const crypt = require('../util/crypt');

const Member = require('../models/member');


/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    res.render('register', {
        title: 'momocraft',
        _: _,
        errorcode: ''
     });
};

/* SUBMIT **********************************/

exports.submitData = async (req, res, next) => {
    let verify;





}





/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

