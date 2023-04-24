const basicModel = require('./index.js');

class model extends basicModel {
    constructor(props = "todo") {
        super(props);
    }
}

module.exports = new model();
