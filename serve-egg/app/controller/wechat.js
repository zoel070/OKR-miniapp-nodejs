'use strict';

const { Controller } = require('egg');
const schema = require('async-validator').default;


class WechatController extends Controller {
  async oAuthMini() {
    const { ctx } = this;
    const code = ctx.request.body.code;
    const validator = new schema({
      code: { type: 'string', required: true },
    });
    try {
      await validator.validate({ code });
      console.log("🚀 ~ file: wechat.js:15 ~ WechatController ~ oAuthMini ~ code:", code)
      const wechatUserInfo = await ctx.service.wechat.oAuthMini(code);
      const token = await ctx.service.user.token(wechatUserInfo.id);
      ctx.body = { error_code: 0, data: { token } };
    } catch (e) {
      ctx.body = { error_code: 1, message: e.message || e.errors || e.errmsg };
    }
  }
}

module.exports = WechatController;
