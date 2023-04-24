const basicModel = require('./index.js');

class model extends basicModel {
    constructor(props = "todo_keyresult") {
        super(props);
    }
}

module.exports = new model();
