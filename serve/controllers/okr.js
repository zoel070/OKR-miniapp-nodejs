const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');
const formate = require('./../utils/date.js');

const okrController = {
  index: async function (req, res, next) {
    let user_id = res.locals.user_id;
    if (!user_id) {
      res.json({ error_code: 1, message: '缺少必要参数' })
      return
    }
    try {
      let obs = await Objective.where({ user_id });
      obs = obs.map(data => {
        data.created_time = formate.formatTime(data.created_time)
        if (data.finished_time) {
          data.finished_time = formate.formatTime(data.finished_time)
        }
        return data
      })
      res.json({ error_code: 0, data: obs })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  },
  update: async function (req, res, next) {
    let id = req.params.id;
    let params = req.body;
    params.finished_time = params.status ? new Date() : null;
    try {
      await Objective.update(id, params);
      res.json({ error_code: 0, data: '修改ob成功' })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  },
  delete: async function (req, res, next) {
    let id = req.params.id;
    try {
      await Objective.delete({ id });
      res.json({ error_code: 0, data: '删除成功' })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  },
  insert: async (req, res, next) => {
    let title = req.body.objective;
    let keyresults = req.body.keyresults;
    let user_id = res.locals.user_id;
    let status = 0;
    let created_time = new Date();
    if (!title || !keyresults.length || !user_id) {
      res.json({ error_code: 1, message: '缺少必要参数' })
      return
    }
    try {
      let objectives = await Objective.insert({
        title,
        status,
        created_time,
        user_id
      })
      let objective_id = objectives[0];
      keyresults.forEach(async (data) => {
        let title = data.title;
        await Keyresult.insert({
          objective_id,
          title,
          status,
          created_time
        })
      })
      res.json({ error_code: 0, data: '添加成功' })
    } catch (e) {
      res.json({ error_code: 1, message: e.message })
    }
  }
}

module.exports = okrController;