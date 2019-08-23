const _ = require('lodash');
const crypto = require('crypto');

const crypt = (cryptstring) => {
    const hash = crypto.createHash('sha256');
    hash.update((hash.update(cryptstring) + 'edwardsekaino.1'));
    return (hash.digest('hex'));
}


module.exports = {
    crypt
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


