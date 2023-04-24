'use strict';

module.exports = (app) => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        open_id: STRING(255),
        union_id: STRING(255),
        created_at: DATE,
    });

    return User;
};