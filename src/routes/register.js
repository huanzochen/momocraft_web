var express = require('express')
var router = express.Router()

const register = require('../controller/register')

/* GET home page. */
router.get('/', register.getPage)


/* POST password */
router.post('/submit', register.submitData)

module.exports = router
