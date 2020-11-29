var express = require('express')
var router = express.Router()

const donate = require('../controller/donate')

/* GET home page. */
router.get('/', donate.getPage)

module.exports = router
