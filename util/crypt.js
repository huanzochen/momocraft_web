const _ = require('lodash');
const crypto = require('crypto');


module.exports = function (req, res, next) {
        const hash = crypto.createHash('sha256');
        hash.update((hash.update(req.body.password) + 'edwardsekaino.1'));
        return (hash.digest('hex'));
    }


/*
module.exports = class crypt {
    constructer (req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    getHash () {
        const hash = crypto.createHash('sha256');
        hash.update((hash.update(req.body.password) + 'edwardsekaino.1'));
        return (hash.digest('hex'));
    }
}
*/


