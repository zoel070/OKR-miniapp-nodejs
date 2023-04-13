const config = require('./../knexfile.js');
const knex = require('knex')(config);

class basicModel {
  constructor(props) {
    this.table = props;
  }

  knex() {
    return knex(this.table)
  }

  first(params) {
    return knex(this.table).where(params).first().select();
  }

  where(params) {
    return knex(this.table).select().where(params).orderBy('id', 'desc')
  }

  all() {
    return knex(this.table).select();
  }

  insert(params) {
    return knex(this.table).insert(params);
  }

  delete(params) {
    return knex(this.table).where(params).del()
  }

  update(id, params) {
    return knex(this.table).where('id', '=', id).update(params);
  }

}

module.exports = basicModel;
