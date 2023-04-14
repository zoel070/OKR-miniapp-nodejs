const Keyresult = require('../models/keyresult.js');
const keyresultService = require('../services/keyresult.js')

//复杂/公用。调到services。

const keyresultController = {
    index: async function (req, res, next) {        //todo keyresult页面
        let user_id = res.locals.user_id;
        let status = 0;
        if (!user_id) {
            res.json({ error_code: 1, message: '缺少必要参数' })
            return
        }
        try {
            let obs = await keyresultService.obs({ user_id, status });
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
            let ob = await keyresultService.ob({ user_id, id });
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