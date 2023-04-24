const schema = require('async-validator').default;
const wechatService = require('../services/wechat.js')
const userService = require('../services/user.js')

const wechatController = {
  oAuthMini: async function (req, res) {
    const code = req.body.code;
    const validator = new schema({
      code: { type: 'string', required: true },
    })
    try {
      await validator.validate({ code })
      const wechatUserInfo = await wechatService.oAuthMini(code);
      const token = await userService.token(wechatUserInfo.id);
      res.json({ error_code: 0, data: { token } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message || e.errors || e.errmsg })
    }
  },
}

module.exports = wechatController;