
exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id');
    table.string('open_id', 255).nullable();
    table.string('union_id', 255).nullable();
    table.timestamp('created_time').nullable();
  })
};


exports.down = function (knex) {
  return knex.schema
    .dropTable("user");
};

exports.config = { transaction: false };

