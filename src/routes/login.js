var express = require('express')
var router = express.Router()

const login = require('../controller/login')

/* GET home page. */
router.get('/', login.getPage)

/* POST password */
router.post('/submit', login.submitData)

module.exports = router
