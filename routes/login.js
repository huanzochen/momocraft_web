var express = require('express');
var router = express.Router();

const login = require('../controller/login');

/* GET home page. */
router.get('/', login.getPage);

module.exports = router;
