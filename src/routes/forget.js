var express = require('express')
var router = express.Router()

const login = require('../controller/login')

/* GET home page. */
router.get('/', login.forgetPasswordGetPage)

/* Forget Password */
router.post('/submit', login.forgetPasswordSubmit)

module.exports = router


