exports.up = function (knex) {
  return knex.schema
    .createTable('keyresult', function (table) {
      table.increments('id');
      table.integer('objective_id', 11).notNullable().comment('关联的目标 id');
      table.string('title', 255).comment('成就名称');
      table.integer('status', 11).comment('状态：0-未完成，1-完成');
      table.timestamp('created_time').defaultTo(knex.fn.now()).comment('创建时间');
      table.timestamp('finished_time').nullable().comment('完成时间');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("keyresult");
};

exports.config = { transaction: false };