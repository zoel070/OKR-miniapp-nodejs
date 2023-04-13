const Objective = require('../models/objective.js');
const Keyresult = require('../models/keyresult.js');
const formate = require('../utils/date.js');
const TodoKeyresult = require('../models/todo_keyresult.js');
const Todo = require('../models/todo.js');

const keyresultController = {
    index: async function (req, res, next) {        //todo keyresult页面
        let user_id = res.locals.user_id;
        let status = 0;
        if (!user_id) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let obs = await Objective.where({ user_id, status });
            obs = obs.map(data => {
                data.created_time = formate.formatTime(data.created_time)
                if (data.finished_time) {
                    data.finished_time = formate.formatTime(data.finished_time)
                }
                return data
            })
            obs = await Promise.all(obs.map(async (data) => {
                let objective_id = data.id;
                data.keyresults = await Keyresult.where({ objective_id });
                data.keyresults = await Promise.all(data.keyresults.map(async (item) => {
                    let keyresult_id = item.id;
                    item.todo_keyresults = await TodoKeyresult.where({ keyresult_id });
                    item.todo_ids = item.todo_keyresults.map(tab => {
                        return tab = tab.todo_id
                    })
                    return item;
                }));
                return data;
            }));       //循环异步出了问题就用promise.all
            res.json({ error_code: 0, data: obs })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    show: async function (req, res, next) {    //okr detail页面
        let id = req.params.id;
        let user_id = res.locals.user_id;
        if (!user_id || !id) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let obs = await Objective.where({ user_id, id });
            let ob = obs[0];
            ob.created_time = formate.formatTime(ob.created_time)
            if (ob.finished_time) {
                ob.finished_time = formate.formatTime(ob.finished_time)
            }
            let objective_id = ob.id;
            ob.keyresults = await Keyresult.where({ objective_id });
            ob.keyresults = await Promise.all(
                ob.keyresults.map(async (data) => {
                    let keyresult_id = data.id;
                    let todo_ids = await TodoKeyresult.where({ keyresult_id })
                    data.todos = await Promise.all(
                        todo_ids.map(async (item) => {
                            let id = item.todo_id;
                            let arr = await Todo.where({ id })
                            return item = arr[0]
                        })
                    )
                    return data
                })
            )
            res.json({ error_code: 0, data: ob })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    update: async function (req, res, next) {
        let id = req.params.id;
        let user_id = res.locals.user_id;
        let params = req.body;
        if (!user_id || !id) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let krs = await Keyresult.update(id, params);
            res.json({ error_code: 0, data: '修改kr成功' })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    delete: async function (req, res, next) {
        let id = req.params.id;
        let user_id = res.locals.user_id;
        if (!user_id || !id) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let krs = await Keyresult.delete({ id });
            res.json({ error_code: 0, data: krs })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    insert: async function (req, res, next) {
        let objective_id = req.body.objective_id;
        let title = req.body.title;
        let user_id = res.locals.user_id;
        let status = 0;
        let created_time = new Date();
        if (!user_id || !objective_id || !title) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let krs = await Keyresult.insert({ objective_id, title, status, created_time });
            res.json({ error_code: 0, data: krs })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
}

module.exports = keyresultController;