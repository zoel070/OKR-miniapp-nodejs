
exports.up = function (knex) {
    return knex.schema.createTable('todo', function (table) {
        table.increments('id');
        table.integer('user_id', 11).comment('用户 id');
        table.string('title', 255).comment('');
        table.integer('status', 11).defaultTo(0).comment('状态：0-未完成，1-完成');
        table.timestamp('created_time').defaultTo(knex.fn.now()).comment('创建时间');
        table.timestamp('finished_time').nullable().comment('完成时间');
    })
};


exports.down = function (knex) {
    return knex.schema
        .dropTable("todo");
};

exports.config = { transaction: false };
