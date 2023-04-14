const Objective = require('../models/objective.js');
const Keyresult = require('../models/keyresult.js');
const formate = require('../utils/date.js');
const TodoKeyresult = require('../models/todo_keyresult.js');
const Todo = require('../models/todo.js');
const config = require('./../knexfile.js');
const knex = require('knex')(config);


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
            let obIds = Objective.where({ user_id, status }).select("id");  //子查询，不能加await
            let keyresults = await knex('keyresult').whereIn("objective_id", obIds);
            let krIds = knex('keyresult').whereIn("objective_id", obIds).select("id");
            let todo_keyresults = await knex('todo_keyresult').whereIn("keyresult_id", krIds);
            let todoIds = knex('todo_keyresult').whereIn("keyresult_id", krIds).select('todo_id');
            let todos = await knex('todo').whereIn('id', todoIds);  //todoIds里面重复的值只取一次，我感觉wherein源码里应该是用的哈希表
            //准备空数组
            for (let j = 0; j < obs.length; j++) {
                obs[j].keyresults = []
            }
            for (let j = 0; j < keyresults.length; j++) {
                keyresults[j].todos = []
                keyresults[j].todo_ids = []
            }
            //填充keyresults
            for (let i = 0; i < todo_keyresults.length; i++) {
                for (let j = 0; j < keyresults.length; j++) {
                    if (todo_keyresults[i].keyresult_id == keyresults[j].id) {
                        for (let k = 0; k < todos.length; k++) {
                            if (todos[k].id == todo_keyresults[i].todo_id) {
                                keyresults[j].todos.push(todos[k])
                                keyresults[j].todo_ids.push(todos[k].id)
                            }
                        }
                    }
                }
            }
            //填充obs
            for (let i = 0; i < obs.length; i++) {
                for (let j = 0; j < keyresults.length; j++) {
                    if (obs[i].id == keyresults[j].objective_id) {
                        obs[i].keyresults.push(keyresults[j])
                    }
                }
            }
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
            console.log(ob.keyresults, 666)
            let krIds = Keyresult.where({ objective_id }).select("id");
            let todo_keyresults = await knex('todo_keyresult').whereIn("keyresult_id", krIds);
            console.log(todo_keyresults, 555)
            let todoIds = knex('todo_keyresult').whereIn("keyresult_id", krIds).select('todo_id');
            let todos = await knex('todo').whereIn("id", todoIds);
            console.log(todos, 444)
            //准备空数组
            for (let j = 0; j < ob.keyresults.length; j++) {
                ob.keyresults[j].todos = []
            }
            //往keyresults逐个填充todos
            for (let i = 0; i < todo_keyresults.length; i++) {    //遍历，每个都进行处理，就用for。
                for (let j = 0; j < todos.length; j++) {         //找，就用for+if。
                    if (todos[j].id == todo_keyresults[i].todo_id) { //找到一个之后，找下一个。
                        for (let k = 0; k < ob.keyresults.length; k++) {
                            if (ob.keyresults[k].id == todo_keyresults[i].keyresult_id) {
                                ob.keyresults[k].todos.push(todos[j])
                            }
                        }
                    }
                }
            }
            //循环取数据库的方法
            // ob.keyresults = await Promise.all(
            //     ob.keyresults.map(async (data) => {
            //         let keyresult_id = data.id;
            //         let todo_ids = await TodoKeyresult.where({ keyresult_id })
            //         data.todos = await Promise.all(
            //             todo_ids.map(async (item) => {
            //                 let id = item.todo_id;
            //                 let arr = await Todo.where({ id })
            //                 return item = arr[0]
            //             })
            //         )
            //         return data
            //     })
            // )
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