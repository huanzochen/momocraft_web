const _ = require('lodash');
const crypto = require('crypto');
const tool = require('./customtools');

const validate = (cryptstring, password) => {
    const hash = crypto.createHash('sha256');
    const hash2 = crypto.createHash('sha256');
    hash.update(cryptstring);
    hash2.update(hash.digest('hex') + tool.getsalt(password));
    return (hash2.digest('hex'));
}


module.exports = {
    validate
};


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


