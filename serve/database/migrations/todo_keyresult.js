
exports.up = function (knex) {
    return knex.schema.createTable('todo_keyresult', function (table) {
        table.increments('id');
        table.integer('user_id', 11).comment('用户 id');
        table.integer('todo_id', 11).comment('todo id');
        table.integer('keyresult_id', 11).comment('keyresult id');
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("todo_keyresult");
};

exports.config = { transaction: false };
