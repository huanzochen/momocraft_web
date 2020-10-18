const moment = require('moment');
const _ = require('lodash');



/* READ *****************************************/

exports.getPage = async (req, res, next) => {
    res.render('donate', {
        title: 'momocraft',
        _: _,
        session: req.session,
        currentPage: 'donate'
     });
};

/*  console.dir(rows[(_.map(rows, "name").indexOf("info"))].text); */

