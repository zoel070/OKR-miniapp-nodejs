const TodoKeyresult = require('./../models/todo_keyresult.js');

const todoKeyresultController = {
    delete: async function (req, res, next) {
        let todo_id = req.body.todo_id;
        let keyresult_id = req.body.keyresult_id;
        let user_id = res.locals.user_id;
        if (!user_id || !todo_id || !keyresult_id) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let ids = await TodoKeyresult.where({ user_id, todo_id, keyresult_id });
            console.log(ids, 444)
            let id = Number(ids[0].id);
            let num = await TodoKeyresult.delete({ id });
            res.json({ error_code: 0, data: num })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    insert: async function (req, res, next) {
        let todo_id = req.body.todo_id;
        let keyresult_id = req.body.keyresult_id;
        let user_id = res.locals.user_id;
        if (!user_id || !todo_id || !keyresult_id) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let ids = await TodoKeyresult.insert({ user_id, todo_id, keyresult_id });
            res.json({ error_code: 0, data: ids })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
}

module.exports = todoKeyresultController;