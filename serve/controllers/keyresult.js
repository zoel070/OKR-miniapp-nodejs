const Objective = require('../models/objective.js');
const Keyresult = require('../models/keyresult.js');
const TodoKeyresult = require('../models/todo_keyresult.js');
const Todo = require('../models/todo.js');
const formate = require('../utils/date.js');


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
            let keyresults = await Keyresult.whereIn("objective_id", obIds);
            let krIds = Keyresult.whereIn("objective_id", obIds).select("id");
            let todo_keyresults = await TodoKeyresult.whereIn("keyresult_id", krIds);
            let todoIds = TodoKeyresult.whereIn("keyresult_id", krIds).select('todo_id');
            let todos = await Todo.whereIn("id", todoIds)  //todoIds里面重复的值只取一次，我感觉wherein源码里应该是用的哈希表
            //准备空数组
            for (let j = 0; j < obs.length; j++) {
                obs[j].keyresults = []
            }
            for (let j = 0; j < keyresults.length; j++) {
                keyresults[j].todos = []
                keyresults[j].todo_ids = []
            }

            // 用Map来缓存id和元素的对应关系。都不用管index了。
            const keyresultMap = new Map(keyresults.map((k) => [k.id, k]));
            const todoMap = new Map(todos.map((k) => [k.id, k]));
            todo_keyresults.forEach((t) => {
                const kr = keyresultMap.get(t.keyresult_id);
                const todo = todoMap.get(t.todo_id);
                kr.todos.push(todo);
                kr.todo_ids.push(t.todo_id);
            });

            const obsMap = new Map(obs.map((t) => [t.id, t]))
            keyresults.forEach((t) => {
                const ob = obsMap.get(t.objective_id);
                ob.keyresults.push(t)
            })
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
            let krIds = Keyresult.where({ objective_id }).select("id");
            let todo_keyresults = await TodoKeyresult.whereIn("keyresult_id", krIds);
            let todoIds = TodoKeyresult.whereIn("keyresult_id", krIds).select('todo_id');
            let todos = await Todo.whereIn("id", todoIds);
            //准备空数组
            for (let j = 0; j < ob.keyresults.length; j++) {
                ob.keyresults[j].todos = []
            }
            // 用Map来缓存id和元素的对应关系。都不用管index了。
            const keyresultMap = new Map(ob.keyresults.map((k) => [k.id, k]));
            const todoMap = new Map(todos.map((k) => [k.id, k]));
            todo_keyresults.forEach((t) => {
                const kr = keyresultMap.get(t.keyresult_id);
                const todo = todoMap.get(t.todo_id);
                kr.todos.push(todo);
            });
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
            await Keyresult.update(id, params);
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