const basicModel = require('./index.js');

class model extends basicModel {
    constructor(props = "objective") {
        super(props);
    }
}

module.exports = new model();
