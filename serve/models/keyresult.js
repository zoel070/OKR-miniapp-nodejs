const basicModel = require('./index.js');

class model extends basicModel {
    constructor(props = "keyresult") {
        super(props);
    }
}

module.exports = new model();
