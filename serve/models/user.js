const basicModel = require('./index.js');

class model extends basicModel {
  constructor(props = "user") {
    super(props);
  }
}

module.exports = new model();
