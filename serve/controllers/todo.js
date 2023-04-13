const Todo = require('../models/todo.js');
const formate = require('./../utils/date.js');
const TodoKeyresult = require('./../models/todo_keyresult.js');

const todoController = {
  index: async function (req, res, next) {
    let status = req.query.status;
    let user_id = res.locals.user_id;
    if (!user_id) {
      res.json({ error_code: 1, message: '缺少必要参数' })
      return
    }
    try {
      let todos = await Todo.where({ user_id, status });
      todos = todos.map(data => {
        data.created_time = formate.formatTime(data.created_time)
        if (data.finished_time) {
          data.finished_time = formate.formatTime(data.finished_time)
        }
        return data
      })
      res.json({ error_code: 0, data: todos })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  },
  insert: async function (req, res, next) {
    let title = req.body.title;
    let user_id = res.locals.user_id;
    let status = 0;
    let created_time = new Date();
    if (!title || !user_id) {
      res.json({ error_code: 1, message: '缺少必要参数' })
      return
    }
    try {
      const todos = await Todo.insert({ title, user_id, status, created_time });
      let id = todos[0];
      let todo_id = id;
      await TodoKeyresult.insert({ todo_id, user_id })
      res.json({ error_code: 0, data: id })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  },
  update: async function (req, res, next) {
    let id = req.params.id;
    let params = req.body;
    params.finished_time = params.status ? new Date() : null;
    try {
      let todo = await Todo.update(id, params);
      res.json({ error_code: 0, data: todo })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  },
  delete: async function (req, res, next) {
    let id = req.params.id;
    try {
      await Todo.delete({ id });
      // await TodoKeyresult.select({ todo_id: id }).del();
      res.json({ error_code: 0, data: '删除成功' })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  }
}

module.exports = todoController;