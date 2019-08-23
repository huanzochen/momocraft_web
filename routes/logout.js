var express = require('express');
var router = express.Router();

const logout = require('../controller/logout');

/* GET home page. */
router.get('/', logout.getPage);


module.exports = router;
